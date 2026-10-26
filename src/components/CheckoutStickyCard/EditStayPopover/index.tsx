import { Container } from './styles'

interface EditStayPopoverProps {
  tempCheckIn?: string
  tempCheckOut?: string
  tempPeriodo?: string
  tempNights: number
  tempGuests: number
  onChangeDates?: (checkIn: string, checkOut: string) => void
  onChangePeriodo?: (periodo: string) => void
  onChangeNights: (fn: (v: number) => number) => void
  onChangeGuests: (fn: (v: number) => number) => void
  onApply: () => void
}

export function EditStayPopover({
  tempCheckIn,
  tempCheckOut,
  tempPeriodo,
  tempNights,
  tempGuests,
  onChangeDates,
  onChangePeriodo,
  onChangeNights,
  onChangeGuests,
  onApply,
}: EditStayPopoverProps) {
  return (
    <Container data-testid="edit-stay-popover">
      <div className="form-group">
        <label htmlFor="popover-checkin">Check-in:</label>
        <input
          id="popover-checkin"
          type="date"
          value={tempCheckIn || ''}
          onChange={(e) => onChangeDates?.(e.target.value, tempCheckOut || '')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="popover-checkout">Check-out:</label>
        <input
          id="popover-checkout"
          type="date"
          min={tempCheckIn || undefined}
          value={tempCheckOut || ''}
          onChange={(e) => onChangeDates?.(tempCheckIn || '', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="popover-periodo">Período de chegada:</label>
        <select
          id="popover-periodo"
          value={tempPeriodo || 'Manhã'}
          onChange={(e) => onChangePeriodo?.(e.target.value)}
        >
          <option value="Manhã">Manhã</option>
          <option value="Tarde">Tarde</option>
          <option value="Noite">Noite</option>
          <option value="Madrugada">Madrugada</option>
        </select>
      </div>

      <div className="popover-row">
        <label>
          Diárias ({tempNights} {tempNights === 1 ? 'noite' : 'noites'}):
        </label>
        <div className="counter">
          <button type="button" onClick={() => onChangeNights((v) => Math.max(1, v - 1))}>
            -
          </button>
          <strong>{tempNights}</strong>
          <button type="button" onClick={() => onChangeNights((v) => v + 1)}>
            +
          </button>
        </div>
      </div>

      <div className="popover-row">
        <label>Viajantes:</label>
        <div className="counter">
          <button type="button" onClick={() => onChangeGuests((v) => Math.max(1, v - 1))}>
            -
          </button>
          <strong>{tempGuests}</strong>
          <button type="button" onClick={() => onChangeGuests((v) => v + 1)}>
            +
          </button>
        </div>
      </div>

      <button type="button" className="btn-apply-popover" onClick={onApply}>
        Aplicar Alterações
      </button>
    </Container>
  )
}
