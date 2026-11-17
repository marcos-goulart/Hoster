import { useEffect, useRef, useState } from 'react'
import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUserFriends,
  FaMapMarkerAlt,
  FaPrint,
  FaBed,
} from 'react-icons/fa'
import { lenisInstance } from '../../hooks/useSmoothScroll'
import type { BookingRecord } from '../../services/userService'
import { StatusBadge } from '../../pages/MyBookings/styles'
import {
  DetailsGrid,
  FinancialSummary,
  HotelSection,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  Overlay,
  ProgressBarFill,
  ProgressBarTrack,
  VoucherBanner,
} from './styles'

export interface BookingDetailsModalProps {
  booking: BookingRecord | null
  isOpen: boolean
  onClose: () => void
}

export function BookingDetailsModal({ booking, isOpen, onClose }: BookingDetailsModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [prevTargetKey, setPrevTargetKey] = useState(`${isOpen}-${booking?.id}`)
  const modalBodyRef = useRef<HTMLDivElement>(null)

  const currentTargetKey = `${isOpen}-${booking?.id}`
  if (currentTargetKey !== prevTargetKey) {
    setPrevTargetKey(currentTargetKey)
    setScrollProgress(0)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      lenisInstance?.stop()
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      lenisInstance?.start()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0
    }
  }, [isOpen, booking?.id])

  if (!isOpen || !booking) return null

  const hotelName = booking.hotel?.name || booking.room?.hotel?.name || 'Acomodação Hoster'
  const hotelAddress =
    booking.hotel?.address ||
    booking.room?.hotel?.address ||
    (booking.hotel?.city && `${booking.hotel.city}, ${booking.hotel.state}`) ||
    'Endereço não informado'
  const hotelPhoto =
    booking.hotel?.photos?.[0] ||
    booking.room?.hotel?.photos?.[0] ||
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'
  const roomTitle = booking.room?.title || 'Quarto Standard'
  const roomSubtitle = booking.room?.subtitle

  const checkInFormatted = new Date(booking.checkIn).toLocaleDateString('pt-BR')
  const checkOutFormatted = new Date(booking.checkOut).toLocaleDateString('pt-BR')

  const guestsCount = booking.guests || booking.guestsCount || 1
  const periodArrival = booking.period || 'Não especificado'

  const nights =
    booking.nights ||
    Math.max(
      1,
      Math.ceil(
        Math.abs(new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    )

  const serviceFee = booking.serviceFee ?? 120.0
  const roomTotal = Math.max(0, booking.totalPrice - serviceFee)

  const getStatusLabel = (status: string) => {
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

  const handlePrint = () => {
    window.print()
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const maxScroll = target.scrollHeight - target.clientHeight
    if (maxScroll <= 0) {
      setScrollProgress(0)
      return
    }
    const pct = Math.min(100, Math.max(0, (target.scrollTop / maxScroll) * 100))
    setScrollProgress(pct)
  }

  return (
    <Overlay onClick={onClose} data-testid="voucher-overlay">
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        data-lenis-prevent
      >
        <ModalHeader>
          <h2>Voucher da Reserva</h2>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Fechar detalhes da reserva"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </ModalHeader>

        <ProgressBarTrack aria-hidden="true">
          <ProgressBarFill $progress={scrollProgress} data-testid="voucher-scroll-progress" />
        </ProgressBarTrack>

        <ModalBody ref={modalBodyRef} onScroll={handleScroll} data-lenis-prevent>
          <VoucherBanner>
            <div className="code-group">
              <span>Código da Reserva</span>
              <strong>{booking.id}</strong>
            </div>

            <StatusBadge $status={booking.status}>{getStatusLabel(booking.status)}</StatusBadge>
          </VoucherBanner>

          <HotelSection>
            <img src={hotelPhoto} alt={hotelName} />
            <div className="hotel-info">
              <h3>{hotelName}</h3>
              <p className="address">
                <FaMapMarkerAlt aria-hidden="true" />
                {hotelAddress}
              </p>
              <p className="room">
                <FaBed aria-hidden="true" style={{ marginRight: '0.35rem' }} />
                {roomTitle} {roomSubtitle ? `• ${roomSubtitle}` : ''}
              </p>
            </div>
          </HotelSection>

          <DetailsGrid>
            <div className="item">
              <span className="label">Check-in</span>
              <span className="value">
                <FaCalendarAlt aria-hidden="true" />
                {checkInFormatted}
              </span>
            </div>

            <div className="item">
              <span className="label">Check-out</span>
              <span className="value">
                <FaCalendarAlt aria-hidden="true" />
                {checkOutFormatted}
              </span>
            </div>

            <div className="item">
              <span className="label">Período de Chegada</span>
              <span className="value">
                <FaClock aria-hidden="true" />
                {periodArrival}
              </span>
            </div>

            <div className="item">
              <span className="label">Hóspedes</span>
              <span className="value">
                <FaUserFriends aria-hidden="true" />
                {guestsCount} {guestsCount === 1 ? 'hóspede' : 'hóspedes'}
              </span>
            </div>

            {booking.guestFullName && (
              <div className="item" style={{ gridColumn: '1 / -1' }}>
                <span className="label">Titular da Reserva</span>
                <span className="value">
                  {booking.guestFullName}
                  {booking.guestDocument ? ` (CPF: ${booking.guestDocument})` : ''}
                  {booking.guestEmail ? ` • ${booking.guestEmail}` : ''}
                </span>
              </div>
            )}
          </DetailsGrid>

          <FinancialSummary>
            <h4>Resumo Financeiro</h4>
            <div className="line">
              <span>
                Diárias ({nights} {nights === 1 ? 'noite' : 'noites'})
              </span>
              <span>
                {roomTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <div className="line">
              <span>Taxa de serviço e limpeza</span>
              <span>
                {serviceFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <div className="line total">
              <span>Valor Total</span>
              <span>
                {booking.totalPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          </FinancialSummary>
        </ModalBody>

        <ModalFooter>
          <button type="button" className="btn-secondary" onClick={handlePrint}>
            <FaPrint aria-hidden="true" style={{ marginRight: '0.4rem' }} />
            Imprimir Voucher
          </button>
          <button type="button" className="btn-primary" onClick={onClose}>
            Fechar
          </button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  )
}
