import type { Hotel } from './Hotel'

export interface RoomOption {
  id: string
  title: string
  subtitle: string
  pricePerNight: number
  size: string
  bedType: string
  tags: string[]
  isAvailable: boolean
}

export interface GuestReview {
  id: string
  userName: string
  avatarInitials: string
  avatarBgColor?: string
  stayDate: string
  rating: number
  comment: string
}

export interface HotelDetail extends Hotel {
  photos: string[]
  amenitiesList: string[]
  rooms: RoomOption[]
  reviews: GuestReview[]
  mapEmbedUrl: string
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
