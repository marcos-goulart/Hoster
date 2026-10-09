import { formatBRL } from '../../../utils/checkoutUtils'
import { Container } from './styles'

interface PriceSummaryBoxProps {
  pricePerNight: number
  nights: number
  dailyTotal: number
  serviceFee: number
  grandTotal: number
}

export function PriceSummaryBox({
  pricePerNight,
  nights,
  dailyTotal,
  serviceFee,
  grandTotal,
}: PriceSummaryBoxProps) {
  return (
    <Container>
      <div className="summary-row">
        <span>
          {formatBRL(pricePerNight)} x {nights} {nights === 1 ? 'noite' : 'noites'}
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
    </Container>
  )
}
