import { useState, type FormEvent, type ChangeEvent } from 'react'
import { FaEdit } from 'react-icons/fa'
import type { BookingGuestData, RoomOption } from '../../interfaces/Reservation'
import { maskCPFOrPassport, maskPhone } from '../../utils/masks'
import {
  Card,
  CheckoutHeader,
  EditPopover,
  FormGroup,
  GuaranteeBadge,
  SectionTitle,
  StayDetailsBox,
  SubmitButton,
  SummaryBox,
} from './styles'

export interface CheckoutStickyCardProps {
  selectedRoom: RoomOption
  nights: number
  checkIn: string
  checkOut: string
  guestsCount: number
  isSubmitting: boolean
  onUpdateStayDetails?: (nights: number, guests: number) => void
  onSubmitBooking: (guestData: BookingGuestData) => void
}

// Utilitário interno para evitar repetição do formato de moeda
const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function CheckoutStickyCard({
  selectedRoom,
  nights,
  checkIn,
  checkOut,
  guestsCount,
  isSubmitting,
  onUpdateStayDetails,
  onSubmitBooking,
}: CheckoutStickyCardProps) {
  // Estado agrupado do Formulário do Hóspede
  const [form, setForm] = useState({
    fullName: 'Marcos Goulart',
    email: 'marcos@email.com',
    document: '',
    phone: '',
  })

  // Controles do Popover
  const [showEditStay, setShowEditStay] = useState(false)
  const [tempNights, setTempNights] = useState(nights)
  const [tempGuests, setTempGuests] = useState(guestsCount)

  // Totais Financeiros
  const dailyTotal = selectedRoom.pricePerNight * nights
  const serviceFee = 120
  const grandTotal = dailyTotal + serviceFee

  // Handlers
  const handleToggleEditStay = () => {
    if (!showEditStay) {
      setTempNights(nights)
      setTempGuests(guestsCount)
    }
    setShowEditStay((prev) => !prev)
  }

  const handleApplyStayUpdate = () => {
    onUpdateStayDetails?.(tempNights, tempGuests)
    setShowEditStay(false)
  }

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmitBooking({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      document: form.document.trim(),
      phone: form.phone.trim(),
    })
  }

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

      {/* Caixa de Ajuste de Estadia */}
      <StayDetailsBox>
        <div className="stay-item">
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

        <button
          type="button"
          className="btn-edit-stay"
          onClick={handleToggleEditStay}
          title="Alterar diárias ou hóspedes"
        >
          <FaEdit aria-hidden="true" /> Alterar
        </button>

        {showEditStay && (
          <EditPopover>
            <div className="popover-row">
              <label>Diárias:</label>
              <div className="counter">
                <button type="button" onClick={() => setTempNights((v) => Math.max(1, v - 1))}>
                  -
                </button>
                <strong>{tempNights}</strong>
                <button type="button" onClick={() => setTempNights((v) => v + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="popover-row">
              <label>Viajantes:</label>
              <div className="counter">
                <button type="button" onClick={() => setTempGuests((v) => Math.max(1, v - 1))}>
                  -
                </button>
                <strong>{tempGuests}</strong>
                <button type="button" onClick={() => setTempGuests((v) => v + 1)}>
                  +
                </button>
              </div>
            </div>

            <button type="button" className="btn-apply-popover" onClick={handleApplyStayUpdate}>
              Aplicar Alterações
            </button>
          </EditPopover>
        )}
      </StayDetailsBox>

      <GuaranteeBadge>✓ Cancelamento gratuito até 48h antes</GuaranteeBadge>

      <SectionTitle style={{ fontSize: '1rem', marginBottom: '0.85rem' }}>
        Dados do Hóspede Principal
      </SectionTitle>

      <form onSubmit={handleSubmit} data-testid="checkout-form">
        <FormGroup>
          <label htmlFor="guest-full-name">Nome Completo</label>
          <input
            id="guest-full-name"
            type="text"
            required
            value={form.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            disabled={isSubmitting}
            data-testid="input-fullname"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="guest-email">E-mail</label>
          <input
            id="guest-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isSubmitting}
            data-testid="input-email"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="guest-document">CPF / Passaporte</label>
          <input
            id="guest-document"
            type="text"
            required
            placeholder="000.000.000-00 ou Passaporte"
            value={form.document}
            onChange={(e) => handleInputChange('document', maskCPFOrPassport(e.target.value))}
            disabled={isSubmitting}
            data-testid="input-document"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="guest-phone">Telefone</label>
          <input
            id="guest-phone"
            type="tel"
            required
            placeholder="(00) 00000-0000"
            value={form.phone}
            onChange={(e) => handleInputChange('phone', maskPhone(e.target.value))}
            disabled={isSubmitting}
            data-testid="input-phone"
          />
        </FormGroup>

        {/* Resumo Financeiro */}
        <SummaryBox>
          <div className="summary-row">
            <span>
              {formatBRL(selectedRoom.pricePerNight)} x {nights} {nights === 1 ? 'noite' : 'noites'}
            </span>
            <span data-testid="summary-room-total">{formatBRL(dailyTotal)}</span>
          </div>

          <div className="summary-row">
            <span>Taxa de serviço Hoster</span>
            <span data-testid="summary-service-fee">{formatBRL(serviceFee)}</span>
          </div>

          <div className="summary-row total">
            <span>Total da Reserva</span>
            <span data-testid="summary-grand-total">{formatBRL(grandTotal)}</span>
          </div>
        </SummaryBox>

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
