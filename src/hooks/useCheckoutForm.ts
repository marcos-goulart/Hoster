import { useState, type FormEvent } from 'react'
import type { BookingGuestData } from '../interfaces/Reservation'

interface UseCheckoutFormOptions {
  nights: number
  guestsCount: number
  onUpdateStayDetails?: (nights: number, guests: number) => void
  onSubmitBooking: (guestData: BookingGuestData) => void
}

export function useCheckoutForm({
  nights,
  guestsCount,
  onUpdateStayDetails,
  onSubmitBooking,
}: UseCheckoutFormOptions) {
  const [form, setForm] = useState<BookingGuestData>({
    fullName: 'Marcos Goulart',
    email: 'marcos@email.com',
    document: '',
    phone: '',
  })

  const [showEditStay, setShowEditStay] = useState(false)
  const [tempNights, setTempNights] = useState(nights)
  const [tempGuests, setTempGuests] = useState(guestsCount)

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

  const handleInputChange = (field: keyof BookingGuestData, value: string) => {
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

  return {
    form,
    showEditStay,
    tempNights,
    tempGuests,
    setTempNights,
    setTempGuests,
    handleToggleEditStay,
    handleApplyStayUpdate,
    handleInputChange,
    handleSubmit,
  }
}
