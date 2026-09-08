import { FaShieldAlt, FaStar, FaTags } from 'react-icons/fa'
import type { Hotel } from '../../interfaces/Hotel'
import { serviceIcons, serviceLabels } from '../../constants/services'
import { getDisplayPrice, getRatingColor } from './searchUtils'
import { ResultCard, ServiceItem } from './styles'

interface HotelCardResultProps {
  hotel: Hotel
  nights: number
}

export function HotelCardResult({ hotel, nights }: HotelCardResultProps) {
  const rating = 10
  const dailyPrice = getDisplayPrice(hotel)
  const totalPrice = dailyPrice * nights

  return (
    <ResultCard
      to={`/pre-reserva/${hotel.id}`}
      state={{ hotel }}
      $isPromotion={hotel.promoted === true}
      $ratingColor={getRatingColor(rating)}
      aria-label={`Ver disponibilidade de ${hotel.name}`}
    >
      <div className="imageArea">
        <img src={hotel.image} alt={hotel.name} />
      </div>
      <div className="contentArea">
        <div className="textContent">
          <div className="titleRow">
            <h2>{hotel.name}</h2>
            {hotel.safetyMeasures ? (
              <div
                className="verified-tooltip"
                aria-label="Hotel verificado com medidas de seguranca"
              >
                <FaShieldAlt aria-label="Medidas de seguranca" />
              </div>
            ) : null}
          </div>
          <p className="location">{hotel.location}</p>
          <div className="ratingRow" aria-label={`Nota ${rating} de 10`}>
            <div className="stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={`${hotel.id}-result-star-${index}`} aria-hidden="true" />
              ))}
            </div>
            <span className="ratingBadge">{rating.toFixed(1).replace('.', ',')}</span>
          </div>
          <p className="description">
            {hotel.description ??
              'Com otimos espacos para quem procura algo confortavel para descansar.'}
          </p>
          <div className="priceSummary">
            {hotel.discountPrice !== undefined ? (
              <span className="discountTag">
                <FaTags aria-hidden="true" />
                Desconto disponivel
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
                  {hotel.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              ) : null}
              <small>por diaria</small>
            </div>
            <span>
              Total:{' '}
              {totalPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}{' '}
              em {nights} {nights === 1 ? 'diaria' : 'diarias'}
            </span>
          </div>
        </div>

        <div className="footerRow">
          <div className="services">
            {(hotel.services ?? []).slice(0, 3).map((service) => (
              <ServiceItem key={`${hotel.id}-${service}`}>
                {serviceIcons[service]}
                {serviceLabels[service] ?? service}
              </ServiceItem>
            ))}
          </div>
        </div>
      </div>
    </ResultCard>
  )
}
