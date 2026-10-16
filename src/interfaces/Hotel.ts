// interfaces/hotel.ts

import type { Review } from './Review'

export interface Room {
  id: string
  hotelId?: string
  title: string
  subtitle?: string | null
  pricePerNight: number
  capacity: number
  isAvailable: boolean
  tags: string[]
}

export interface HotelQuestion {
  id: string
  hotelId: string
  userId: string
  question: string
  answer?: string | null
  createdAt: string
  updatedAt?: string
  user?: {
    name: string
    avatar?: string | null
  }
}
export interface Hotel {
  id: string
  name: string
  description?: string | null
  about?: string | null // Campo opcional: "Mais informações sobre o hotel"
  address?: string
  city?: string
  state?: string
  ratingScore?: number
  reviewCount?: number
  mapEmbedUrl?: string | null
  photos?: string[]
  amenities?: string[]
  rooms?: Room[]
  reviews?: Review[]
  questions?: HotelQuestion[] // Dúvidas e respostas do hotel

  // Propriedades calculadas/diretas vindas do backend sem adapter
  price?: number
  discountPrice?: number

  // Propriedades de compatibilidade / listagem / busca
  image?: string
  images?: string[]
  location?: string
  rating?: number
  reviewsCount?: number
  availability?: boolean
  featured?: boolean
  promoted?: boolean
  accommodationType?: 'hotel' | 'pousada'
  availablePeriods?: string[]
  services?: string[]
  searchTags?: string[]
  safetyMeasures?: boolean
  freeCancellation?: boolean
  immediateBooking?: boolean
  specialOffer?: boolean
}

export interface HotelRecord extends Omit<Hotel, 'image'> {
  imageKey: string
}
