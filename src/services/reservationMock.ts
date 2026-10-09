import type {
  BookingPayload,
  BookingResponse,
  HotelDetail,
  RoomOption,
  GuestReview,
} from '../interfaces/Reservation'
import api from './api'
import type { AxiosError } from 'axios'

interface ApiRoom {
  id: string
  name: string
  capacity: number
  pricePerNight: number
  isAvailable: boolean
}

interface ApiErrorResponse {
  error?: string
  message?: string
}

// Fotos e Avaliações genéricas de fallback para manter a UI rica
const DEFAULT_PHOTOS = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
]

const DEFAULT_REVIEWS: GuestReview[] = [
  {
    id: 'review-1',
    userName: 'Mariana Gonçalves',
    avatarInitials: 'MG',
    avatarBgColor: '#C07A46',
    stayDate: 'Hospedou-se em Agosto de 2026',
    rating: 5,
    comment:
      'Excelente localização e atendimento impecável. O café da manhã é sensacional e a vista da piscina para o mar vale cada centavo!',
  },
  {
    id: 'review-2',
    userName: 'Carlos Roberto',
    avatarInitials: 'CR',
    avatarBgColor: '#2563EB',
    stayDate: 'Hospedou-se em Julho de 2026',
    rating: 5,
    comment:
      'Quartos limpos, ar-condicionado silencioso e acesso fácil à praia. Recomendo muito a suíte executiva!',
  },
]

export async function getHotelDetailById(hotelId: string): Promise<HotelDetail | null> {
  try {
    const { data } = await api.get(`/hotels/${hotelId}`)
    const apiHotel = data.data

    if (!apiHotel) return null

    const mappedRooms: RoomOption[] = (apiHotel.rooms || []).map((room: ApiRoom) => ({
      id: room.id,
      title: room.name,
      subtitle: `${room.capacity} Hóspedes • Ar-condicionado • Wi-fi`,
      pricePerNight: room.pricePerNight,
      size: '35m²',
      bedType: room.capacity > 2 ? '2 Camas King' : '1 Cama King',
      tags: ['Café incluso', 'Vista Mar'],
      isAvailable: room.isAvailable,
    }))

    // Lê o array de fotos reais 'photos' do Neon
    const rawPhotos =
      apiHotel.photos && apiHotel.photos.length > 0 ? apiHotel.photos : apiHotel.images

    const hotelPhotos =
      rawPhotos && rawPhotos.length > 0
        ? rawPhotos.map((img: string) =>
            img.startsWith('http')
              ? img
              : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
          )
        : DEFAULT_PHOTOS

    return {
      id: apiHotel.id,
      name: apiHotel.name,
      location: `${apiHotel.city}/${apiHotel.state}`,
      description: apiHotel.description,
      price: mappedRooms[0]?.pricePerNight || 300,
      image: hotelPhotos[0],
      photos: hotelPhotos,
      amenitiesList: apiHotel.amenities || [],
      rooms: mappedRooms,
      reviews: DEFAULT_REVIEWS,
      // Puxa o mapEmbedUrl do Neon se existir, senão gera a busca dinâmica no Google Maps
      mapEmbedUrl:
        apiHotel.mapEmbedUrl ||
        'https://maps.google.com/maps?q=' +
          encodeURIComponent(`${apiHotel.city} ${apiHotel.state}`) +
          '&t=&z=13&ie=UTF8&iwloc=&output=embed',
      address: `${apiHotel.address}, ${apiHotel.city} - ${apiHotel.state}`,
      ratingScore: apiHotel.ratingScore ?? 4.7,
      reviewCount: apiHotel.reviewCount ?? 0, // <--- Lê a coluna exata do banco (84, 128...)
    }
  } catch (error: unknown) {
    console.warn('⚠️ Não foi possível carregar os detalhes da API.')
    return null
  }
}

export async function createBooking(payload: BookingPayload): Promise<BookingResponse> {
  try {
    const { data } = await api.post('/bookings', {
      hotelId: payload.hotelId,
      roomId: payload.roomId,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      totalPrice: payload.totalPrice,
      guestName: payload.guestData.fullName,
      guestCpf: payload.guestData.document,
      guestPhone: payload.guestData.phone,
      guestsCount: payload.guestsCount,
    })

    return {
      success: true,
      bookingId: data.data.id,
      message: 'Pré-reserva confirmada com sucesso no PostgreSQL!',
      booking: data.data,
    }
  } catch (error: unknown) {
    const err = error as AxiosError<ApiErrorResponse>
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      'Erro ao processar reserva no servidor.'
    throw new Error(message)
  }
}
