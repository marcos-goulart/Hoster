import type { Hotel } from '../../interfaces/Hotel'
import { CardLink, Div } from './styles'

interface HotelCardProps {
  hotel: Hotel
  hasDiscount?: boolean
  className?: string
}

export function HotelCard({ hotel, hasDiscount, className }: HotelCardProps) {
  const isPromotion = typeof hasDiscount === 'boolean' ? hasDiscount : hotel.discountPrice !== undefined
  const hasPriceDiscount =
    hotel.discountPrice !== undefined && Number.isFinite(hotel.discountPrice) && hotel.discountPrice < hotel.price
  const displayPrice = hotel.discountPrice ?? hotel.price

  return (
    <Div $isPromotion={isPromotion} className={className}>
      <CardLink className='card' to={`/pre-reserva/${hotel.id}`} state={{ hotel }}>
        <div className='imgDiv'>
          <img src={hotel.image} alt={hotel.name} className='card-img-top parallax-img' />

          <span className='priceBadge'>
            {hasPriceDiscount ? (
              <>
                <span className='priceOld'>
                  {hotel.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <span className='priceNew'>
                  {displayPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </>
            ) : (
              <span className='priceNew'>
                {displayPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            )}
          </span>
        </div>

        <div className='cardBody'>
          <h5 className='text-reveal'>{hotel.name}</h5>
          <p className='location text-reveal'>{hotel.location}</p>
          {hotel.description ? <p className='description text-reveal'>{hotel.description}</p> : null}
        </div>
      </CardLink>
    </Div>
  )
}
