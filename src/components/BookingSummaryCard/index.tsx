import { FaShieldAlt, FaCheckCircle } from 'react-icons/fa'
import { formatBRL } from '../../utils/checkoutUtils'
import { sanitizeAndFormatDate } from '../../utils/paymentUtils'
import type { BookingState } from '../../pages/PaymentPage/types'
import { Container, BadgeList } from './styles'

interface BookingSummaryCardProps {
  booking?: BookingState
  bookingId?: string
  periodoDisplay: string
}

export function BookingSummaryCard({
  booking,
  bookingId,
  periodoDisplay,
}: BookingSummaryCardProps) {
  const hotelName = booking?.room?.hotel?.name || 'Grand Palace Resort & Spa'
  const hotelAddress = booking?.room?.hotel?.address || 'Avenida Atlântica, 1500'
  const roomTitle = booking?.room?.title || booking?.room?.name || 'Suíte Presidencial Vista Mar'
  const pricePerNight = booking?.room?.pricePerNight || booking?.room?.price || 850.0
  const nightsCount = booking?.nights || 3
  const serviceFee = 120.0
  const roomSubtotal = pricePerNight * nightsCount
  const totalPrice = booking?.totalPrice || roomSubtotal + serviceFee

  const hotelPhoto =
    booking?.room?.hotel?.photos?.[0] ||
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'

  const formattedCheckIn = sanitizeAndFormatDate(booking?.checkIn)
  const formattedCheckOut = sanitizeAndFormatDate(booking?.checkOut)

  return (
    <Container>
      <div className="hotel-photo-wrapper">
        <img src={hotelPhoto} alt={hotelName} />
        <span className="booking-tag">Reserva #{bookingId?.slice(0, 8)}</span>
      </div>

      <div className="hotel-info">
        <h2>{hotelName}</h2>
        <p className="address">📍 {hotelAddress}</p>

        <div className="room-selected-box">
          <small>ACOMODAÇÃO SELECIONADA</small>
          <div className="room-details-row">
            <strong>🛏️ {roomTitle}</strong>
            <span className="night-price">{formatBRL(pricePerNight)} / noite</span>
          </div>
        </div>

        <div className="stay-dates">
          <div>
            <small>CHECK-IN</small>
            <strong>{formattedCheckIn}</strong>
          </div>
          <div className="divider-line" />
          <div>
            <small>CHECK-OUT</small>
            <strong>{formattedCheckOut}</strong>
          </div>
          <div className="divider-line" />
          <div>
            <small>PERÍODO</small>
            <strong>{periodoDisplay}</strong>
          </div>
        </div>

        <div className="price-breakdown">
          <div className="row">
            <span>Hóspede principal</span>
            <strong>{booking?.guestFullName || 'Marcos Goulart'}</strong>
          </div>
          <div className="row">
            <span>Duração</span>
            <span>
              {nightsCount} {nightsCount === 1 ? 'noite' : 'noites'}
            </span>
          </div>

          <div className="price-summary-card">
            <div className="price-summary-row">
              <span className="price-desc">
                {roomTitle} ({nightsCount}x {formatBRL(pricePerNight)})
              </span>
              <strong className="price-val">{formatBRL(roomSubtotal)}</strong>
            </div>
            <div className="price-summary-row">
              <span className="price-desc">Taxa de serviço Hoster</span>
              <strong className="price-val">{formatBRL(serviceFee)}</strong>
            </div>
            <div className="price-divider" />
            <div className="price-summary-row total-row">
              <span>Valor Total</span>
              <strong className="total-price">{formatBRL(totalPrice)}</strong>
            </div>
          </div>
        </div>

        <BadgeList>
          <div>
            <FaShieldAlt style={{ color: '#16a34a' }} />
            <span>Pagamento 100% Protegido</span>
          </div>
          <div>
            <FaCheckCircle style={{ color: '#2563eb' }} />
            <span>Confirmação Imediata</span>
          </div>
        </BadgeList>
      </div>
    </Container>
  )
}
