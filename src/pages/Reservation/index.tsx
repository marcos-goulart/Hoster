import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useLocation, useParams } from 'react-router-dom'

import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/NavBar'
import type { Hotel } from '../../interfaces/Hotel'
import { getHotelById } from '../../services/hotels'

import {
  ActionButton,
  Container,
  EmptyState,
  FormCard,
  FormGrid,
  MainContent,
  Notice,
  ReservationSkeletonForm,
  ReservationSkeletonSummary,
  StatusBadge,
  SummaryCard,
  TitleBlock,
} from './styles'

const reservationFields = [
  { id: 'nome', label: 'Nome completo', type: 'text', className: 'half' },
  { id: 'email', label: 'E-mail', type: 'email', className: 'half' },
  { id: 'documento', label: 'CPF/Passaporte', type: 'text', className: 'half' },
  { id: 'nascimento', label: 'Data de nascimento', type: 'date', className: 'half' },
  { id: 'telefone', label: 'Telefone', type: 'tel', className: 'full' },
  { id: 'pais', label: 'Pais', type: 'text', className: 'third' },
  { id: 'estado', label: 'Estado', type: 'text', className: 'third' },
  { id: 'cidade', label: 'Cidade', type: 'text', className: 'third' },
  { id: 'rua', label: 'Rua', type: 'text', className: 'full' },
  { id: 'bairro', label: 'Bairro', type: 'text', className: 'half' },
  { id: 'cep', label: 'CEP', type: 'text', className: 'half' },
] as const

interface ReservationLocationState {
  hotel?: Hotel
}

export default function ReservationPage() {
  const { hotelId } = useParams()
  const location = useLocation()
  const { hotel: hotelFromState } = (location.state as ReservationLocationState | null) ?? {}
  const initialHotel = hotelId && hotelFromState?.id === hotelId ? hotelFromState : null

  const [hotel, setHotel] = useState<Hotel | null>(initialHotel)
  const [isLoading, setIsLoading] = useState(initialHotel === null)

  useEffect(() => {
    let isMounted = true

    async function loadHotel() {
      if (!hotelId) {
        if (isMounted) {
          setHotel(null)
          setIsLoading(false)
        }

        return
      }

      if (initialHotel === null) {
        setIsLoading(true)
      }

      const hotelData = await getHotelById(hotelId)

      if (isMounted) {
        setHotel(hotelData)
        setIsLoading(false)
      }
    }

    void loadHotel()

    return () => {
      isMounted = false
    }
  }, [hotelId, initialHotel])

  const isAvailable = hotel?.availability === true
  const isDisabled = !isAvailable

  return (
    <Container>
      <Navbar />
      <MainContent>
        <div className="container">
          <TitleBlock>
            <h1>Pre-reserva</h1>
            <div className="line" />
          </TitleBlock>

          {isLoading ? (
            <div className="contentGrid" aria-hidden="true">
              <ReservationSkeletonSummary>
                <div className="image" />
                <div className="summaryContent">
                  <div className="line title" />
                  <div className="line location" />
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={`reservation-skeleton-star-${index}`} className="star" />
                    ))}
                  </div>
                  <div className="line price" />
                  <div className="badge" />
                  <div className="line description" />
                  <div className="line description short" />
                </div>
              </ReservationSkeletonSummary>

              <ReservationSkeletonForm>
                <div className="fieldGrid">
                  {reservationFields.map((field) => (
                    <div
                      key={`reservation-skeleton-field-${field.id}`}
                      className={`field ${field.className}`}
                    >
                      <div className="label" />
                      <div className="input" />
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <div className="button" />
                </div>
              </ReservationSkeletonForm>
            </div>
          ) : !hotel ? (
            <EmptyState>
              Hotel nao encontrado. Volte para a Home e escolha outra hospedagem.
            </EmptyState>
          ) : (
            <div className="contentGrid">
              <SummaryCard $isAvailable={isAvailable}>
                <img src={hotel.image} alt={hotel.name} />
                <div className="summaryContent">
                  <h2>{hotel.name}</h2>
                  <p className="location">{hotel.location}</p>
                  <div className="stars" aria-label="Hotel com cinco estrelas">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar key={`${hotel.id}-star-${index}`} />
                    ))}
                  </div>
                  <p className="price">
                    {hotel.discountPrice !== undefined ? (
                      <>
                        <span className="oldPrice">
                          {hotel.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                        <span>
                          {hotel.discountPrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </>
                    ) : (
                      <span>
                        {hotel.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    )}
                  </p>
                  <StatusBadge $isAvailable={isAvailable}>
                    {isAvailable ? 'Disponivel!' : 'Indisponivel!'}
                  </StatusBadge>
                  {hotel.description ? <p className="description">{hotel.description}</p> : null}
                </div>
              </SummaryCard>

              <FormCard>
                {!isAvailable ? (
                  <Notice>
                    No momento esta hospedagem nao possui disponibilidade para seguir com a
                    pre-reserva.
                  </Notice>
                ) : null}

                <form>
                  <FormGrid>
                    {reservationFields.map((field) => (
                      <div key={field.id} className={`field ${field.className}`}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input id={field.id} type={field.type} disabled={isDisabled} />
                      </div>
                    ))}
                  </FormGrid>

                  <div className="actions">
                    <ActionButton type="button" disabled={isDisabled}>
                      Proximo
                    </ActionButton>
                  </div>
                </form>
              </FormCard>
            </div>
          )}
        </div>
      </MainContent>
      <Footer />
    </Container>
  )
}
