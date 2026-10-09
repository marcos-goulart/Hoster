import { Container } from './styles'

interface EditStayPopoverProps {
  tempNights: number
  tempGuests: number
  onChangeNights: (fn: (v: number) => number) => void
  onChangeGuests: (fn: (v: number) => number) => void
  onApply: () => void
}

export function EditStayPopover({
  tempNights,
  tempGuests,
  onChangeNights,
  onChangeGuests,
  onApply,
}: EditStayPopoverProps) {
  return (
    <Container>
      <div className="popover-row">
        <label>Diárias:</label>
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
