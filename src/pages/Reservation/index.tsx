import { Link } from 'react-router-dom'
import { Navbar } from '../../components/NavBar'
import { Footer } from '../../components/Footer'

import { HotelGallery } from '../../components/HotelGallery'
import { ImageLightboxModal } from '../../components/ImageLightboxModal'
import { AmenitiesList } from '../../components/AmenitiesList'
import { RoomSelector } from '../../components/RoomSelector'
import { LocationMap } from '../../components/LocationMap'
import { HotelReviews } from '../../components/HotelReviews'
import { CheckoutStickyCard } from '../../components/CheckoutStickyCard'

import { useReservation } from '../../hooks/useReservation'
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
  SuccessNotice,
} from './styles'

export default function ReservationPage() {
  const {
    hotelDetail,
    selectedRoom,
    isLoading,
    isLightboxOpen,
    lightboxIndex,
    isSubmitting,
    confirmedBookingId,
    checkInDisplay,
    checkOutDisplay,
    nightsCount,
    guestsCount,
    setLightboxIndex,
    handleOpenLightbox,
    handleCloseLightbox,
    handleSelectRoom,
    handleUpdateStayDetails,
    handleSubmitBooking,
  } = useReservation()

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
              {confirmedBookingId ? (
                <SuccessNotice data-testid="booking-success-alert">
                  <strong>✓ Pré-reserva confirmada com sucesso!</strong>
                  Código da sua reserva: <strong>{confirmedBookingId}</strong>. Enviamos os detalhes
                  e as instruções de pagamento para o seu e-mail.
                </SuccessNotice>
              ) : null}

              {/* Cabeçalho do Hotel */}
              <HotelHeader data-testid="hotel-header">
                <div className="header-left">
                  <h1 data-testid="hotel-title">{hotelDetail.name}</h1>
                  <p data-testid="hotel-address">📍 {hotelDetail.address}</p>
                </div>

                <div className="rating-badge" data-testid="hotel-rating-badge">
                  ★ {hotelDetail.ratingScore} ({hotelDetail.reviewCount} avaliações)
                </div>
              </HotelHeader>

              {/* Grid Principal Desktop */}
              <MainGrid>
                {/* Coluna da Esquerda */}
                <LeftContent>
                  <HotelGallery
                    photos={hotelDetail.photos}
                    hotelName={hotelDetail.name}
                    onOpenLightbox={handleOpenLightbox}
                  />

                  <Card>
                    <AmenitiesList amenities={hotelDetail.amenitiesList} />

                    <Divider />

                    <RoomSelector
                      rooms={hotelDetail.rooms}
                      selectedRoomId={selectedRoom?.id || ''}
                      onSelectRoom={handleSelectRoom}
                    />

                    <Divider />

                    <LocationMap
                      address={hotelDetail.address}
                      mapEmbedUrl={hotelDetail.mapEmbedUrl}
                    />

                    <Divider />

                    <HotelReviews reviews={hotelDetail.reviews} />
                  </Card>
                </LeftContent>

                {/* Coluna da Direita (Sticky Checkout) */}
                <RightContent className="sticky-checkout">
                  {selectedRoom ? (
                    <CheckoutStickyCard
                      selectedRoom={selectedRoom}
                      nights={nightsCount}
                      checkIn={checkInDisplay}
                      checkOut={checkOutDisplay}
                      guestsCount={guestsCount}
                      isSubmitting={isSubmitting}
                      onUpdateStayDetails={handleUpdateStayDetails}
                      onSubmitBooking={handleSubmitBooking}
                    />
                  ) : null}
                </RightContent>
              </MainGrid>

              {/* Modal Lightbox */}
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
