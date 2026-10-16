import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getHotelDetailById, createBooking } from '../services/reservationMock'
import type { HotelDetail, RoomOption, BookingGuestData } from '../interfaces/Reservation'

export function useReservation() {
  const { hotelId } = useParams<{ hotelId: string }>()

  const [hotelDetail, setHotelDetail] = useState<HotelDetail | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null)

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const fetchedIdRef = useRef<string | null>(null)

  const fetchHotel = useCallback(async () => {
    if (!hotelId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const data = await getHotelDetailById(hotelId)
      setHotelDetail(data)
      if (data && data.rooms && data.rooms.length > 0) {
        setSelectedRoom(data.rooms[0])
      } else {
        setSelectedRoom(null)
      }
    } catch (error) {
      console.error(error)
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

  const handleUpdateStayDetails = useCallback(() => {}, [])

  // Tipagem forte aplicada ao guestData para resolver o aviso do ESLint
  const handleSubmitBooking = useCallback(
    async (guestData: BookingGuestData) => {
      if (!hotelDetail || !selectedRoom) return

      setIsSubmitting(true)
      try {
        const response = await createBooking({
          hotelId: hotelDetail.id,
          roomId: selectedRoom.id,
          checkIn: '10 Out',
          checkOut: '13 Out',
          nights: 3,
          guestsCount: 2,
          guestData,
          roomPricePerNight: selectedRoom.pricePerNight,
          serviceFee: 120,
          totalPrice: selectedRoom.pricePerNight * 3 + 120,
        })

        if (response.success) {
          setConfirmedBookingId(response.bookingId)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [hotelDetail, selectedRoom],
  )

  return {
    hotelDetail,
    selectedRoom,
    isLoading,
    isSubmitting,
    confirmedBookingId,
    isLightboxOpen,
    lightboxIndex,
    checkInDisplay: '10 Out',
    checkOutDisplay: '13 Out',
    nightsCount: 3,
    guestsCount: 2,
    setLightboxIndex,
    handleOpenLightbox,
    handleCloseLightbox,
    handleSelectRoom,
    handleUpdateStayDetails,
    handleSubmitBooking,
  }
}
