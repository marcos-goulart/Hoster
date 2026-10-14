import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { BackNavigation } from '../../components/BackNavigation'
import { HotelCardResult } from '../../components/HotelCardResult'
import { userService } from '../../services/userService'
import type { Hotel } from '../../interfaces/Hotel'
import { Container, EmptyState, PageHeader, HotelsGrid } from './styles'

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadFavorites() {
      try {
        setLoading(true)
        const data = await userService.getFavorites()
        if (isMounted) {
          setFavorites(data)
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadFavorites()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Container>
      <BackNavigation />

      <PageHeader>
        <h1>Acomodações Favoritas</h1>
        <p>Consulte os hotéis e pousadas que você salvou para planejar sua próxima viagem.</p>
      </PageHeader>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando seus favoritos...</p>
      ) : favorites.length === 0 ? (
        <EmptyState>
          <FaHeart className="icon" />
          <h2>Sua lista de favoritos está vazia</h2>
          <p>Explore as opções disponíveis e clique no ícone de coração para salvar acomodações.</p>
          <Link to="/" className="btn-explore">
            Explorar Hotéis
          </Link>
        </EmptyState>
      ) : (
        <HotelsGrid>
          {favorites.map((hotel) => (
            <HotelCardResult key={hotel.id} hotel={hotel} nights={1} />
          ))}
        </HotelsGrid>
      )}
    </Container>
  )
}
