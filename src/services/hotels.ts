import type { Hotel } from '../interfaces/Hotel'
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

interface ApiHotelResponse {
  id: string
  name: string
  city: string
  state: string
  address: string
  description: string
  ratingScore: number
  reviewCount?: number
  reviewsCount?: number
  images?: string[]
  photos?: string[]
  amenities: string[]
  rooms: Array<{
    id: string
    name: string
    capacity: number
    pricePerNight: number
    isAvailable: boolean
  }>
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

function mapApiHotelToFrontend(apiHotel: ApiHotelResponse): Hotel {
  const lowestRoomPrice =
    apiHotel.rooms && apiHotel.rooms.length > 0
      ? Math.min(...apiHotel.rooms.map((r) => r.pricePerNight))
      : 350.0

  const rawImages =
    apiHotel.photos && apiHotel.photos.length > 0 ? apiHotel.photos : apiHotel.images

  const resolvedImages =
    rawImages && rawImages.length > 0 ? rawImages.map(resolveImageUrl) : [resolveImageUrl()]

  const normalizedAmenities = (apiHotel.amenities || []).map(mapAmenityToServiceKey)

  const isFeatured =
    (apiHotel.ratingScore ?? 8.5) >= 8.5 || apiHotel.name.toLowerCase().includes('resort')

  const isPromoted =
    !isFeatured && (lowestRoomPrice <= 400 || apiHotel.name.toLowerCase().includes('pousada'))

  return {
    id: apiHotel.id,
    name: apiHotel.name,
    location: `${apiHotel.city}/${apiHotel.state}`,
    description: apiHotel.description,
    price: lowestRoomPrice,
    image: resolvedImages[0],
    images: resolvedImages,
    featured: isFeatured,
    promoted: isPromoted,
    accommodationType: apiHotel.name.toLowerCase().includes('pousada') ? 'pousada' : 'hotel',
    services: normalizedAmenities,
    rating: apiHotel.ratingScore ?? 8.5,
    reviewsCount: apiHotel.reviewCount ?? apiHotel.reviewsCount ?? 0,
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

    return []
  } catch (error) {
    console.warn('⚠️ Falha na busca de hotéis na API.', error)
    return []
  }
}
