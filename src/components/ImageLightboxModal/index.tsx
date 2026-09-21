import { useEffect, useCallback } from 'react'
import { LightboxOverlay } from './styles'

export interface ImageLightboxModalProps {
  isOpen: boolean
  photos: string[]
  currentIndex: number
  onClose: () => void
  onSelectIndex: (index: number) => void
}

export function ImageLightboxModal({
  isOpen,
  photos,
  currentIndex,
  onClose,
  onSelectIndex,
}: ImageLightboxModalProps) {
  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length)
  }, [currentIndex, photos.length, onSelectIndex])

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % photos.length)
  }, [currentIndex, photos.length, onSelectIndex])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, handlePrev, handleNext])

  if (!isOpen || photos.length === 0) return null

  const currentPhoto = photos[currentIndex] || photos[0]

  return (
    <LightboxOverlay
      $active={isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de Fotos"
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Fechar visualizador"
        data-testid="lightbox-close"
      >
        &times;
      </button>

      <div className="lightbox-content">
        <button
          type="button"
          className="lightbox-btn prev"
          onClick={handlePrev}
          aria-label="Foto anterior"
          data-testid="lightbox-prev"
        >
          &#10094;
        </button>

        <img
          src={currentPhoto}
          alt={`Foto expandida ${currentIndex + 1} de ${photos.length}`}
          data-testid="lightbox-current-image"
        />

        <button
          type="button"
          className="lightbox-btn next"
          onClick={handleNext}
          aria-label="Próxima foto"
          data-testid="lightbox-next"
        >
          &#10095;
        </button>
      </div>

      <div className="lightbox-counter" data-testid="lightbox-counter">
        {currentIndex + 1} / {photos.length}
      </div>
    </LightboxOverlay>
  )
}
