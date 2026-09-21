import { GalleryWrapper } from './styles'

export interface HotelGalleryProps {
  photos: string[]
  hotelName: string
  onOpenLightbox: (index: number) => void
}

export function HotelGallery({ photos, hotelName, onOpenLightbox }: HotelGalleryProps) {
  const displayPhotos = photos.slice(0, 3)

  return (
    <GalleryWrapper>
      <div className="image-counter-badge">1/{photos.length || 1} Fotos</div>
      <div className="photo-grid-3">
        {displayPhotos.map((photo, index) => (
          <img
            key={`hotel-gallery-photo-${index}`}
            className={index === 0 ? 'main-photo' : undefined}
            src={photo}
            alt={`${hotelName} - Foto ${index + 1}`}
            onClick={() => onOpenLightbox(index)}
            data-testid={`gallery-image-${index}`}
          />
        ))}
      </div>
    </GalleryWrapper>
  )
}
