// src/services/userService.ts
import api from './api'
import type { Hotel } from '../interfaces/Hotel'

export type BookingStatusType =
  'PENDING' | 'PENDING_PAYMENT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

export interface BookingRecord {
  id: string
  userId?: string
  roomId?: string
  checkIn: string
  checkOut: string
  period?: string | null
  nights?: number
  guests?: number
  guestsCount?: number
  roomPricePerNight?: number
  serviceFee?: number
  totalPrice: number
  status: BookingStatusType | string
  guestFullName?: string
  guestEmail?: string
  guestDocument?: string
  guestPhone?: string
  createdAt?: string
  hotel?: {
    id?: string
    name: string
    address?: string
    city?: string
    state?: string
    photos?: string[]
  }
  room?: {
    id?: string
    title: string
    subtitle?: string | null
    pricePerNight?: number
    capacity?: number
    hotel?: {
      id?: string
      name?: string
      address?: string
      city?: string
      state?: string
      photos?: string[]
    }
  }
}

export const userService = {
  async getFavorites(): Promise<Hotel[]> {
    const { data } = await api.get<{ success: boolean; data: Hotel[] }>('/user/favorites')
    return data.data
  },

  async addFavorite(hotelId: string): Promise<void> {
    await api.post('/user/favorites', { hotelId })
  },

  async removeFavorite(hotelId: string): Promise<void> {
    await api.delete(`/user/favorites/${hotelId}`)
  },

  async getMyBookings(): Promise<BookingRecord[]> {
    const { data } = await api.get('/bookings/my-bookings')
    return data.data
  },

  async confirmBooking(bookingId: string): Promise<BookingRecord> {
    const { data } = await api.patch(`/bookings/${bookingId}/confirm`)
    return data.data
  },

  async cancelBooking(bookingId: string): Promise<BookingRecord> {
    const { data } = await api.patch(`/bookings/${bookingId}/cancel`)
    return data.data
  },
}
