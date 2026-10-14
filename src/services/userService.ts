// src/services/userService.ts
import api from './api'
import type { Hotel } from '../interfaces/Hotel'

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

  async getMyBookings() {
    const { data } = await api.get('/bookings/my-bookings')
    return data.data
  },
}
