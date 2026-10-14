// interfaces/hotel.ts

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

export interface Hotel {
  id: string
  name: string
  description?: string | null
  address: string
  city: string
  state: string
  ratingScore: number
  reviewCount: number
  mapEmbedUrl?: string | null
  photos: string[]
  amenities: string[]
  rooms?: Room[]

  // Propriedades calculadas/diretas vindas do backend sem adapter
  price?: number
  discountPrice?: number
}
