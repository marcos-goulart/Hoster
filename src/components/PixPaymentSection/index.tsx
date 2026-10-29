import { FaClock, FaCopy } from 'react-icons/fa'
import { formatTimer } from '../../utils/paymentUtils'
import { TimerBox, QRCodeBox } from './styles'

interface PixPaymentSectionProps {
  timeLeft: number
  qrCodeUrl: string
  copiedPix: boolean
  onCopyPix: () => void
}

export function PixPaymentSection({
  timeLeft,
  qrCodeUrl,
  copiedPix,
  onCopyPix,
}: PixPaymentSectionProps) {
  return (
    <>
      <TimerBox>
        <FaClock />
        <span>O QR Code expira em: </span>
        <strong>{formatTimer(timeLeft)}</strong>
      </TimerBox>

      <QRCodeBox>
        <img src={qrCodeUrl} alt="QR Code PIX" />
        <p>Aponte a câmera do seu celular no aplicativo do seu banco para pagar.</p>

        <button type="button" className="btn-copy-pix" onClick={onCopyPix}>
          <FaCopy /> {copiedPix ? 'Código PIX Copiado!' : 'Copiar Código PIX (Copia e Cola)'}
        </button>
      </QRCodeBox>
    </>
  )
}
