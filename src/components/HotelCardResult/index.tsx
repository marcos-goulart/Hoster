import { useSearchParams } from 'react-router-dom'
import { FaShieldAlt, FaStar, FaTags, FaHeart, FaRegHeart } from 'react-icons/fa'
import type { Hotel } from '../../interfaces/Hotel'
import { serviceIcons, serviceLabels } from '../../constants/services'
import { getRatingColor } from './searchUtils'
import { useFavorites } from '../../hooks/useFavorites'
import { ResultCard, ServiceItem } from './styles'

interface HotelCardResultProps {
  hotel: Hotel
  nights: number
}

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'

function resolvePhotoUrl(hotel: Hotel): string {
  const imagesObj = hotel as unknown as { images?: string[] }
  const rawPhoto = hotel.photos?.[0] || imagesObj.images?.[0]

  if (!rawPhoto) return DEFAULT_FALLBACK_IMAGE

  if (rawPhoto.startsWith('http://') || rawPhoto.startsWith('https://')) {
    return rawPhoto
  }

  if (rawPhoto.startsWith('/')) {
    return rawPhoto
  }

  return `/${rawPhoto}`
}

function renderAmenityItem(serviceName: string, hotelId: string) {
  const normalizedKey = serviceName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

  const matchedKey = Object.keys(serviceIcons).find(
    (key) => key.toLowerCase() === normalizedKey || normalizedKey.includes(key.toLowerCase()),
  )

  const icon = matchedKey ? serviceIcons[matchedKey] : serviceIcons['wifi']
  const label = serviceLabels[matchedKey || ''] ?? serviceName

  return (
    <ServiceItem key={`${hotelId}-${serviceName}`}>
      {icon}
      <span>{label}</span>
    </ServiceItem>
  )
}

export function HotelCardResult({ hotel, nights }: HotelCardResultProps) {
  const [searchParams] = useSearchParams()
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.some((fav) => fav.id === hotel.id)

  // Obtém o valor real vindo da API do backend e faz a conversão
  const hotelObj = hotel as unknown as { ratingScore?: number; rating?: number }
  const rawRating = hotel.ratingScore ?? hotelObj.rating ?? 4.9
  const rating10 = rawRating <= 5 ? rawRating * 2 : rawRating

  // Preço base e diárias
  const basePrice = hotel.price ?? 0
  const dailyPrice = hotel.discountPrice ?? basePrice
  const totalPrice = dailyPrice * nights

  const mainPhoto = resolvePhotoUrl(hotel)
  const locationText = hotel.city && hotel.state ? `${hotel.city}/${hotel.state}` : ''

  // Obtém amenities do hotel
  const hotelAmenities = hotel.amenities ?? []

  // Parâmetros de busca da URL
  const entrada = searchParams.get('entrada') ?? ''
  const saida = searchParams.get('saida') ?? ''
  const adultos = Number(searchParams.get('adultos') ?? 0)
  const criancas = Number(searchParams.get('criancas') ?? 0)
  const totalGuests = adultos + criancas > 0 ? adultos + criancas : 2

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    void toggleFavorite(hotel)
  }

  return (
    <ResultCard
      to={`/pre-reserva/${hotel.id}${window.location.search}`}
      state={{
        hotel,
        entrada,
        saida,
        checkIn: entrada,
        checkOut: saida,
        nights,
        diarias: nights,
        adultos,
        criancas,
        hospedes: totalGuests,
        guestsCount: totalGuests,
      }}
      $isPromotion={rating10 >= 8.5}
      $ratingColor={getRatingColor(rating10)}
      aria-label={`Ver disponibilidade de ${hotel.name}`}
    >
      <div className="imageArea">
        <img
          src={mainPhoto}
          alt={hotel.name}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_FALLBACK_IMAGE
          }}
        />

        <button
          type="button"
          className="favorite-btn"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isFavorite ? <FaHeart className="active" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="contentArea">
        <div className="textContent">
          <div className="titleRow">
            <h2>{hotel.name}</h2>
            <div
              className="verified-tooltip"
              aria-label="Hotel verificado com medidas de segurança"
            >
              <FaShieldAlt aria-label="Medidas de segurança" />
            </div>
          </div>
          {locationText ? <p className="location">{locationText}</p> : null}
          <div className="ratingRow" aria-label={`Nota ${rating10.toFixed(1)} de 10`}>
            <div className="stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={`${hotel.id}-result-star-${index}`} aria-hidden="true" />
              ))}
            </div>
            <span className="ratingBadge">{rating10.toFixed(1).replace('.', ',')}</span>
          </div>
          <p className="description">
            {hotel.description ??
              'Com ótimos espaços para quem procura algo confortável para descansar.'}
          </p>
          <div className="priceSummary">
            {hotel.discountPrice !== undefined ? (
              <span className="discountTag">
                <FaTags aria-hidden="true" />
                Desconto disponível
              </span>
            ) : null}
            <div className="priceRow">
              <strong className={hotel.discountPrice !== undefined ? 'discountPrice' : ''}>
                {dailyPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </strong>
              {hotel.discountPrice !== undefined ? (
                <span className="oldDailyPrice">
                  {basePrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              ) : null}
              <small>por diária</small>
            </div>
            <span>
              Total:{' '}
              {totalPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}{' '}
              em {nights} {nights === 1 ? 'diária' : 'diárias'}
            </span>
          </div>
        </div>

        <div className="footerRow">
          <div className="services">
            {(hotelAmenities.length > 0 ? hotelAmenities : ['Restaurante', 'Wi-Fi', 'Piscina'])
              .slice(0, 3)
              .map((amenity) => renderAmenityItem(amenity, hotel.id))}
          </div>
        </div>
      </div>
    </ResultCard>
  )
}
