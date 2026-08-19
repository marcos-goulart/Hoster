import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import {
  FaCoffee,
  FaTimes,
  FaFutbol,
  FaParking,
  FaShieldAlt,
  FaStar,
  FaTag,
  FaUmbrellaBeach,
  FaUtensils,
  FaWifi,
} from 'react-icons/fa'
import { MdPool } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'

import { SearchForm } from '../../components/Banner/SearchForm'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/NavBar'
import type { Hotel } from '../../interfaces/Hotel'
import { searchHotels, type HotelSearchCriteria } from '../../services/hotels'

import {
  ApplyButton,
  Container,
  EmptyState,
  FilterAside,
  Pagination,
  ResultCard,
  ResultsColumn,
  ResultsLayout,
  SearchHero,
  ServiceItem,
  SkeletonResultCard,
  TagAlert,
} from './styles'

const RESULTS_PER_PAGE = 10

const serviceLabels: Record<string, string> = {
  restaurante: 'Restaurante',
  piscina: 'Piscinas',
  wifi: 'Wi-fi',
  'cafe-manha': 'Cafe da manha',
  'campo-futebol': 'Campo de futebol',
  estacionamento: 'Estacionamento',
  praias: 'Praias',
}

const serviceIcons: Record<string, ReactElement> = {
  restaurante: <FaUtensils aria-hidden="true" />,
  piscina: <MdPool aria-hidden="true" />,
  wifi: <FaWifi aria-hidden="true" />,
  'cafe-manha': <FaCoffee aria-hidden="true" />,
  'campo-futebol': <FaFutbol aria-hidden="true" />,
  estacionamento: <FaParking aria-hidden="true" />,
  praias: <FaUmbrellaBeach aria-hidden="true" />,
}

function getCriteriaFromParams(searchParams: URLSearchParams): HotelSearchCriteria {
  return {
    localizacao: searchParams.get('localizacao') ?? undefined,
    entrada: searchParams.get('entrada') ?? undefined,
    saida: searchParams.get('saida') ?? undefined,
    periodo: searchParams.get('periodo') ?? undefined,
    nome: searchParams.get('nome') ?? undefined,
  }
}

function getDisplayPrice(hotel: Hotel) {
  return hotel.discountPrice ?? hotel.price
}

function SearchResultSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonResultCard key={`search-result-skeleton-${index}`}>
          <div className="image" />
          <div className="content">
            <div className="line title" />
            <div className="line location" />
            <div className="stars">
              {Array.from({ length: 5 }).map((__, starIndex) => (
                <div key={`search-result-skeleton-${index}-${starIndex}`} className="star" />
              ))}
            </div>
            <div className="line description" />
            <div className="line description short" />
            <div className="services">
              <div className="service" />
              <div className="service" />
              <div className="service" />
            </div>
          </div>
        </SkeletonResultCard>
      ))}
    </>
  )
}

export default function SearchResultPage() {
  const [searchParams] = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isPromotionAlertVisible, setIsPromotionAlertVisible] = useState(true)
  const hasPromotion = hotels.some((hotel) => hotel.promoted)
  const totalPages = Math.max(1, Math.ceil(hotels.length / RESULTS_PER_PAGE))
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
  const displayedHotels = hotels.slice(startIndex, startIndex + RESULTS_PER_PAGE)

  useEffect(() => {
    let isMounted = true

    async function loadResults() {
      setIsLoading(true)
      const criteria = getCriteriaFromParams(searchParams)
      const hotelResults = await searchHotels(criteria)

      if (isMounted) {
        setHotels(hotelResults)
        setCurrentPage(1)
        setIsPromotionAlertVisible(true)
        setIsLoading(false)
      }
    }

    void loadResults()

    return () => {
      isMounted = false
    }
  }, [searchParams])

  return (
    <Container>
      <Navbar />
      <SearchHero>
        <div className="container">
          <div className="searchCard">
            <SearchForm />
          </div>
        </div>
      </SearchHero>

      <main>
        <div className="container">
          <ResultsLayout>
            <FilterAside>
              <div className="filterBlock">
                <h2>Promocoes</h2>
                <label>
                  <input type="checkbox" value="cancelamento" />
                  Cancelamento gratis
                </label>
                <label>
                  <input type="checkbox" value="reserva-imediato" />
                  Reserva de imediato
                </label>
                <label>
                  <input type="checkbox" value="ofertas-especiais" />
                  Ofertas especiais
                </label>
              </div>

              <div className="filterBlock">
                <h2>Preco</h2>
                <span>R$ 100,00 a R$ 1.000,00</span>
                <input type="range" min="100" max="1000" step="50" defaultValue="1000" />
              </div>

              <div className="filterBlock">
                <h2>Tipos de acomodacoes</h2>
                <label>
                  <input type="checkbox" value="hoteis" />
                  Hoteis
                </label>
                <label>
                  <input type="checkbox" value="pousadas" />
                  Pousadas
                </label>
              </div>

              <div className="filterBlock">
                <h2>Servicos</h2>
                {Object.entries(serviceLabels).map(([service, label]) => (
                  <label key={service}>
                    <input type="checkbox" value={service} />
                    {label}
                  </label>
                ))}
              </div>

              <ApplyButton type="button" disabled>
                Aplicar
              </ApplyButton>
            </FilterAside>

            <ResultsColumn>
              {hasPromotion && isPromotionAlertVisible ? (
                <TagAlert>
                  <span>
                    <FaTag aria-hidden="true" />
                    Itens abaixo em promocao
                  </span>
                  <button
                    type="button"
                    aria-label="Remover aviso de promocoes"
                    onClick={() => setIsPromotionAlertVisible(false)}
                  >
                    <FaTimes aria-hidden="true" />
                  </button>
                </TagAlert>
              ) : null}

              {isLoading ? (
                <SearchResultSkeleton />
              ) : hotels.length > 0 ? (
                <>
                  {displayedHotels.map((hotel) => (
                    <ResultCard
                      key={hotel.id}
                      to={`/pre-reserva/${hotel.id}`}
                      state={{ hotel }}
                      $isPromotion={hotel.promoted === true}
                      aria-label={`Ver disponibilidade de ${hotel.name}`}
                    >
                      <div className="imageArea">
                        <img src={hotel.image} alt={hotel.name} />
                        <span className="priceBadge">
                          {getDisplayPrice(hotel).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
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

                                <div className="verified-tooltip-content">
                                  <strong>Hotel Verificado</strong>
                                  <span>
                                    Este estabelecimento atende aos nossos padrões de qualidade e
                                    segurança.
                                  </span>
                                </div>
                              </div>
                            ) : null}
                          </div>
                          <p className="location">{hotel.location}</p>
                          <div className="stars" aria-label="Hotel com cinco estrelas">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <FaStar key={`${hotel.id}-result-star-${index}`} aria-hidden="true" />
                            ))}
                          </div>
                          <p className="description">
                            {hotel.description ??
                              'Com otimos espacos para quem procura algo confortavel para descansar.'}
                          </p>
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
                  ))}

                  {totalPages > 1 ? (
                    <Pagination aria-label="Paginacao de resultados">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      >
                        Anterior
                      </button>
                      <span>
                        Pagina {currentPage} de {totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      >
                        Proxima
                      </button>
                    </Pagination>
                  ) : null}
                </>
              ) : (
                <EmptyState>Nenhum hotel encontrado para os criterios informados.</EmptyState>
              )}
            </ResultsColumn>
          </ResultsLayout>
        </div>
      </main>
      <Footer />
    </Container>
  )
}
