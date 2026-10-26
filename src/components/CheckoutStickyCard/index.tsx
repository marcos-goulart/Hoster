import { FaEdit } from 'react-icons/fa'
import type { BookingGuestData, RoomOption } from '../../interfaces/Reservation'
import { formatBRL } from '../../utils/checkoutUtils'
import { EditStayPopover } from './EditStayPopover'
import { GuestFormFields } from './GuestFormFields'
import { PriceSummaryBox } from './PriceSummaryBox'
import { useCheckoutForm } from '../../hooks/useCheckoutForm'
import {
  Card,
  CheckoutHeader,
  GuaranteeBadge,
  SectionTitle,
  StayDetailsBox,
  SubmitButton,
} from './styles'

export interface CheckoutStickyCardProps {
  selectedRoom: RoomOption
  nights: number
  checkIn: string
  checkOut: string
  checkInISO?: string
  checkOutISO?: string
  periodo?: string
  guestsCount: number
  isSubmitting: boolean
  onUpdateStayDetails?: (
    nights: number,
    guests: number,
    details?: { checkIn?: string; checkOut?: string; period?: string },
  ) => void
  onSubmitBooking: (guestData: BookingGuestData) => void
}

export function CheckoutStickyCard({
  selectedRoom,
  nights,
  checkIn,
  checkOut,
  checkInISO,
  checkOutISO,
  periodo,
  guestsCount,
  isSubmitting,
  onUpdateStayDetails,
  onSubmitBooking,
}: CheckoutStickyCardProps) {
  const {
    form,
    showEditStay,
    tempNights,
    tempGuests,
    tempCheckIn,
    tempCheckOut,
    tempPeriodo,
    setTempNights,
    setTempGuests,
    setTempPeriodo,
    handleDatesChange,
    handleToggleEditStay,
    handleApplyStayUpdate,
    handleInputChange,
    handleSubmit,
  } = useCheckoutForm({
    nights,
    guestsCount,
    checkInISO,
    checkOutISO,
    periodo,
    onUpdateStayDetails,
    onSubmitBooking,
  })

  const dailyTotal = selectedRoom.pricePerNight * nights
  const serviceFee = 120
  const grandTotal = dailyTotal + serviceFee

  return (
    <Card data-testid="checkout-sticky-card">
      <CheckoutHeader>
        <div className="price-main">
          <strong data-testid="checkout-daily-price">
            {formatBRL(selectedRoom.pricePerNight)}
          </strong>
          <span> / noite</span>
        </div>
        <span className="nights-label" data-testid="checkout-nights-label">
          Total {nights} {nights === 1 ? 'noite' : 'noites'}
        </span>
      </CheckoutHeader>

      <StayDetailsBox>
        <div className="stay-item" style={{ gridColumn: 'span 2' }}>
          <label>CHECK-IN / OUT</label>
          <span data-testid="stay-dates-display">
            {checkIn} - {checkOut}
          </span>
        </div>
        <div className="stay-item">
          <label>HÓSPEDES</label>
          <span data-testid="stay-guests-display">
            {guestsCount} {guestsCount === 1 ? 'Hóspede' : 'Hóspedes'}
          </span>
        </div>
        <div className="stay-item">
          <label>PERÍODO</label>
          <span data-testid="stay-period-display">{periodo || 'Manhã'}</span>
        </div>

        <button
          type="button"
          className="btn-edit-stay"
          onClick={handleToggleEditStay}
          title="Alterar datas, período ou hóspedes"
        >
          <FaEdit aria-hidden="true" /> Alterar
        </button>

        {showEditStay && (
          <EditStayPopover
            tempCheckIn={tempCheckIn}
            tempCheckOut={tempCheckOut}
            tempPeriodo={tempPeriodo}
            tempNights={tempNights}
            tempGuests={tempGuests}
            onChangeDates={handleDatesChange}
            onChangePeriodo={setTempPeriodo}
            onChangeNights={setTempNights}
            onChangeGuests={setTempGuests}
            onApply={handleApplyStayUpdate}
          />
        )}
      </StayDetailsBox>

      <GuaranteeBadge>✓ Cancelamento gratuito até 48h antes</GuaranteeBadge>

      <SectionTitle style={{ fontSize: '1rem', marginBottom: '0.85rem' }}>
        Dados do Hóspede Principal
      </SectionTitle>

      <form onSubmit={handleSubmit} data-testid="checkout-form">
        <GuestFormFields
          form={form}
          isSubmitting={isSubmitting}
          onChangeField={handleInputChange}
        />

        <PriceSummaryBox
          pricePerNight={selectedRoom.pricePerNight}
          nights={nights}
          dailyTotal={dailyTotal}
          serviceFee={serviceFee}
          grandTotal={grandTotal}
        />

        <SubmitButton
          type="submit"
          disabled={isSubmitting || !selectedRoom.isAvailable}
          data-testid="btn-confirm-checkout"
        >
          {isSubmitting ? 'Processando Reserva...' : 'Confirmar e Ir para Pagamento'}
        </SubmitButton>
      </form>
    </Card>
  )
}
