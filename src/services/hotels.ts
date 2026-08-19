import type { Hotel, HotelRecord } from '../interfaces/Hotel'
import { fallbackHotels, resolveHotelRecord } from '../mocks/hotelRecords'
import api from './api'

export type HotelCategory = 'destaques' | 'promocoes'

export interface HotelSearchCriteria {
  localizacao?: string
  entrada?: string
  saida?: string
  periodo?: string
  nome?: string
  flexibilidade?: number
  duracaoFlexivel?: string
  incluirFimDeSemana?: boolean
  mesesFlexiveis?: string[]
}

function isHotelRecord(record: unknown): record is HotelRecord {
  if (typeof record !== 'object' || record === null) {
    return false
  }

  const hotel = record as Partial<HotelRecord>

  return (
    typeof hotel.id === 'string' &&
    typeof hotel.imageKey === 'string' &&
    typeof hotel.name === 'string' &&
    typeof hotel.location === 'string' &&
    typeof hotel.price === 'number'
  )
}

export async function getHotels(): Promise<Hotel[]> {
  try {
    const { data } = await api.get<HotelRecord[]>('/hotels')

    if (!Array.isArray(data)) {
      return fallbackHotels
    }

    return data.filter(isHotelRecord).map(resolveHotelRecord)
  } catch {
    return fallbackHotels
  }
}

export async function getHotelById(hotelId: string): Promise<Hotel | null> {
  const hotels = await getHotels()

  return hotels.find((hotel) => hotel.id === hotelId) ?? null
}

export async function getHotelsByCategory(category: HotelCategory): Promise<Hotel[]> {
  const hotels = await getHotels()

  if (category === 'promocoes') {
    return hotels.filter((hotel) => hotel.promoted)
  }

  return hotels.filter((hotel) => hotel.featured)
}

export function isHotelCategory(category: string | undefined): category is HotelCategory {
  return category === 'destaques' || category === 'promocoes'
}

const stateMapping: Record<string, string> = {
  ba: 'BA',
  bahia: 'BA',
  ilheus: 'BA',
  'porto seguro': 'BA',
  rj: 'RJ',
  'rio de janeiro': 'RJ',
  copacabana: 'RJ',
  'centro do rio de janeiro': 'RJ',
  'barra da tijuca': 'RJ',
  galeao: 'RJ',
  sp: 'SP',
  'sao paulo': 'SP',
  'campos do jordao': 'SP',
  es: 'ES',
  'espirito santo': 'ES',
  vitoria: 'ES',
  aracruz: 'ES',
}

function normalizeSearchValue(value: string | undefined) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

function getHotelState(hotel: Hotel): string | null {
  if (hotel.location && hotel.location.includes('/')) {
    const parts = hotel.location.split('/')
    const stateStr = parts[parts.length - 1].trim().toUpperCase()
    if (stateStr.length === 2) {
      return stateStr
    }
  }

  for (const tag of hotel.searchTags ?? []) {
    const norm = normalizeSearchValue(tag)
    if (stateMapping[norm]) {
      return stateMapping[norm]
    }
  }

  return null
}

function getTargetStateFromQuery(locationTerm: string): string | null {
  if (!locationTerm) return null

  for (const [key, uf] of Object.entries(stateMapping)) {
    if (locationTerm.includes(key) || key.includes(locationTerm)) {
      return uf
    }
  }

  return null
}

function getSearchableText(hotel: Hotel) {
  return normalizeSearchValue(
    [hotel.name, hotel.location, hotel.description, ...(hotel.searchTags ?? [])].filter(Boolean).join(' '),
  )
}

function getDisplayPrice(hotel: Hotel) {
  return hotel.discountPrice ?? hotel.price
}

function getHotelSearchScore(hotel: Hotel, criteria: HotelSearchCriteria) {
  const locationTerm = normalizeSearchValue(criteria.localizacao)
  const nameTerm = normalizeSearchValue(criteria.nome)
  const periodTerm = normalizeSearchValue(criteria.periodo)
  const normalizedName = normalizeSearchValue(hotel.name)
  const normalizedLocation = normalizeSearchValue(hotel.location)
  const searchableText = getSearchableText(hotel)

  let locationMatchLevel = 0
  let relevanceScore = 0
  let rankingScore = 0

  if (locationTerm) {
    const targetState = getTargetStateFromQuery(locationTerm)
    const hotelState = getHotelState(hotel)

    const isCityMatch =
      normalizedLocation.includes(locationTerm) ||
      (hotel.searchTags ?? []).some((tag) => normalizeSearchValue(tag) === locationTerm)

    if (isCityMatch) {
      locationMatchLevel = 2
      relevanceScore += 80
    } else if (targetState && hotelState === targetState) {
      locationMatchLevel = 1
      relevanceScore += 30
    } else if (searchableText.includes(locationTerm)) {
      locationMatchLevel = 1
      relevanceScore += 20
    }
  }

  if (nameTerm) {
    if (normalizedName.includes(nameTerm)) {
      relevanceScore += 70
    } else if (searchableText.includes(nameTerm)) {
      relevanceScore += 25
    }
  }

  if (periodTerm && hotel.availablePeriods?.includes(periodTerm)) {
    relevanceScore += 12
  }

  rankingScore += relevanceScore
  rankingScore += hotel.availability === true ? 12 : 0
  rankingScore += hotel.promoted ? 8 : 0
  rankingScore += hotel.immediateBooking ? 4 : 0
  rankingScore += hotel.freeCancellation ? 3 : 0
  rankingScore -= getDisplayPrice(hotel) / 1000

  return { locationMatchLevel, relevanceScore, rankingScore }
}

export async function searchHotels(criteria: HotelSearchCriteria): Promise<Hotel[]> {
  const hotels = await getHotels()
  const locationTerm = normalizeSearchValue(criteria.localizacao)
  const targetState = getTargetStateFromQuery(locationTerm)
  const hasTextCriteria = Boolean(locationTerm || normalizeSearchValue(criteria.nome))
  const hasPeriodCriteria = Boolean(normalizeSearchValue(criteria.periodo))

  return hotels
    .map((hotel) => {
      const score = getHotelSearchScore(hotel, criteria)
      return { hotel, ...score }
    })
    .filter(({ hotel, locationMatchLevel, relevanceScore }) => {
      if (locationTerm && targetState) {
        const hotelState = getHotelState(hotel)
        if (hotelState && hotelState !== targetState) {
          return false
        }
      }

      if (hasPeriodCriteria && !hotel.availablePeriods?.includes(normalizeSearchValue(criteria.periodo))) {
        return false
      }

      if (hasTextCriteria) {
        if (locationTerm && locationMatchLevel === 0 && relevanceScore === 0) {
          return false
        }
        return relevanceScore > 0
      }

      return true
    })
    .sort((a, b) => {
      if (a.locationMatchLevel !== b.locationMatchLevel) {
        return b.locationMatchLevel - a.locationMatchLevel
      }

      if (b.rankingScore !== a.rankingScore) {
        return b.rankingScore - a.rankingScore
      }

      return getDisplayPrice(a.hotel) - getDisplayPrice(b.hotel)
    })
    .map(({ hotel }) => hotel)
}

