import { useEffect, useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FaSuitcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaBed,
  FaFileAlt,
  FaBan,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import { toast } from 'sonner'
import { BackNavigation } from '../../components/BackNavigation'
import { BookingDetailsModal } from '../../components/BookingDetailsModal'
import type { BookingRecord } from '../../services/userService'
import { userService } from '../../services/userService'
import {
  BookingCard,
  BookingInfo,
  BookingsList,
  BookingStatusGroup,
  CardActions,
  CardMain,
  ConfirmModal,
  Container,
  EmptyState,
  ExpirationWarning,
  FilterTabs,
  MobileDropdownItem,
  MobileDropdownMenu,
  MobileFilterContainer,
  MobileFilterTrigger,
  ModalOverlay,
  PageHeader,
  StatusBadge,
  TabButton,
} from './styles'

type FilterType = 'ALL' | 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED'

const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: 'ALL', label: 'Todas' },
  { key: 'CONFIRMED', label: 'Confirmadas' },
  { key: 'PENDING', label: 'Pendentes' },
  { key: 'COMPLETED', label: 'Concluídas' },
  { key: 'CANCELLED', label: 'Canceladas' },
]

const PAYMENT_TTL_MS = 2 * 60 * 60 * 1000 // 2 horas
const MIN_NOTICE_MS = 24 * 60 * 60 * 1000 // 24 horas

function formatRemainingTime(createdAt?: string): { text: string; isExpired: boolean } {
  if (!createdAt) {
    return { text: 'Tempo limite: 2 horas', isExpired: false }
  }

  const createdTime = new Date(createdAt).getTime()
  const expiresAt = createdTime + PAYMENT_TTL_MS
  const diffMs = expiresAt - Date.now()

  if (diffMs <= 0) {
    return { text: 'Prazo expirado', isExpired: true }
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0) {
    return { text: `${hours}h ${minutes}min restantes para pagar`, isExpired: false }
  }

  return { text: `${minutes}min restantes para pagar`, isExpired: false }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'CONFIRMED':
      return 'Confirmada'
    case 'PENDING_PAYMENT':
    case 'PENDING':
      return 'Pagamento Pendente'
    case 'COMPLETED':
      return 'Concluída'
    case 'CANCELLED':
      return 'Cancelada'
    default:
      return status
  }
}

export function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL')
  const [selectedBookingForVoucher, setSelectedBookingForVoucher] = useState<BookingRecord | null>(
    null,
  )
  const [bookingToCancel, setBookingToCancel] = useState<BookingRecord | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    let isMounted = true

    async function loadBookings() {
      try {
        setLoading(true)
        const data = await userService.getMyBookings()
        if (isMounted) {
          const rawList = Array.isArray(data) ? data : []
          const seenIds = new Set<string>()
          const seenTripKeys = new Set<string>()

          const uniqueBookings = rawList.filter((item) => {
            if (!item || !item.id) return false
            if (seenIds.has(item.id)) return false
            seenIds.add(item.id)

            const tripKey = `${item.hotel?.name || ''}_${item.checkIn}_${item.checkOut}`
            if (seenTripKeys.has(tripKey)) return false
            seenTripKeys.add(tripKey)

            return true
          })

          setBookings(uniqueBookings)
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

  // Contagem para as abas de filtro
  const counts = useMemo(() => {
    const res = {
      ALL: bookings.length,
      CONFIRMED: 0,
      PENDING: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    }

    bookings.forEach((b) => {
      if (b.status === 'CONFIRMED') res.CONFIRMED++
      else if (b.status === 'PENDING_PAYMENT' || b.status === 'PENDING') res.PENDING++
      else if (b.status === 'COMPLETED') res.COMPLETED++
      else if (b.status === 'CANCELLED') res.CANCELLED++
    })

    return res
  }, [bookings])

  // Lista filtrada
  const filteredBookings = useMemo(() => {
    if (activeFilter === 'ALL') return bookings
    if (activeFilter === 'PENDING') {
      return bookings.filter((b) => b.status === 'PENDING_PAYMENT' || b.status === 'PENDING')
    }
    return bookings.filter((b) => b.status === activeFilter)
  }, [bookings, activeFilter])

  // Executa cancelamento com feedback via Toast
  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return

    try {
      setIsCancelling(true)
      await userService.cancelBooking(bookingToCancel.id)

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingToCancel.id ? { ...b, status: 'CANCELLED' } : b)),
      )

      toast.success('Reserva cancelada com sucesso.')
      setBookingToCancel(null)
    } catch (err: unknown) {
      const errorObj = err as {
        response?: { data?: { error?: string } }
        message?: string
      }
      const msg =
        errorObj.response?.data?.error || errorObj.message || 'Erro ao cancelar a reserva.'
      toast.error(msg)
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <Container>
      <BackNavigation />

      <PageHeader>
        <h1>Minhas Viagens</h1>
        <p>Acompanhe e gerencie todas as suas reservas efetuadas na Hoster.</p>
      </PageHeader>

      <FilterTabs role="tablist" aria-label="Filtrar viagens por estado">
        <TabButton
          type="button"
          role="tab"
          aria-selected={activeFilter === 'ALL'}
          $active={activeFilter === 'ALL'}
          onClick={() => setActiveFilter('ALL')}
        >
          Todas <span className="badge-count">{counts.ALL}</span>
        </TabButton>
        <TabButton
          type="button"
          role="tab"
          aria-selected={activeFilter === 'CONFIRMED'}
          $active={activeFilter === 'CONFIRMED'}
          onClick={() => setActiveFilter('CONFIRMED')}
        >
          Confirmadas <span className="badge-count">{counts.CONFIRMED}</span>
        </TabButton>
        <TabButton
          type="button"
          role="tab"
          aria-selected={activeFilter === 'PENDING'}
          $active={activeFilter === 'PENDING'}
          onClick={() => setActiveFilter('PENDING')}
        >
          Pendentes <span className="badge-count">{counts.PENDING}</span>
        </TabButton>
        <TabButton
          type="button"
          role="tab"
          aria-selected={activeFilter === 'COMPLETED'}
          $active={activeFilter === 'COMPLETED'}
          onClick={() => setActiveFilter('COMPLETED')}
        >
          Concluídas <span className="badge-count">{counts.COMPLETED}</span>
        </TabButton>
        <TabButton
          type="button"
          role="tab"
          aria-selected={activeFilter === 'CANCELLED'}
          $active={activeFilter === 'CANCELLED'}
          onClick={() => setActiveFilter('CANCELLED')}
        >
          Canceladas <span className="badge-count">{counts.CANCELLED}</span>
        </TabButton>
      </FilterTabs>

      {/* Seletor Dropdown Responsivo para Mobile (<= 768px) */}
      <MobileFilterContainer ref={dropdownRef} data-testid="mobile-filter-container">
        <MobileFilterTrigger
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
          aria-label="Abrir seletor de filtros de viagens"
        >
          <div className="trigger-content">
            <span className="label-prefix">Filtrar:</span>
            <strong>
              {FILTER_OPTIONS.find((opt) => opt.key === activeFilter)?.label} (
              {counts[activeFilter]})
            </strong>
          </div>
          <span className="chevron">
            {isDropdownOpen ? (
              <FaChevronUp aria-hidden="true" />
            ) : (
              <FaChevronDown aria-hidden="true" />
            )}
          </span>
        </MobileFilterTrigger>

        {isDropdownOpen && (
          <MobileDropdownMenu role="listbox" aria-label="Opções de filtros de viagens">
            {FILTER_OPTIONS.map((opt) => (
              <MobileDropdownItem
                key={opt.key}
                type="button"
                role="option"
                aria-selected={activeFilter === opt.key}
                $active={activeFilter === opt.key}
                onClick={() => {
                  setActiveFilter(opt.key)
                  setIsDropdownOpen(false)
                }}
              >
                <span>{opt.label}</span>
                <span className="badge-count">{counts[opt.key]}</span>
              </MobileDropdownItem>
            ))}
          </MobileDropdownMenu>
        )}
      </MobileFilterContainer>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando suas reservas...</p>
      ) : filteredBookings.length === 0 ? (
        <EmptyState>
          <FaSuitcase className="icon" aria-hidden="true" />
          <h2>Nenhuma viagem encontrada</h2>
          <p>
            {activeFilter === 'ALL'
              ? 'Você ainda não possui reservas. Que tal explorar novas acomodações?'
              : `Não há reservas com status "${getStatusLabel(activeFilter)}" no momento.`}
          </p>
          <Link to="/" className="btn-explore">
            Buscar Acomodações
          </Link>
        </EmptyState>
      ) : (
        <BookingsList>
          {filteredBookings.map((booking) => {
            const isPending = booking.status === 'PENDING_PAYMENT' || booking.status === 'PENDING'
            const checkInTime = new Date(booking.checkIn).getTime()
            const nowTime = Date.now()
            const diffTime = checkInTime - nowTime

            const canCancel =
              (booking.status === 'CONFIRMED' || isPending) && diffTime >= MIN_NOTICE_MS

            const showLess24hNotice =
              (booking.status === 'CONFIRMED' || isPending) &&
              diffTime > 0 &&
              diffTime < MIN_NOTICE_MS

            const remaining = isPending ? formatRemainingTime(booking.createdAt) : null

            return (
              <BookingCard key={booking.id} data-testid={`booking-card-${booking.id}`}>
                <CardMain>
                  <BookingInfo>
                    <h3>{booking.hotel?.name || booking.room?.hotel?.name || 'Acomodação'}</h3>
                    <p className="location">
                      <FaMapMarkerAlt aria-hidden="true" />
                      {booking.hotel?.city || booking.room?.hotel?.city || 'Localidade'},{' '}
                      {booking.hotel?.state || booking.room?.hotel?.state || 'BR'}
                    </p>
                    <p className="dates">
                      <FaCalendarAlt aria-hidden="true" />
                      {new Date(booking.checkIn).toLocaleDateString('pt-BR')} até{' '}
                      {new Date(booking.checkOut).toLocaleDateString('pt-BR')}
                    </p>
                    {booking.room?.title && (
                      <p className="room-name">
                        <FaBed aria-hidden="true" />
                        {booking.room.title}
                      </p>
                    )}
                  </BookingInfo>

                  <BookingStatusGroup>
                    <p className="price">
                      {booking.totalPrice.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                    <StatusBadge $status={booking.status}>
                      {getStatusLabel(booking.status)}
                    </StatusBadge>
                  </BookingStatusGroup>
                </CardMain>

                {isPending && remaining && (
                  <ExpirationWarning data-testid="pending-expiration-alert">
                    <div className="message-group">
                      <FaClock className="icon" aria-hidden="true" />
                      <span>{remaining.text}</span>
                    </div>

                    {!remaining.isExpired && (
                      <Link to={`/pagamento/${booking.id}`} className="btn-pay-quick">
                        Concluir Pagamento
                      </Link>
                    )}
                  </ExpirationWarning>
                )}

                <CardActions>
                  {showLess24hNotice && (
                    <span className="notice-lock">
                      Cancelamento indisponível (menos de 24h para o check-in)
                    </span>
                  )}

                  <button
                    type="button"
                    className="btn-voucher"
                    onClick={() => setSelectedBookingForVoucher(booking)}
                  >
                    <FaFileAlt aria-hidden="true" style={{ marginRight: '0.35rem' }} />
                    Ver Voucher
                  </button>

                  {canCancel && (
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setBookingToCancel(booking)}
                    >
                      <FaBan aria-hidden="true" style={{ marginRight: '0.35rem' }} />
                      Cancelar Reserva
                    </button>
                  )}
                </CardActions>
              </BookingCard>
            )
          })}
        </BookingsList>
      )}

      {/* Modal de Detalhes / Voucher */}
      <BookingDetailsModal
        booking={selectedBookingForVoucher}
        isOpen={Boolean(selectedBookingForVoucher)}
        onClose={() => setSelectedBookingForVoucher(null)}
      />

      {/* Modal de Confirmação de Cancelamento */}
      {bookingToCancel && (
        <ModalOverlay onClick={() => !isCancelling && setBookingToCancel(null)}>
          <ConfirmModal onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>Confirmar Cancelamento</h3>
            <p>
              Tem certeza que deseja cancelar sua reserva no{' '}
              <strong>
                {bookingToCancel.hotel?.name || bookingToCancel.room?.hotel?.name || 'hotel'}
              </strong>
              ? Essa ação liberará a sua acomodação imediatamente.
            </p>

            <div className="actions">
              <button
                type="button"
                className="btn-abort"
                disabled={isCancelling}
                onClick={() => setBookingToCancel(null)}
              >
                Voltar
              </button>
              <button
                type="button"
                className="btn-confirm-cancel"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
              >
                {isCancelling ? 'Cancelando...' : 'Sim, Cancelar'}
              </button>
            </div>
          </ConfirmModal>
        </ModalOverlay>
      )}
    </Container>
  )
}
