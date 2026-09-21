import type {
  BookingPayload,
  BookingResponse,
  HotelDetail,
  RoomOption,
  GuestReview,
} from '../interfaces/Reservation'
import { getHotelById } from './hotels'

const DEFAULT_PHOTOS = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
]

const DEFAULT_AMENITIES = [
  'Wi-Fi de alta velocidade',
  'Café da manhã incluso',
  'Piscina externa',
  'Estacionamento gratuito',
  'Ar-condicionado silencioso',
  'Restaurante internacional',
]

const DEFAULT_ROOMS: RoomOption[] = [
  {
    id: 'suite-standard-king',
    title: 'Suíte Standard King',
    subtitle: '32m² • Vista para o jardim • Ar-condicionado',
    pricePerNight: 800,
    size: '32m²',
    bedType: '1 Cama King',
    tags: ['1 Cama King', 'Café incluso'],
    isAvailable: true,
  },
  {
    id: 'suite-executiva-mar',
    title: 'Suíte Executiva Vista Mar',
    subtitle: '48m² • Varanda privativa • Hidromassagem',
    pricePerNight: 1050,
    size: '48m²',
    bedType: '1 Cama King',
    tags: ['1 Cama King', 'Frente para o Mar'],
    isAvailable: true,
  },
  {
    id: 'suite-presidencial-luxo',
    title: 'Suíte Presidencial Luxo',
    subtitle: '70m² • Vista panorâmica 360° • Piscina privativa',
    pricePerNight: 1600,
    size: '70m²',
    bedType: '2 Camas King',
    tags: ['2 Camas King', 'Piscina Privativa', 'Serviço de Quarto VIP'],
    isAvailable: true,
  },
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
  {
    id: 'review-3',
    userName: 'Fernanda Lima',
    avatarInitials: 'FL',
    avatarBgColor: '#059669',
    stayDate: 'Hospedou-se em Junho de 2026',
    rating: 5,
    comment:
      'Tudo perfeito. Equipe muito acolhedora, ótima infraestrutura para descanso e lazer em família.',
  },
]

export async function getHotelDetailById(hotelId: string): Promise<HotelDetail | null> {
  const baseHotel = await getHotelById(hotelId)

  // Simula latência assíncrona de rede
  await new Promise((resolve) => setTimeout(resolve, 80))

  if (!baseHotel) {
    return null
  }

  const basePrice = baseHotel.discountPrice ?? baseHotel.price
  const roomsWithAdjustedPrices: RoomOption[] = DEFAULT_ROOMS.map((room, index) => {
    if (index === 0) {
      return { ...room, pricePerNight: basePrice }
    }
    return { ...room, pricePerNight: Math.round(basePrice * (1 + index * 0.3)) }
  })

  return {
    ...baseHotel,
    photos: [baseHotel.image, ...DEFAULT_PHOTOS.slice(1)],
    amenitiesList:
      baseHotel.services && baseHotel.services.length > 0
        ? Array.from(new Set([...baseHotel.services, ...DEFAULT_AMENITIES]))
        : DEFAULT_AMENITIES,
    rooms: roomsWithAdjustedPrices,
    reviews: DEFAULT_REVIEWS,
    mapEmbedUrl:
      'https://maps.google.com/maps?q=' +
      encodeURIComponent(baseHotel.location || 'Ilheus Bahia') +
      '&t=&z=13&ie=UTF8&iwloc=&output=embed',
    address: baseHotel.location.includes('-')
      ? baseHotel.location
      : `Av. Beira Mar, 450 - ${baseHotel.location}`,
    ratingScore: 4.9,
    reviewCount: 128,
  }
}

export async function createBooking(payload: BookingPayload): Promise<BookingResponse> {
  // Simula latência de rede no envio da reserva
  await new Promise((resolve) => setTimeout(resolve, 150))

  const bookingId = `HTR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

  return {
    success: true,
    bookingId,
    message: 'Pré-reserva confirmada com sucesso! Prossiga com o pagamento.',
    booking: {
      ...payload,
      createdAt: new Date().toISOString(),
    },
  }
}
