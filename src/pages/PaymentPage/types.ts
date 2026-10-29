export interface BookingState {
  id: string
  totalPrice: number
  guestFullName: string
  checkIn: string
  checkOut: string
  nights: number
  periodo?: string
  period?: string
  room?: {
    id?: string
    title?: string
    name?: string
    pricePerNight?: number
    price?: number
    hotel?: {
      name?: string
      city?: string
      state?: string
      photos?: string[]
      address?: string
    }
  }
}

export type PaymentMethod = 'pix' | 'card'
