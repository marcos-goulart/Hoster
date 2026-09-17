import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { BackNavigation } from '../../components/BackNavigation'
import { Container, EmptyState, PageHeader } from './styles'

export function FavoritesPage() {
  const favorites = []

  return (
    <Container>
      <BackNavigation />

      <PageHeader>
        <h1>Acomodações Favoritas</h1>
        <p>Consulte os hotéis e pousadas que você salvou para planejar sua próxima viagem.</p>
      </PageHeader>

      {favorites.length === 0 ? (
        <EmptyState>
          <FaHeart className="icon" />
          <h2>Sua lista de favoritos está vazia</h2>
          <p>Explore as opções disponíveis e clique no ícone de coração para salvar acomodações.</p>
          <Link to="/" className="btn-explore">
            Explorar Hoteis
          </Link>
        </EmptyState>
      ) : (
        <div>{/* Grid de cartões de hotéis favoritos */}</div>
      )}
    </Container>
  )
}
