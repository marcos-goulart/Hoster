import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Navbar } from '../../components/NavBar'
import { Footer } from '../../components/Footer'

import { HotelGallery } from '../../components/HotelGallery'
import { ImageLightboxModal } from '../../components/ImageLightboxModal'
import { AmenitiesList } from '../../components/AmenitiesList'
import { RoomSelector } from '../../components/RoomSelector'
import { LocationMap } from '../../components/LocationMap'
import { HotelReviews } from '../../components/HotelReviews'
import { HotelAboutSection } from '../../components/HotelAboutSection'
import { HotelQASection } from '../../components/HotelQASection'
import { CheckoutStickyCard } from '../../components/CheckoutStickyCard'

import { useReservation } from '../../hooks/useReservation'
import { useFavorites } from '../../hooks/useFavorites'
import type { Hotel } from '../../interfaces/Hotel'
import {
  Card,
  Container,
  Divider,
  EmptyState,
  HotelHeader,
  LeftContent,
  MainContent,
  MainGrid,
  RightContent,
  SkeletonGrid,
} from './styles'

export default function ReservationPage() {
  const {
    hotelDetail,
    selectedRoom,
    isLoading,
    isLightboxOpen,
    lightboxIndex,
    isSubmitting,
    checkInDisplay,
    checkOutDisplay,
    checkInISO,
    checkOutISO,
    periodo,
    nightsCount,
    guestsCount,
    setLightboxIndex,
    handleOpenLightbox,
    handleCloseLightbox,
    handleSelectRoom,
    handleUpdateStayDetails,
    handleSubmitBooking,
  } = useReservation()

  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = hotelDetail ? favorites.some((fav) => fav.id === hotelDetail.id) : false

  const handleFavoriteClick = () => {
    if (hotelDetail) {
      void toggleFavorite(hotelDetail as unknown as Hotel)
    }
  }

  return (
    <Container>
      <Navbar />

      <MainContent>
        <div className="container">
          {isLoading ? (
            <SkeletonGrid data-testid="reservation-skeleton">
              <div>
                <div className="gallery-skeleton" />
                <div className="card-skeleton" />
              </div>
              <div>
                <div className="card-skeleton" />
              </div>
            </SkeletonGrid>
          ) : !hotelDetail ? (
            <EmptyState data-testid="reservation-empty-state">
              <h2>Acomodação não encontrada</h2>
              <p>Não foi possível carregar os dados desta acomodação para a pré-reserva.</p>
              <Link to="/">Voltar para a página inicial</Link>
            </EmptyState>
          ) : (
            <>
              {/* Cabeçalho do Hotel */}
              <HotelHeader data-testid="hotel-header">
                <div className="header-left">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h1 data-testid="hotel-title">{hotelDetail.name}</h1>
                    <button
                      type="button"
                      onClick={handleFavoriteClick}
                      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '50%',
                        width: '2.5rem',
                        height: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      {isFavorite ? (
                        <FaHeart style={{ color: '#ef4444', fontSize: '1.25rem' }} />
                      ) : (
                        <FaRegHeart style={{ color: '#6b7280', fontSize: '1.25rem' }} />
                      )}
                    </button>
                  </div>
                  <p data-testid="hotel-address">📍 {hotelDetail.address}</p>
                </div>

                <div className="rating-badge" data-testid="hotel-rating-badge">
                  ★ {hotelDetail.ratingScore} ({hotelDetail.reviewCount} avaliações)
                </div>
              </HotelHeader>

              {/* Grid Principal */}
              <MainGrid>
                <LeftContent>
                  <HotelGallery
                    photos={hotelDetail.photos}
                    hotelName={hotelDetail.name}
                    onOpenLightbox={handleOpenLightbox}
                  />

                  <Card>
                    {/* Comodidades */}
                    {hotelDetail.amenities?.length || hotelDetail.amenitiesList?.length ? (
                      <>
                        <AmenitiesList
                          amenities={hotelDetail.amenities || hotelDetail.amenitiesList || []}
                        />
                        <Divider />
                      </>
                    ) : null}

                    {/* Seletor de Quartos */}
                    <RoomSelector
                      rooms={hotelDetail.rooms}
                      selectedRoomId={selectedRoom?.id || ''}
                      onSelectRoom={handleSelectRoom}
                    />

                    {/* Mais informações (Opcional) */}
                    {hotelDetail.about && (
                      <>
                        <Divider />
                        <HotelAboutSection about={hotelDetail.about} />
                      </>
                    )}

                    {/* Localização */}
                    <Divider />
                    <LocationMap
                      address={hotelDetail.address}
                      mapEmbedUrl={hotelDetail.mapEmbedUrl}
                    />

                    {/* Avaliações (Renderizado sempre: exibe a lista ou a mensagem vazia) */}
                    <Divider />
                    <HotelReviews reviews={hotelDetail.reviews} />

                    {/* Perguntas e Respostas */}
                    <Divider />
                    <HotelQASection hotelId={hotelDetail.id} questions={hotelDetail.questions} />
                  </Card>
                </LeftContent>

                <RightContent className="sticky-checkout">
                  {selectedRoom ? (
                    <CheckoutStickyCard
                      selectedRoom={selectedRoom}
                      nights={nightsCount}
                      checkIn={checkInDisplay}
                      checkOut={checkOutDisplay}
                      checkInISO={checkInISO}
                      checkOutISO={checkOutISO}
                      periodo={periodo}
                      guestsCount={guestsCount}
                      isSubmitting={isSubmitting}
                      onUpdateStayDetails={handleUpdateStayDetails}
                      onSubmitBooking={handleSubmitBooking}
                    />
                  ) : null}
                </RightContent>
              </MainGrid>

              <ImageLightboxModal
                isOpen={isLightboxOpen}
                photos={hotelDetail.photos}
                currentIndex={lightboxIndex}
                onClose={handleCloseLightbox}
                onSelectIndex={setLightboxIndex}
              />
            </>
          )}
        </div>
      </MainContent>

      <Footer />
    </Container>
  )
}
