import type { Hotel, HotelRecord } from '../interfaces/Hotel'
import { hotelImageMap } from '../utils/hotelImageMap'

const fallbackImage = hotelImageMap['hotel-1']

export const hotelRecords: HotelRecord[] = [
  {
    id: '123214afdga1',
    imageKey: 'hotel-1',
    name: 'Hotel California',
    location: 'Porto Seguro/BA',
    city: 'Porto Seguro',
    state: 'BA',
    address: 'Av. Beira Mar, 1200 - Praia de Taperapuã',
    description:
      'Hotel próximo de lindas praias, com várias atrações turísticas e comida típica da região da Bahia.',
    about:
      'O Hotel California oferece uma experiência inesquecível no litoral baiano, combinando hospitalidade acolhedora com infraestrutura completa de lazer, piscinas ao ar livre e gastronomia regional de primeira qualidade.',
    price: 669.9,
    ratingScore: 9.2,
    reviewCount: 148,
    availability: false,
    featured: true,
    accommodationType: 'hotel',
    availablePeriods: ['manha', 'tarde', 'noite'],
    services: ['restaurante', 'piscina', 'wifi', 'estacionamento'],
    amenities: ['Piscina', 'Wi-Fi gratuito', 'Restaurante', 'Estacionamento privativo'],
    searchTags: ['praias', 'bahia', 'porto seguro', 'familia'],
    safetyMeasures: true,
    freeCancellation: false,
    immediateBooking: false,
  },
  {
    id: 'fdasfasfdasv1',
    imageKey: 'hotel-2',
    name: 'Hotel Paris Germany',
    location: 'Ilheus/BA',
    city: 'Ilhéus',
    state: 'BA',
    address: 'Av. Soares Lopes, 450 - Centro',
    description:
      'Se você procura um hotel totalmente luxuoso e tecnológico, esse daqui é o ideal para você e sua família.',
    about:
      'Ambientes modernos, automação de ponta nos quartos e uma deslumbrante vista panorâmica para o mar. Aproveite nossos serviços de spa, restaurante internacional e conectividade ultra-rápida.',
    price: 800.0,
    ratingScore: 9.5,
    reviewCount: 210,
    availability: true,
    featured: true,
    accommodationType: 'hotel',
    availablePeriods: ['manha', 'tarde', 'noite'],
    services: ['restaurante', 'piscina', 'wifi', 'cafe-manha'],
    amenities: [
      'Restaurante Internacional',
      'Piscina aquecida',
      'Wi-Fi de alta velocidade',
      'Café da manhã buffet',
    ],
    searchTags: ['luxo', 'tecnologia', 'bahia', 'ilheus', 'familia'],
    safetyMeasures: true,
    freeCancellation: true,
    immediateBooking: true,
  },
  {
    id: '121321efasdfdga1',
    imageKey: 'hotel-3',
    name: 'Pousada Atlântica',
    location: 'Rio de Janeiro/RJ',
    city: 'Rio de Janeiro',
    state: 'RJ',
    address: 'Rua Barata Ribeiro, 300 - Copacabana',
    description:
      'Charme, tranquilidade e o melhor do estilo carioca a poucos passos da praia mais famosa do mundo.',
    about:
      'Situada no coração de Copacabana, a Pousada Atlântica oferece conforto intimista, café da manhã tropical completo e fácil acesso aos principais pontos turísticos e praias do Rio de Janeiro.',
    price: 789.9,
    ratingScore: 8.9,
    reviewCount: 95,
    availability: true,
    featured: true,
    accommodationType: 'pousada',
    availablePeriods: ['madrugada', 'manha', 'tarde'],
    services: ['cafe-manha', 'praias', 'campo-futebol', 'wifi'],
    amenities: ['Café da manhã incluso', 'Acesso à praia', 'Campo recreativo', 'Wi-Fi gratuito'],
    searchTags: ['rio de janeiro', 'praias', 'familia', 'lazer'],
    safetyMeasures: true,
    freeCancellation: true,
    immediateBooking: true,
  },
  {
    id: 'hotel-serra-verde',
    imageKey: 'hotel-4',
    name: 'Hotel Serra Verde',
    location: 'Campos do Jordao/SP',
    city: 'Campos do Jordão',
    state: 'SP',
    address: 'Av. Macedo Soares, 800 - Capivari',
    description:
      'Hospedagem aconchegante em clima de montanha, perfeita para viagens tranquilas em casal ou família.',
    about:
      'Refúgio na serra com lareira, arquitetura alpina e localização privilegiada no centro turístico de Campos do Jordão, cercado por jardins e natureza exuberante.',
    price: 529.9,
    ratingScore: 9.0,
    reviewCount: 82,
    featured: true,
    accommodationType: 'hotel',
    availablePeriods: ['manha', 'tarde', 'noite'],
    services: ['cafe-manha', 'wifi', 'estacionamento'],
    amenities: ['Café da manhã colonial', 'Wi-Fi gratuito', 'Estacionamento coberto', 'Lareira'],
    searchTags: ['campos do jordao', 'montanha', 'casal', 'familia'],
    safetyMeasures: true,
    freeCancellation: true,
    immediateBooking: false,
  },
  {
    id: 'promo-hotel-4',
    imageKey: 'hotel-4',
    name: 'Hotel Jardim Colorado',
    location: 'Copacabana/RJ',
    city: 'Rio de Janeiro',
    state: 'RJ',
    address: 'Av. Atlântica, 1800 - Copacabana',
    description: 'Hotel próximo da praia com café da manhã e área de lazer completa.',
    about:
      'Localizado à beira-mar de Copacabana, conta com piscina na cobertura, restaurante de culinária brasileira e atendimento atencioso 24 horas por dia.',
    price: 350.0,
    discountPrice: 299.0,
    ratingScore: 8.7,
    reviewCount: 164,
    availability: true,
    promoted: true,
    accommodationType: 'hotel',
    availablePeriods: ['manha', 'tarde', 'noite'],
    services: ['cafe-manha', 'piscina', 'wifi', 'praias'],
    amenities: [
      'Café da manhã incluso',
      'Piscina na cobertura',
      'Wi-Fi gratuito',
      'Frente para o mar',
    ],
    searchTags: ['copacabana', 'rio de janeiro', 'praia', 'promocao'],
    safetyMeasures: true,
    freeCancellation: true,
    immediateBooking: true,
    specialOffer: true,
  },
  {
    id: 'promo-hotel-5',
    imageKey: 'hotel-5',
    name: 'Hotel Resplendor',
    location: 'Vitoria/ES',
    city: 'Vitória',
    state: 'ES',
    address: 'Av. Dante Michelini, 500 - Jardim da Penha',
    description: 'Hospedagem confortável com ótima localização e atendimento 24h.',
    about:
      'Excelente opção para quem viaja a lazer ou negócios na capital capixaba. Quartos climatizados, estrutura executiva e proximidade com a orla da praia de Camburi.',
    price: 270.0,
    discountPrice: 219.0,
    ratingScore: 8.6,
    reviewCount: 77,
    availability: true,
    promoted: true,
    accommodationType: 'hotel',
    availablePeriods: ['manha', 'tarde', 'noite'],
    services: ['cafe-manha', 'wifi', 'estacionamento'],
    amenities: [
      'Café da manhã cortesia',
      'Wi-Fi gratuito',
      'Estacionamento privativo',
      'Recepção 24h',
    ],
    searchTags: ['vitoria', 'espirito santo', 'promocao', 'localizacao'],
    safetyMeasures: true,
    freeCancellation: true,
    immediateBooking: true,
    specialOffer: true,
  },
  {
    id: 'promo-hotel-6',
    imageKey: 'hotel-6',
    name: 'Pousada Morada',
    location: 'Aracruz/ES',
    city: 'Aracruz',
    state: 'ES',
    address: 'Rodovia ES-010, km 42 - Praia dos Padres',
    description: 'Ambiente tranquilo, ideal para descanso com quartos amplos.',
    about:
      'Em sintonia com a natureza costeira do Espírito Santo, a Pousada Morada proporciona momentos de relaxamento profundo, piscinas, campos gramados e gastronomia caseira.',
    price: 789.9,
    discountPrice: 699.9,
    ratingScore: 8.5,
    reviewCount: 53,
    availability: false,
    promoted: true,
    accommodationType: 'pousada',
    availablePeriods: ['madrugada', 'manha', 'tarde'],
    services: ['cafe-manha', 'piscina', 'campo-futebol', 'estacionamento'],
    amenities: [
      'Café da manhã artesanal',
      'Piscina externa',
      'Campo de futebol',
      'Estacionamento amplo',
    ],
    searchTags: ['aracruz', 'espirito santo', 'descanso', 'promocao'],
    safetyMeasures: true,
    freeCancellation: false,
    immediateBooking: false,
    specialOffer: true,
  },
]

export function resolveHotelRecord(record: HotelRecord): Hotel {
  const [cityPart, statePart] = (record.location || '').split('/')
  const resolvedImage =
    hotelImageMap[record.imageKey as keyof typeof hotelImageMap] ?? fallbackImage
  const photos = record.photos && record.photos.length > 0 ? record.photos : [resolvedImage]

  const city = record.city || cityPart?.trim() || 'Brasil'
  const state = record.state || statePart?.trim() || 'BR'
  const address = record.address || `Av. Beira Mar, 100 - ${city}`
  const ratingScore = record.ratingScore ?? record.rating ?? 8.8
  const reviewCount = record.reviewCount ?? record.reviewsCount ?? 42
  const amenities = record.amenities || record.services || []
  const services = record.services || record.amenities || []

  return {
    ...record,
    city,
    state,
    address,
    ratingScore,
    reviewCount,
    photos,
    image: resolvedImage,
    images: photos,
    amenities,
    services,
    location: record.location || `${city}/${state}`,
  }
}

export const fallbackHotels = hotelRecords.map(resolveHotelRecord)
