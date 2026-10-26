import { useState, type FormEvent } from 'react'
import type { BookingGuestData } from '../interfaces/Reservation'

interface UseCheckoutFormOptions {
  nights: number
  guestsCount: number
  checkInISO?: string
  checkOutISO?: string
  periodo?: string
  onUpdateStayDetails?: (
    nights: number,
    guests: number,
    details?: { checkIn?: string; checkOut?: string; period?: string },
  ) => void
  onSubmitBooking: (guestData: BookingGuestData) => void
}

export function useCheckoutForm({
  nights,
  guestsCount,
  checkInISO,
  checkOutISO,
  periodo,
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
  const [tempCheckIn, setTempCheckIn] = useState(checkInISO || '')
  const [tempCheckOut, setTempCheckOut] = useState(checkOutISO || '')
  const [tempPeriodo, setTempPeriodo] = useState(periodo || 'Manhã')

  const handleToggleEditStay = () => {
    if (!showEditStay) {
      setTempNights(nights)
      setTempGuests(guestsCount)
      setTempCheckIn(checkInISO || '')
      setTempCheckOut(checkOutISO || '')
      setTempPeriodo(periodo || 'Manhã')
    }
    setShowEditStay((prev) => !prev)
  }

  const handleDatesChange = (newCheckIn: string, newCheckOut: string) => {
    setTempCheckIn(newCheckIn)
    setTempCheckOut(newCheckOut)

    if (newCheckIn && newCheckOut) {
      const d1 = new Date(`${newCheckIn}T00:00:00`)
      const d2 = new Date(`${newCheckOut}T00:00:00`)
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
      if (diff > 0) {
        setTempNights(diff)
      }
    }
  }

  const handleApplyStayUpdate = () => {
    onUpdateStayDetails?.(tempNights, tempGuests, {
      checkIn: tempCheckIn,
      checkOut: tempCheckOut,
      period: tempPeriodo,
    })
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
    tempCheckIn,
    tempCheckOut,
    tempPeriodo,
    setTempNights,
    setTempGuests,
    setTempPeriodo,
    handleDatesChange,
    handleToggleEditStay,
    handleApplyStayUpdate,
    handleInputChange,
    handleSubmit,
  }
}
