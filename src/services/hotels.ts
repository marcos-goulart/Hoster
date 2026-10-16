import type { Hotel, HotelQuestion } from '../interfaces/Hotel'
import type { Review } from '../interfaces/Review'
import { fallbackHotels } from '../mocks/hotelRecords'
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

export interface ApiHotelResponse {
  id: string
  name: string
  city: string
  state: string
  address: string
  description?: string | null
  about?: string | null
  ratingScore?: number
  reviewCount?: number
  reviewsCount?: number
  images?: string[]
  photos?: string[]
  amenities?: string[]
  mapEmbedUrl?: string | null
  price?: number
  discountPrice?: number
  rooms?: Array<{
    id: string
    name?: string
    title?: string
    capacity: number
    pricePerNight: number
    isAvailable: boolean
  }>
  reviews?: Review[]
  questions?: HotelQuestion[]
}

function mapAmenityToServiceKey(amenity: string): string {
  const norm = amenity
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  if (norm.includes('piscina')) return 'piscina'
  if (norm.includes('wifi') || norm.includes('wi-fi') || norm.includes('internet')) return 'wifi'
  if (norm.includes('restaurante') || norm.includes('almoco') || norm.includes('jantar'))
    return 'restaurante'
  if (norm.includes('cafe') || norm.includes('pequeno-almoco') || norm.includes('desjejum'))
    return 'cafe-manha'
  if (norm.includes('estacionamento') || norm.includes('garagem')) return 'estacionamento'
  if (norm.includes('futebol') || norm.includes('campo')) return 'campo-futebol'
  if (norm.includes('praia')) return 'praias'
  return norm
}

function resolveImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  }
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  const mockImageMap: Record<string, string> = {
    'hotel-1.jpg':
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'hotel-2.jpg':
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    'hotel-3.jpg':
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  }
  return (
    mockImageMap[imagePath] ||
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  )
}

export function mapApiHotelToFrontend(apiHotel: ApiHotelResponse): Hotel {
  const lowestRoomPrice =
    apiHotel.rooms && apiHotel.rooms.length > 0
      ? Math.min(...apiHotel.rooms.map((r) => r.pricePerNight))
      : (apiHotel.price ?? 350.0)

  const rawImages =
    apiHotel.photos && apiHotel.photos.length > 0 ? apiHotel.photos : apiHotel.images

  const resolvedImages =
    rawImages && rawImages.length > 0 ? rawImages.map(resolveImageUrl) : [resolveImageUrl()]

  const rawAmenities = apiHotel.amenities || []
  const normalizedServices = rawAmenities.map(mapAmenityToServiceKey)

  const ratingScore = apiHotel.ratingScore ?? 8.5
  const isFeatured = ratingScore >= 8.5 || apiHotel.name.toLowerCase().includes('resort')
  const isPromoted =
    !isFeatured && (lowestRoomPrice <= 400 || apiHotel.name.toLowerCase().includes('pousada'))

  const mappedRooms = (apiHotel.rooms || []).map((r) => ({
    id: r.id,
    hotelId: apiHotel.id,
    title: r.title || r.name || 'Quarto Standard',
    subtitle: `${r.capacity} Hóspedes • Ar-condicionado • Wi-Fi`,
    pricePerNight: r.pricePerNight,
    capacity: r.capacity,
    isAvailable: r.isAvailable,
    tags: ['Wi-Fi incluso', 'Cancelamento grátis'],
  }))

  const location = `${apiHotel.city}/${apiHotel.state}`

  return {
    id: apiHotel.id,
    name: apiHotel.name,
    description: apiHotel.description ?? null,
    about: apiHotel.about ?? apiHotel.description ?? null,
    address: apiHotel.address || `Av. Central, 100 - ${apiHotel.city}`,
    city: apiHotel.city,
    state: apiHotel.state,
    ratingScore,
    reviewCount: apiHotel.reviewCount ?? apiHotel.reviewsCount ?? 0,
    mapEmbedUrl: apiHotel.mapEmbedUrl ?? null,
    photos: resolvedImages,
    amenities: rawAmenities,
    rooms: mappedRooms,
    reviews: apiHotel.reviews,
    questions: apiHotel.questions,
    price: lowestRoomPrice,
    discountPrice:
      apiHotel.discountPrice ?? (isPromoted ? Math.round(lowestRoomPrice * 0.85) : undefined),

    // Compatibilidade de componentes de listagem e busca
    image: resolvedImages[0],
    images: resolvedImages,
    location,
    rating: ratingScore,
    reviewsCount: apiHotel.reviewCount ?? apiHotel.reviewsCount ?? 0,
    featured: isFeatured,
    promoted: isPromoted,
    accommodationType: apiHotel.name.toLowerCase().includes('pousada') ? 'pousada' : 'hotel',
    services: normalizedServices,
    freeCancellation: true,
    immediateBooking: true,
  }
}

interface ApiResponseEnvelope {
  data?: ApiHotelResponse[] | { hotels?: ApiHotelResponse[] }
}

function extractHotelsFromResponse(data: unknown): ApiHotelResponse[] {
  const response = data as ApiResponseEnvelope

  if (Array.isArray(response?.data)) {
    return response.data
  }

  if (
    typeof response?.data === 'object' &&
    response.data !== null &&
    'hotels' in response.data &&
    Array.isArray(response.data.hotels)
  ) {
    return response.data.hotels
  }

  if (Array.isArray(data)) {
    return data as ApiHotelResponse[]
  }

  return []
}

function normalizeSearchValue(value: string | undefined): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

function getSearchableText(hotel: Hotel): string {
  return normalizeSearchValue(
    [
      hotel.name,
      hotel.location,
      hotel.city,
      hotel.state,
      hotel.description,
      ...(hotel.searchTags ?? []),
    ]
      .filter(Boolean)
      .join(' '),
  )
}

function filterHotelsLocally(hotels: Hotel[], criteria: HotelSearchCriteria): Hotel[] {
  const locationTerm = normalizeSearchValue(criteria.localizacao)
  const nameTerm = normalizeSearchValue(criteria.nome)
  const periodTerm = normalizeSearchValue(criteria.periodo)

  if (!locationTerm && !nameTerm && !periodTerm) {
    return hotels
  }

  return hotels.filter((hotel) => {
    const searchableText = getSearchableText(hotel)
    const normalizedName = normalizeSearchValue(hotel.name)
    const normalizedLocation = normalizeSearchValue(hotel.location)
    const normalizedCity = normalizeSearchValue(hotel.city)

    if (locationTerm) {
      const matchesLocation =
        normalizedLocation.includes(locationTerm) ||
        normalizedCity.includes(locationTerm) ||
        searchableText.includes(locationTerm) ||
        (hotel.searchTags ?? []).some((tag) => normalizeSearchValue(tag).includes(locationTerm))

      if (!matchesLocation) return false
    }

    if (nameTerm && !normalizedName.includes(nameTerm) && !searchableText.includes(nameTerm)) {
      return false
    }

    if (periodTerm && !hotel.availablePeriods?.includes(periodTerm)) {
      return false
    }

    return true
  })
}

export async function getHotels(): Promise<Hotel[]> {
  try {
    const { data } = await api.get('/hotels')
    const hotelList = extractHotelsFromResponse(data)

    if (hotelList.length > 0) {
      return hotelList.map(mapApiHotelToFrontend)
    }

    return fallbackHotels
  } catch (error) {
    console.warn('⚠️ Falha ao conectar com a API de hotéis. Utilizando dados fallback.', error)
    return fallbackHotels
  }
}

export async function getHotelById(hotelId: string): Promise<Hotel | null> {
  try {
    const { data } = await api.get(`/hotels/${hotelId}`)
    const apiHotel =
      (data as { data?: { hotel?: ApiHotelResponse } & ApiHotelResponse })?.data?.hotel ||
      (data as { data?: ApiHotelResponse })?.data

    if (apiHotel && apiHotel.id) {
      return mapApiHotelToFrontend(apiHotel)
    }
    return null
  } catch (error) {
    console.warn(`⚠️ Falha ao buscar detalhes do hotel ${hotelId}.`, error)
    const hotels = await getHotels()
    return hotels.find((hotel) => hotel.id === hotelId) ?? null
  }
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

export async function searchHotels(criteria: HotelSearchCriteria): Promise<Hotel[]> {
  try {
    const params: Record<string, string | number | undefined> = {}

    if (criteria.localizacao) {
      params.city = criteria.localizacao
    }

    const { data } = await api.get('/hotels', { params })
    const hotelList = extractHotelsFromResponse(data)

    if (hotelList.length > 0) {
      return hotelList.map(mapApiHotelToFrontend)
    }
  } catch (error) {
    console.warn('⚠️ Falha na busca de hotéis na API. Utilizando busca local.', error)
  }

  return filterHotelsLocally(fallbackHotels, criteria)
}
