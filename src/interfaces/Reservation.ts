import type { Hotel, HotelQuestion } from './Hotel'

export interface RoomOption {
  id: string
  title: string
  subtitle?: string | null
  pricePerNight: number
  size?: string
  bedType?: string
  capacity?: number
  tags: string[]
  isAvailable: boolean
}

export interface GuestReview {
  id?: string
  hotelId?: string
  userName: string
  avatarInitials?: string
  avatarBgColor?: string
  avatarUrl?: string | null
  stayDate: string
  rating: number
  comment: string
}
export interface HotelDetail extends Omit<Hotel, 'rooms' | 'reviews' | 'questions'> {
  about?: string | null
  photos: string[]
  amenitiesList?: string[]
  rooms: RoomOption[]
  reviews: GuestReview[]
  questions?: HotelQuestion[]
  mapEmbedUrl?: string | null
  address: string
  ratingScore: number
  reviewCount: number
}

export interface BookingGuestData {
  fullName: string
  email: string
  document: string
  phone: string
}

export interface BookingPayload {
  hotelId: string
  roomId: string
  checkIn: string
  checkOut: string
  period?: string
  nights: number
  guestsCount: number
  guestData: BookingGuestData
  roomPricePerNight: number
  serviceFee: number
  totalPrice: number
}

export interface BookingResponse {
  success: boolean
  bookingId: string
  message: string
  booking: BookingPayload & { createdAt: string }
}
