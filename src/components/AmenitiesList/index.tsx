import {
  FaWifi,
  FaCoffee,
  FaSwimmingPool,
  FaParking,
  FaSnowflake,
  FaUtensils,
  FaCheckCircle,
} from 'react-icons/fa'
import { AmenitiesFlex, SectionTitle } from './styles'

export interface AmenitiesListProps {
  amenities: string[]
}

function getAmenityIcon(name: string) {
  const normalized = name.toLowerCase()
  if (normalized.includes('wi-fi') || normalized.includes('wifi')) {
    return <FaWifi aria-hidden="true" />
  }
  if (normalized.includes('café') || normalized.includes('cafe')) {
    return <FaCoffee aria-hidden="true" />
  }
  if (normalized.includes('piscina')) {
    return <FaSwimmingPool aria-hidden="true" />
  }
  if (normalized.includes('estacionamento')) {
    return <FaParking aria-hidden="true" />
  }
  if (normalized.includes('ar-condicionado') || normalized.includes('ar condicionado')) {
    return <FaSnowflake aria-hidden="true" />
  }
  if (normalized.includes('restaurante') || normalized.includes('alimentação')) {
    return <FaUtensils aria-hidden="true" />
  }
  return <FaCheckCircle aria-hidden="true" />
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) return null

  return (
    <section aria-labelledby="amenities-title">
      <SectionTitle id="amenities-title">Comodidades do Estabelecimento</SectionTitle>
      <AmenitiesFlex>
        {amenities.map((item, index) => (
          <div key={`amenity-item-${index}`} className="amenity-card">
            {getAmenityIcon(item)}
            <span>{item}</span>
          </div>
        ))}
      </AmenitiesFlex>
    </section>
  )
}
