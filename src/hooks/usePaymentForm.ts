import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidCardNumber } from '../utils/paymentUtils'
import type { PaymentMethod } from '../pages/PaymentPage/types'

export function usePaymentForm() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  // PIX State
  const [copiedPix, setCopiedPix] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  // Card State
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

  return {
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
  }
}
