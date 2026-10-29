import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { FaLock, FaUserShield } from 'react-icons/fa'
import { Navbar } from '../../components/NavBar'
import { Footer } from '../../components/Footer'
import { formatBRL } from '../../utils/checkoutUtils'

import { BookingSummaryCard } from '../../components/BookingSummaryCard'
import { PixPaymentSection } from '../../components/PixPaymentSection'
import { CreditCardForm } from '../../components/CreditCardForm'
import { PaymentSuccessModal } from '../../components/PaymentSuccessModal'
import { usePaymentForm } from '../../hooks/usePaymentForm'

import type { BookingState } from './types'
import {
  Container,
  MainContent,
  GridContainer,
  PaymentCard,
  MethodSelector,
  LgpdNotice,
} from './styles'

export default function PaymentPage() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const booking = (location.state as { booking?: BookingState })?.booking

  const {
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    isPaid,
    timeLeft,
    qrCodeUrl,
    copiedPix,
    handleCopyPix,
    cardNumber,
    cardName,
    cardExpiry,
    cardCvc,
    installments,
    cardError,
    setCardName,
    setInstallments,
    handleCardNumberChange,
    handleExpiryChange,
    handleCvcChange,
    handleConfirmPayment,
  } = usePaymentForm()

  const pricePerNight = booking?.room?.pricePerNight || booking?.room?.price || 850.0
  const nightsCount = booking?.nights || 3
  const serviceFee = 120.0
  const totalPrice = booking?.totalPrice || pricePerNight * nightsCount + serviceFee

  const rawPeriodo = booking?.periodo || booking?.period || searchParams.get('periodo') || 'Manhã'
  const periodoDisplay = rawPeriodo.charAt(0).toUpperCase() + rawPeriodo.slice(1).toLowerCase()

  return (
    <Container>
      <Navbar />

      <MainContent>
        <div className="container">
          <h1 className="page-title">Finalize o seu Pagamento</h1>

          <GridContainer>
            <BookingSummaryCard
              booking={booking}
              bookingId={bookingId}
              periodoDisplay={periodoDisplay}
            />

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
                <PixPaymentSection
                  timeLeft={timeLeft}
                  qrCodeUrl={qrCodeUrl}
                  copiedPix={copiedPix}
                  onCopyPix={handleCopyPix}
                />
              ) : (
                <CreditCardForm
                  cardNumber={cardNumber}
                  cardName={cardName}
                  cardExpiry={cardExpiry}
                  cardCvc={cardCvc}
                  installments={installments}
                  cardError={cardError}
                  totalPrice={totalPrice}
                  onCardNumberChange={handleCardNumberChange}
                  onCardNameChange={setCardName}
                  onExpiryChange={handleExpiryChange}
                  onCvcChange={handleCvcChange}
                  onInstallmentsChange={setInstallments}
                />
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

      {isPaid && <PaymentSuccessModal />}

      <Footer />
    </Container>
  )
}
