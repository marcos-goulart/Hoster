import { formatBRL } from '../../utils/checkoutUtils'
import { Container } from './styles'

interface CreditCardFormProps {
  cardNumber: string
  cardName: string
  cardExpiry: string
  cardCvc: string
  installments: string
  cardError: string | null
  totalPrice: number
  onCardNumberChange: (val: string) => void
  onCardNameChange: (val: string) => void
  onExpiryChange: (val: string) => void
  onCvcChange: (val: string) => void
  onInstallmentsChange: (val: string) => void
}

export function CreditCardForm({
  cardNumber,
  cardName,
  cardExpiry,
  cardCvc,
  installments,
  cardError,
  totalPrice,
  onCardNumberChange,
  onCardNameChange,
  onExpiryChange,
  onCvcChange,
  onInstallmentsChange,
}: CreditCardFormProps) {
  return (
    <Container>
      {cardError && <div className="card-error-alert">{cardError}</div>}

      <div className="input-group">
        <label htmlFor="cardNumber">Número do Cartão</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={(e) => onCardNumberChange(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="cardName">Nome impresso no cartão</label>
        <input
          id="cardName"
          type="text"
          placeholder="Como no cartão"
          value={cardName}
          onChange={(e) => onCardNameChange(e.target.value)}
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
            onChange={(e) => onExpiryChange(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="cardCvc">CVC</label>
          <input
            id="cardCvc"
            type="text"
            placeholder="123"
            value={cardCvc}
            onChange={(e) => onCvcChange(e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="installments">Parcelamento</label>
        <select
          id="installments"
          value={installments}
          onChange={(e) => onInstallmentsChange(e.target.value)}
        >
          <option value="1">1x de {formatBRL(totalPrice)} sem juros</option>
          <option value="2">2x de {formatBRL(totalPrice / 2)} sem juros</option>
          <option value="3">3x de {formatBRL(totalPrice / 3)} sem juros</option>
          <option value="6">6x de {formatBRL(totalPrice / 6)} sem juros</option>
        </select>
      </div>
    </Container>
  )
}
