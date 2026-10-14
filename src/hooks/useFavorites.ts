import { useState, useEffect } from 'react'
import { userService } from '../services/userService'
import { useAuth } from './useAuth'
import { toast } from 'sonner'
import type { Hotel } from '../interfaces/Hotel'

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      setFavorites([])
      return
    }

    async function loadFavorites() {
      setLoading(true)
      try {
        const data = await userService.getFavorites()
        setFavorites(data)
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [user])

  const toggleFavorite = async (hotel: Hotel) => {
    if (!user) {
      toast.error('Faça login para salvar suas acomodações favoritas.')
      return
    }

    const isFav = favorites.some((fav) => fav.id === hotel.id)

    if (isFav) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== hotel.id))
      try {
        await userService.removeFavorite(hotel.id)
        toast.success('Removido dos favoritos.')
      } catch {
        setFavorites((prev) => [...prev, hotel])
      }
    } else {
      setFavorites((prev) => [...prev, hotel])
      try {
        await userService.addFavorite(hotel.id)
        toast.success('Salvo em seus favoritos!')
      } catch {
        setFavorites((prev) => prev.filter((fav) => fav.id !== hotel.id))
      }
    }
  }

  return { favorites, loading, toggleFavorite }
}
