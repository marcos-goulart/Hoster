import { FaHeart, FaRegHeart } from 'react-icons/fa'
import type { Hotel } from '../../interfaces/Hotel'
import { useFavorites } from '../../hooks/useFavorites'
import { CardLink, Div } from './styles'

interface HotelCardProps {
  hotel: Hotel
  hasDiscount?: boolean
  className?: string
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

export function HotelCard({ hotel, hasDiscount, className }: HotelCardProps) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.some((fav) => fav.id === hotel.id)

  const price = hotel.price ?? 0
  const isPromotion =
    typeof hasDiscount === 'boolean' ? hasDiscount : hotel.discountPrice !== undefined
  const hasPriceDiscount =
    hotel.discountPrice !== undefined &&
    Number.isFinite(hotel.discountPrice) &&
    hotel.discountPrice < price
  const displayPrice = hotel.discountPrice ?? price

  const mainPhoto = resolvePhotoUrl(hotel)
  const locationText = hotel.city && hotel.state ? `${hotel.city}/${hotel.state}` : ''

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    void toggleFavorite(hotel)
  }

  return (
    <Div $isPromotion={isPromotion} className={className}>
      <CardLink className="card" to={`/pre-reserva/${hotel.id}`} state={{ hotel }}>
        <div className="imgDiv">
          <img
            src={mainPhoto}
            alt={hotel.name}
            className="card-img-top parallax-img"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_FALLBACK_IMAGE
            }}
          />

          {/* Botão de Favorito Flutuante */}
          <button
            type="button"
            className="favorite-btn"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? <FaHeart className="active" /> : <FaRegHeart />}
          </button>

          <span className="priceBadge">
            {hasPriceDiscount ? (
              <>
                <span className="priceOld">
                  {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <span className="priceNew">
                  {displayPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </>
            ) : (
              <span className="priceNew">
                {displayPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            )}
          </span>
        </div>

        <div className="cardBody">
          <h5 className="text-reveal">{hotel.name}</h5>
          {locationText ? <p className="location text-reveal">{locationText}</p> : null}
          {hotel.description ? (
            <p className="description text-reveal">{hotel.description}</p>
          ) : null}
        </div>
      </CardLink>
    </Div>
  )
}
