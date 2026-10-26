import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FaShieldAlt, FaCopy, FaCheckCircle, FaLock, FaClock, FaUserShield } from 'react-icons/fa'
import { Navbar } from '../../components/NavBar'
import { Footer } from '../../components/Footer'
import { formatBRL } from '../../utils/checkoutUtils'
import { formatShortDate } from '../../utils/dateUtils'
import {
  Container,
  MainContent,
  GridContainer,
  HotelSummaryCard,
  PaymentCard,
  MethodSelector,
  QRCodeBox,
  CardForm,
  SuccessOverlay,
  BadgeList,
  TimerBox,
  LgpdNotice,
} from './styles'

interface BookingState {
  id: string
  totalPrice: number
  guestFullName: string
  checkIn: string
  checkOut: string
  nights: number
  periodo?: string
  period?: string
  room?: {
    id?: string
    title?: string
    name?: string
    pricePerNight?: number
    price?: number
    hotel?: {
      name?: string
      city?: string
      state?: string
      photos?: string[]
      address?: string
    }
  }
}

function sanitizeAndFormatDate(dateStr?: string): string {
  if (!dateStr) return 'A definir'
  const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr
  return formatShortDate(cleanDate) || cleanDate
}

function isValidCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let shouldDouble = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10)
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

export default function PaymentPage() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const booking = (location.state as { booking?: BookingState })?.booking

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [copiedPix, setCopiedPix] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [installments, setInstallments] = useState('1')
  const [cardError, setCardError] = useState<string | null>(null)

  useEffect(() => {
    if (paymentMethod !== 'pix') return
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [paymentMethod])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const qrCodeUrl = useMemo(() => {
    const payload = encodeURIComponent(
      '00020126360014BR.GOV.BCB.PIX011412345678901234567890520400005303986540510.005802BR5913HosterHotels6009SaoPaulo62070503***6304E2CA',
    )
    return 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + payload
  }, [])

  const handleCopyPix = () => {
    void navigator.clipboard.writeText(
      '00020126360014BR.GOV.BCB.PIX011412345678901234567890520400005303986540510.005802BR5913HosterHotels6009SaoPaulo62070503***6304E2CA',
    )
    setCopiedPix(true)
    setTimeout(() => setCopiedPix(false), 3000)
  }

  const handleCardNumberChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16)
    const formatted = clean.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(formatted)
    setCardError(null)
  }

  const handleExpiryChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    let formatted = clean
    if (clean.length >= 3) {
      formatted = `${clean.slice(0, 2)}/${clean.slice(2)}`
    }
    setCardExpiry(formatted)
    setCardError(null)
  }

  const handleCvcChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    setCardCvc(clean)
    setCardError(null)
  }

  const handleConfirmPayment = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !isValidCardNumber(cardNumber)) {
        setCardError('Número de cartão de crédito inválido.')
        return
      }
      if (!cardName.trim() || cardName.trim().length < 3) {
        setCardError('Informe o nome como impresso no cartão.')
        return
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        setCardError('Informe uma data de validade válida (MM/AA).')
        return
      }
      const [expMonth] = cardExpiry.split('/').map(Number)
      if (!expMonth || expMonth < 1 || expMonth > 12) {
        setCardError('Mês de validade do cartão inválido.')
        return
      }
      if (!cardCvc || cardCvc.length < 3) {
        setCardError('Informe o CVC do cartão.')
        return
      }
    }

    setCardError(null)
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setIsPaid(true)
      setTimeout(() => {
        navigate('/minhas-viagens')
      }, 2500)
    }, 1500)
  }

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

  const rawPeriodo = booking?.periodo || booking?.period || searchParams.get('periodo') || 'Manhã'
  const periodoDisplay = rawPeriodo.charAt(0).toUpperCase() + rawPeriodo.slice(1).toLowerCase()

  return (
    <Container>
      <Navbar />

      <MainContent>
        <div className="container">
          <h1 className="page-title">Finalize o seu Pagamento</h1>

          <GridContainer>
            {/* Card Esquerdo: Resumo Completo */}
            <HotelSummaryCard>
              <div className="hotel-photo-wrapper">
                <img src={hotelPhoto} alt={hotelName} />
                <span className="booking-tag">Reserva #{bookingId?.slice(0, 8)}</span>
              </div>

              <div className="hotel-info">
                <h2>{hotelName}</h2>
                <p className="address">📍 {hotelAddress}</p>

                {/* Quarto e Valor da Diária */}
                <div className="room-selected-box">
                  <small>ACOMODAÇÃO SELECIONADA</small>
                  <div className="room-details-row">
                    <strong>🛏️ {roomTitle}</strong>
                    <span className="night-price">{formatBRL(pricePerNight)} / noite</span>
                  </div>
                </div>

                {/* Check-in / Check-out / Período */}
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

                {/* Resumo e Discriminativo de Preço */}
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
            </HotelSummaryCard>

            {/* Card Direito: Opções de Pagamento */}
            <PaymentCard>
              <MethodSelector>
                <button
                  type="button"
                  className={paymentMethod === 'pix' ? 'active' : ''}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <span>⚡ PIX</span>
                  <small>Aprovação Instantânea</small>
                </button>

                <button
                  type="button"
                  className={paymentMethod === 'card' ? 'active' : ''}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span>💳 Cartão de Crédito</span>
                  <small>Até 12x no cartão</small>
                </button>
              </MethodSelector>

              {paymentMethod === 'pix' ? (
                <>
                  <TimerBox>
                    <FaClock />
                    <span>O QR Code expira em: </span>
                    <strong>{formatTimer(timeLeft)}</strong>
                  </TimerBox>

                  <QRCodeBox>
                    <img src={qrCodeUrl} alt="QR Code PIX" />
                    <p>Aponte a câmera do seu celular no aplicativo do seu banco para pagar.</p>

                    <button type="button" className="btn-copy-pix" onClick={handleCopyPix}>
                      <FaCopy />{' '}
                      {copiedPix ? 'Código PIX Copiado!' : 'Copiar Código PIX (Copia e Cola)'}
                    </button>
                  </QRCodeBox>
                </>
              ) : (
                <CardForm>
                  {cardError && <div className="card-error-alert">{cardError}</div>}

                  <div className="input-group">
                    <label htmlFor="cardNumber">Número do Cartão</label>
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="cardName">Nome impresso no cartão</label>
                    <input
                      id="cardName"
                      type="text"
                      placeholder="Como no cartão"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="input-group">
                      <label htmlFor="cardExpiry">Validade</label>
                      <input
                        id="cardExpiry"
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="cardCvc">CVC</label>
                      <input
                        id="cardCvc"
                        type="text"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => handleCvcChange(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="installments">Parcelamento</label>
                    <select
                      id="installments"
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                    >
                      <option value="1">1x de {formatBRL(totalPrice)} sem juros</option>
                      <option value="2">2x de {formatBRL(totalPrice / 2)} sem juros</option>
                      <option value="3">3x de {formatBRL(totalPrice / 3)} sem juros</option>
                      <option value="6">6x de {formatBRL(totalPrice / 6)} sem juros</option>
                    </select>
                  </div>
                </CardForm>
              )}

              <button
                type="button"
                className="btn-submit-payment"
                onClick={handleConfirmPayment}
                disabled={isProcessing}
              >
                <FaLock style={{ marginRight: '0.5rem' }} />
                {isProcessing
                  ? 'Processando Pagamento...'
                  : `Confirmar Pagamento de ${formatBRL(totalPrice)}`}
              </button>

              <LgpdNotice>
                <FaUserShield />
                <span>
                  <strong>Não gravamos seus dados de cartão.</strong> Processamento em ambiente
                  criptografado e em conformidade com a LGPD.
                </span>
              </LgpdNotice>
            </PaymentCard>
          </GridContainer>
        </div>
      </MainContent>

      {isPaid && (
        <SuccessOverlay>
          <div className="modal-content">
            <div className="check-icon">✓</div>
            <h2>Pagamento Confirmado!</h2>
            <p>Sua reserva foi concluída com sucesso e os detalhes enviados para o seu e-mail.</p>
            <span>Redirecionando para Minhas Viagens...</span>
          </div>
        </SuccessOverlay>
      )}

      <Footer />
    </Container>
  )
}
