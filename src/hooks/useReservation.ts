import { useEffect, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import type { BookingGuestData, HotelDetail, RoomOption } from '../interfaces/Reservation'
import { createBooking, getHotelDetailById } from '../services/reservationMock'
import { formatShortDate, calculateNights } from '../utils/dateUtils'

interface LocationSearchState {
  hotelId?: string
  checkIn?: string
  checkOut?: string
  entrada?: string
  saida?: string
  nights?: number
  diarias?: number
  guestsCount?: number
  hospedes?: number
  adultos?: number
  criancas?: number
}

export function useReservation() {
  const { hotelId = '' } = useParams<{ hotelId: string }>()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // 1. Estados da Aplicação
  const [hotelDetail, setHotelDetail] = useState<HotelDetail | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Submissão
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null)

  // Sobrescrita local do Popover (Ajuste manual do hóspede)
  const [overrideNights, setOverrideNights] = useState<number | null>(null)
  const [overrideGuests, setOverrideGuests] = useState<number | null>(null)

  // 2. Extração e Derivação de Dados da Busca / URL
  const searchState = (location.state as LocationSearchState | null) ?? {}

  const rawEntrada = searchState.checkIn || searchState.entrada || searchParams.get('entrada') || ''
  const rawSaida = searchState.checkOut || searchState.saida || searchParams.get('saida') || ''

  const checkInDisplay = formatShortDate(rawEntrada) || '10 Out'
  const checkOutDisplay = formatShortDate(rawSaida) || '13 Out'

  const computedNights = calculateNights(rawEntrada, rawSaida)
  const baseNights =
    computedNights ||
    searchState.nights ||
    searchState.diarias ||
    Number(searchParams.get('diarias')) ||
    3

  const nightsCount = overrideNights ?? baseNights

  const sumGuests =
    (searchState.adultos || Number(searchParams.get('adultos')) || 0) +
    (searchState.criancas || Number(searchParams.get('criancas')) || 0)

  const baseGuests =
    searchState.guestsCount || searchState.hospedes || (sumGuests > 0 ? sumGuests : 2)

  const guestsCount = overrideGuests ?? baseGuests

  // 3. Efeito de Carregamento de Dados do Hotel
  useEffect(() => {
    let isMounted = true

    async function loadDetails() {
      if (!hotelId) {
        if (isMounted) setIsLoading(false)
        return
      }

      setIsLoading(true)
      const data = await getHotelDetailById(hotelId)

      if (isMounted) {
        setHotelDetail(data)
        if (data?.rooms?.length) {
          setSelectedRoom(data.rooms[0])
        }
        setIsLoading(false)
      }
    }

    void loadDetails()

    return () => {
      isMounted = false
    }
  }, [hotelId])

  // 4. Handlers de Ação
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const handleCloseLightbox = () => setIsLightboxOpen(false)

  const handleSelectRoom = (room: RoomOption) => setSelectedRoom(room)

  const handleUpdateStayDetails = (newNights: number, newGuests: number) => {
    setOverrideNights(newNights)
    setOverrideGuests(newGuests)
  }

  const handleSubmitBooking = async (guestData: BookingGuestData) => {
    if (!hotelDetail || !selectedRoom) return

    setIsSubmitting(true)
    const serviceFee = 120
    const dailyTotal = selectedRoom.pricePerNight * nightsCount
    const grandTotal = dailyTotal + serviceFee

    try {
      const response = await createBooking({
        hotelId: hotelDetail.id,
        roomId: selectedRoom.id,
        checkIn: checkInDisplay,
        checkOut: checkOutDisplay,
        nights: nightsCount,
        guestsCount,
        guestData,
        roomPricePerNight: selectedRoom.pricePerNight,
        serviceFee,
        totalPrice: grandTotal,
      })

      if (response.success) {
        setConfirmedBookingId(response.bookingId)
      }
    } catch {
      // Trata erro
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    hotelDetail,
    selectedRoom,
    isLoading,
    isLightboxOpen,
    lightboxIndex,
    isSubmitting,
    confirmedBookingId,
    checkInDisplay,
    checkOutDisplay,
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
