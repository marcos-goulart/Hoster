import { formatShortDate } from './dateUtils'

export function sanitizeAndFormatDate(dateStr?: string): string {
  if (!dateStr) return 'A definir'
  const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr
  return formatShortDate(cleanDate) || cleanDate
}

export function isValidCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let shouldDouble = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10)
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

export function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
