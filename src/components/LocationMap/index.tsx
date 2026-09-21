import { MapContainer, SectionTitle } from './styles'

export interface LocationMapProps {
  address: string
  mapEmbedUrl: string
}

export function LocationMap({ address, mapEmbedUrl }: LocationMapProps) {
  return (
    <section aria-labelledby="location-title">
      <SectionTitle id="location-title">Localização</SectionTitle>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>📍 {address}</p>
      <MapContainer>
        <iframe
          title={`Mapa de localização para ${address}`}
          src={mapEmbedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </MapContainer>
    </section>
  )
}
