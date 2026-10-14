import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSuitcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { BackNavigation } from '../../components/BackNavigation'
import type { BookingRecord } from '../../services/userService'
import { userService } from '../../services/userService'
import {
  BookingCard,
  BookingInfo,
  BookingsList,
  BookingStatusGroup,
  Container,
  EmptyState,
  PageHeader,
  StatusBadge,
} from './styles'

export function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadBookings() {
      try {
        setLoading(true)
        const data = await userService.getMyBookings()
        if (isMounted) {
          setBookings(data)
        }
      } catch (error) {
        console.error('Erro ao buscar viagens:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadBookings()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Container>
      <BackNavigation />

      <PageHeader>
        <h1>Minhas Viagens</h1>
        <p>Acompanhe e gerencie todas as suas reservas efetuadas na Hoster.</p>
      </PageHeader>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando suas reservas...</p>
      ) : bookings.length === 0 ? (
        <EmptyState>
          <FaSuitcase className="icon" />
          <h2>Nenhuma viagem encontrada</h2>
          <p>Você ainda não possui reservas confirmadas. Que tal explorar novas acomodações?</p>
          <Link to="/" className="btn-explore">
            Buscar Acomodações
          </Link>
        </EmptyState>
      ) : (
        <BookingsList>
          {bookings.map((booking) => (
            <BookingCard key={booking.id}>
              <BookingInfo>
                <h3>{booking.hotel?.name || 'Acomodação'}</h3>
                <p className="location">
                  <FaMapMarkerAlt />
                  {booking.hotel?.city}, {booking.hotel?.state}
                </p>
                <p className="dates">
                  <FaCalendarAlt />
                  {new Date(booking.checkIn).toLocaleDateString('pt-BR')} até{' '}
                  {new Date(booking.checkOut).toLocaleDateString('pt-BR')}
                </p>
              </BookingInfo>

              <BookingStatusGroup>
                <StatusBadge $status={booking.status}>
                  {booking.status === 'CONFIRMED' ? 'Confirmada' : booking.status}
                </StatusBadge>
                <p className="price">
                  {booking.totalPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              </BookingStatusGroup>
            </BookingCard>
          ))}
        </BookingsList>
      )}
    </Container>
  )
}
