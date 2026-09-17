import { Link } from 'react-router-dom'
import { FaSuitcase } from 'react-icons/fa'
import { BackNavigation } from '../../components/BackNavigation'
import { Container, EmptyState, PageHeader } from './styles'

export function MyBookingsPage() {
  // Mock inicial para visualização do layout de estado vazio
  const bookings = []

  return (
    <Container>
      <BackNavigation />

      <PageHeader>
        <h1>Minhas Viagens</h1>
        <p>Acompanhe e gerencie todas as suas reservas efetuadas na Hoster.</p>
      </PageHeader>

      {bookings.length === 0 ? (
        <EmptyState>
          <FaSuitcase className="icon" />
          <h2>Nenhuma viagem encontrada</h2>
          <p>Você ainda não possui reservas confirmadas. Que tal explorar novas acomodações?</p>
          <Link to="/" className="btn-explore">
            Buscar Acomodações
          </Link>
        </EmptyState>
      ) : (
        <div>{/* Lista de reservas será renderizada aqui na integração do backend */}</div>
      )}
    </Container>
  )
}
