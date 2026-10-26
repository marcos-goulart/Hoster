import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'
import { getHotelById } from '../services/hotels'
import type { BookingGuestData, RoomOption, HotelDetail } from '../interfaces/Reservation'
import { formatDateISO, parseDate, formatShortDate } from '../utils/dateUtils'

interface LocationState {
  entrada?: string
  saida?: string
  checkIn?: string
  checkOut?: string
  periodo?: string
  period?: string
  adultos?: number
  hospedes?: number
  guestsCount?: number
}

export function useReservation() {
  const { hotelId } = useParams<{ hotelId: string }>()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  // Extração direta de primitivos estáveis para evitar recriação de objetos no render
  const locationState = (location.state as LocationState | null) ?? null
  const stateEntrada = locationState?.entrada || locationState?.checkIn || ''
  const stateSaida = locationState?.saida || locationState?.checkOut || ''
  const statePeriodo = locationState?.periodo || locationState?.period || ''
  const stateGuests =
    locationState?.guestsCount || locationState?.hospedes || locationState?.adultos || 0

  const paramEntrada = searchParams.get('entrada') || searchParams.get('checkIn') || ''
  const paramSaida = searchParams.get('saida') || searchParams.get('checkOut') || ''
  const paramPeriodo = searchParams.get('periodo') || ''
  const paramGuests = Number(searchParams.get('adultos') || searchParams.get('hospedes') || 0)

  const [hotelDetail, setHotelDetail] = useState<HotelDetail | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const fetchedIdRef = useRef<string | null>(null)

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const threeDaysLater = useMemo(() => {
    const d = new Date(today)
    d.setDate(today.getDate() + 3)
    return d
  }, [today])

  // Inicialização estável das datas
  const initialCheckIn = useMemo(() => {
    let raw = stateEntrada || paramEntrada || formatDateISO(today)
    if (raw.includes(' - ')) {
      raw = raw.split(' - ')[0]?.trim() || formatDateISO(today)
    }
    return raw
  }, [stateEntrada, paramEntrada, today])

  const initialCheckOut = useMemo(() => {
    let raw = stateSaida || paramSaida || formatDateISO(threeDaysLater)
    const rawEnt = stateEntrada || paramEntrada || ''
    if (rawEnt.includes(' - ')) {
      raw = rawEnt.split(' - ')[1]?.trim() || formatDateISO(threeDaysLater)
    }
    return raw
  }, [stateSaida, paramSaida, stateEntrada, paramEntrada, threeDaysLater])

  const [checkInISO, setCheckInISO] = useState<string>(initialCheckIn)
  const [checkOutISO, setCheckOutISO] = useState<string>(initialCheckOut)
  const [periodo, setPeriodo] = useState<string>(statePeriodo || paramPeriodo || 'Manhã')
  const [guestsCount, setGuestsCount] = useState<number>(stateGuests || paramGuests || 2)

  // Sincronização protegida de datas e parâmetros caso a URL/State mude externamente
  useEffect(() => {
    let ent = stateEntrada || paramEntrada
    let sai = stateSaida || paramSaida
    const p = statePeriodo || paramPeriodo

    if (ent && ent.includes(' - ')) {
      const parts = ent.split(' - ')
      ent = parts[0]?.trim() || ''
      sai = parts[1]?.trim() || ''
    }

    if (ent) {
      setCheckInISO((prev) => (prev !== ent ? ent : prev))
    }
    if (sai) {
      setCheckOutISO((prev) => (prev !== sai ? sai : prev))
    }
    if (p) {
      setPeriodo((prev) => (prev !== p ? p : prev))
    }
    const g = stateGuests || paramGuests
    if (g > 0) {
      setGuestsCount((prev) => (prev !== g ? g : prev))
    }
  }, [
    stateEntrada,
    stateSaida,
    statePeriodo,
    stateGuests,
    paramEntrada,
    paramSaida,
    paramPeriodo,
    paramGuests,
  ])

  const startDate = parseDate(checkInISO) || today
  const endDate = parseDate(checkOutISO) || threeDaysLater
  const nightsCount = Math.max(
    1,
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
  )

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
      if (data) {
        const detail: HotelDetail = {
          ...data,
          photos: data.photos && data.photos.length > 0 ? data.photos : data.images || [],
          address: data.address || `${data.city || ''} - ${data.state || ''}`,
          ratingScore: data.ratingScore ?? data.rating ?? 4.5,
          reviewCount: data.reviewCount ?? data.reviewsCount ?? 0,
          rooms: (data.rooms || []).map((r) => ({
            id: r.id,
            title: r.title,
            subtitle: r.subtitle,
            pricePerNight: r.pricePerNight,
            capacity: r.capacity,
            isAvailable: r.isAvailable,
            tags: r.tags || [],
          })),
          reviews: (data.reviews || []).map((rev) => ({
            id: rev.id,
            hotelId: rev.hotelId,
            userName: rev.userName,
            avatarUrl:
              (rev as { userAvatar?: string | null }).userAvatar ||
              (rev as { avatarUrl?: string | null }).avatarUrl ||
              null,
            stayDate: rev.stayDate,
            rating: rev.rating,
            comment: rev.comment,
          })),
          questions: data.questions || [],
        }
        setHotelDetail(detail)
        if (detail.rooms && detail.rooms.length > 0) {
          setSelectedRoom(detail.rooms[0] as RoomOption)
        } else {
          setSelectedRoom(null)
        }
      } else {
        setHotelDetail(null)
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
    (
      newNights: number,
      newGuests: number,
      details?: { checkIn?: string; checkOut?: string; period?: string },
    ) => {
      setGuestsCount(newGuests)
      if (details?.checkIn && details?.checkOut) {
        setCheckInISO(details.checkIn)
        setCheckOutISO(details.checkOut)
      } else {
        const currentStart = parseDate(checkInISO) || new Date()
        const newEnd = new Date(currentStart)
        newEnd.setDate(currentStart.getDate() + newNights)
        setCheckOutISO(formatDateISO(newEnd))
      }
      if (details?.period) {
        setPeriodo(details.period)
      }
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
          period: periodo,
          totalPrice,
          guestName: guestData.fullName,
          guestCpf: guestData.document,
          guestPhone: guestData.phone,
          guestsCount,
        }

        const response = await api.post<{ data?: { id: string } }>('/bookings', payload)
        const booking = response.data?.data

        if (booking?.id) {
          navigate(`/pagamento/${booking.id}`, {
            state: {
              booking: {
                id: booking.id,
                guestFullName: guestData.fullName,
                checkIn: checkInISO,
                checkOut: checkOutISO,
                nights: nightsCount,
                periodo,
                period: periodo,
                totalPrice,
                room: {
                  ...selectedRoom,
                  hotel: hotelDetail,
                },
              },
            },
          })
        }
      } catch (error: unknown) {
        console.error('Erro ao criar reserva:', error)
        const err = error as {
          response?: { data?: { error?: string; message?: string } }
          message?: string
        }
        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          'Não foi possível processar a reserva. Tente novamente.'
        alert(message)
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      hotelDetail,
      selectedRoom,
      nightsCount,
      checkInISO,
      checkOutISO,
      periodo,
      guestsCount,
      navigate,
    ],
  )

  return {
    hotelDetail,
    selectedRoom,
    isLoading,
    isSubmitting,
    isLightboxOpen,
    lightboxIndex,
    checkInDisplay,
    checkOutDisplay,
    checkInISO,
    checkOutISO,
    periodo,
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
