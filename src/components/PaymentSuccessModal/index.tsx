import { SuccessOverlay } from './styles'

export function PaymentSuccessModal() {
  return (
    <SuccessOverlay>
      <div className="modal-content">
        <div className="check-icon">✓</div>
        <h2>Pagamento Confirmado!</h2>
        <p>Sua reserva foi concluída com sucesso e os detalhes enviados para o seu e-mail.</p>
        <span>Redirecionando para Minhas Viagens...</span>
      </div>
    </SuccessOverlay>
  )
}
