import { MapContainer, SectionTitle } from './styles'

export interface LocationMapProps {
  address: string
  mapEmbedUrl?: string | null
}

export function LocationMap({ address, mapEmbedUrl }: LocationMapProps) {
  // Se não houver mapa cadastrado no banco, gera a URL de busca dinâmica baseada no endereço
  const embedUrl =
    mapEmbedUrl && mapEmbedUrl.trim() !== ''
      ? mapEmbedUrl
      : `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`

  return (
    <section aria-labelledby="location-title">
      <SectionTitle id="location-title">Localização</SectionTitle>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>📍 {address}</p>

      <MapContainer>
        <iframe
          title={`Mapa de localização para ${address}`}
          src={embedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </MapContainer>
    </section>
  )
}
