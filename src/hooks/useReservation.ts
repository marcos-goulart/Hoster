import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { getHotelById } from '../services/hotels'
import api from '../services/api'
import type { BookingGuestData, RoomOption } from '../interfaces/Reservation'
import type { Hotel } from '../interfaces/Hotel'
import { formatDateISO, parseDate, formatShortDate } from '../utils/dateUtils'

interface ApiErrorResponse {
  response?: {
    data?: {
      error?: string
    }
  }
}

interface LocationState {
  entrada?: string
  saida?: string
  checkIn?: string
  checkOut?: string
  adultos?: number
  hospedes?: number
  guestsCount?: number
}

export function useReservation() {
  const { hotelId } = useParams<{ hotelId: string }>()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const stateData = (location.state as LocationState) || {}

  const [hotelDetail, setHotelDetail] = useState<Hotel | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null)

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const fetchedIdRef = useRef<string | null>(null)

  // Fallback de Datas Dinâmico (Hoje e +3 diárias)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const threeDaysLater = new Date(today)
  threeDaysLater.setDate(today.getDate() + 3)

  const defaultEntradaISO = formatDateISO(today)
  const defaultSaidaISO = formatDateISO(threeDaysLater)

  // Extrai datas prioritariamente do location.state ou dos searchParams da URL
  let rawEntrada =
    stateData.entrada ||
    stateData.checkIn ||
    searchParams.get('entrada') ||
    searchParams.get('checkIn') ||
    defaultEntradaISO

  let rawSaida =
    stateData.saida ||
    stateData.checkOut ||
    searchParams.get('saida') ||
    searchParams.get('checkOut') ||
    defaultSaidaISO

  // Trata separação se a string de entrada vier no formato "2026-10-20 - 2026-10-28"
  if (rawEntrada.includes(' - ')) {
    const parts = rawEntrada.split(' - ')
    rawEntrada = parts[0]?.trim() || defaultEntradaISO
    rawSaida = parts[1]?.trim() || defaultSaidaISO
  }

  const [checkInISO, setCheckInISO] = useState<string>(rawEntrada)
  const [checkOutISO, setCheckOutISO] = useState<string>(rawSaida)
  const [guestsCount, setGuestsCount] = useState<number>(
    stateData.guestsCount ||
      stateData.hospedes ||
      stateData.adultos ||
      Number(searchParams.get('adultos') || searchParams.get('hospedes') || 2),
  )

  // Sincroniza estado caso os parâmetros de busca ou location alterem
  useEffect(() => {
    let ent =
      stateData.entrada ||
      stateData.checkIn ||
      searchParams.get('entrada') ||
      searchParams.get('checkIn')

    let sai =
      stateData.saida ||
      stateData.checkOut ||
      searchParams.get('saida') ||
      searchParams.get('checkOut')

    if (ent && ent.includes(' - ')) {
      const parts = ent.split(' - ')
      ent = parts[0]?.trim()
      sai = parts[1]?.trim()
    }

    if (ent) setCheckInISO(ent)
    if (sai) setCheckOutISO(sai)
  }, [searchParams, location.state])

  // Cálculo de diárias
  const startDate = parseDate(checkInISO) || today
  const endDate = parseDate(checkOutISO) || threeDaysLater
  const nightsCount = Math.max(
    1,
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
  )

  // Exibição amigável (ex: "20 Out - 28 Out")
  const checkInDisplay = formatShortDate(checkInISO) || checkInISO
  const checkOutDisplay = formatShortDate(checkOutISO) || checkOutISO

  const fetchHotel = useCallback(async () => {
    if (!hotelId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const data = await getHotelById(hotelId)
      setHotelDetail(data)
      if (data && data.rooms && data.rooms.length > 0) {
        setSelectedRoom(data.rooms[0] as RoomOption)
      } else {
        setSelectedRoom(null)
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes do hotel:', error)
      setHotelDetail(null)
    } finally {
      setIsLoading(false)
    }
  }, [hotelId])

  useEffect(() => {
    if (fetchedIdRef.current === hotelId) return
    fetchedIdRef.current = hotelId || null

    void fetchHotel()
  }, [hotelId, fetchHotel])

  const handleOpenLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }, [])

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false)
  }, [])

  const handleSelectRoom = useCallback((room: RoomOption) => {
    setSelectedRoom(room)
  }, [])

  const handleUpdateStayDetails = useCallback(
    (newNights: number, newGuests: number) => {
      setGuestsCount(newGuests)
      const currentStart = parseDate(checkInISO) || new Date()
      const newEnd = new Date(currentStart)
      newEnd.setDate(currentStart.getDate() + newNights)
      setCheckOutISO(formatDateISO(newEnd))
    },
    [checkInISO],
  )

  const handleSubmitBooking = useCallback(
    async (guestData: BookingGuestData) => {
      if (!hotelDetail || !selectedRoom) return

      setIsSubmitting(true)
      try {
        const dailyTotal = selectedRoom.pricePerNight * nightsCount
        const serviceFee = 120
        const totalPrice = dailyTotal + serviceFee

        const payload = {
          hotelId: hotelDetail.id,
          roomId: selectedRoom.id,
          checkIn: checkInISO,
          checkOut: checkOutISO,
          totalPrice,
          guestName: guestData.fullName,
          guestCpf: guestData.document,
          guestPhone: guestData.phone,
          guestsCount,
        }

        const response = await api.post<{ data?: { id: string } }>('/bookings', payload)
        const booking = response.data?.data

        if (booking?.id) {
          setConfirmedBookingId(booking.id)
          navigate(`/pagamento/${booking.id}`, { state: { booking } })
        }
      } catch (error: unknown) {
        console.error('Erro ao criar reserva:', error)
        const err = error as ApiErrorResponse
        alert(err.response?.data?.error || 'Não foi possível processar a reserva. Tente novamente.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [hotelDetail, selectedRoom, nightsCount, checkInISO, checkOutISO, guestsCount, navigate],
  )

  return {
    hotelDetail,
    selectedRoom,
    isLoading,
    isSubmitting,
    confirmedBookingId,
    isLightboxOpen,
    lightboxIndex,
    checkInDisplay,
    checkOutDisplay,
    checkInISO,
    checkOutISO,
    nightsCount,
    guestsCount,
    setLightboxIndex,
    handleOpenLightbox,
    handleCloseLightbox,
    handleSelectRoom,
    handleUpdateStayDetails,
    handleSubmitBooking,
  }
}
