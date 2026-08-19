import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import {
  FaChevronDown,
  FaCoffee,
  FaTimes,
  FaFutbol,
  FaParking,
  FaShieldAlt,
  FaStar,
  FaTag,
  FaTags,
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
    flexibilidade: searchParams.get('flexibilidade') ? Number(searchParams.get('flexibilidade')) : undefined,
    duracaoFlexivel: searchParams.get('duracaoFlexivel') ?? undefined,
    incluirFimDeSemana: searchParams.get('incluirFimDeSemana') === 'true',
    mesesFlexiveis: searchParams.get('mesesFlexiveis') ? searchParams.get('mesesFlexiveis')!.split(',') : undefined,
  }
}

function getDisplayPrice(hotel: Hotel) {
  return hotel.discountPrice ?? hotel.price
}

function getNights(
  entrada: string | null,
  saida: string | null,
  duracaoFlexivel?: string | null,
) {
  if (entrada && saida) {
    const startDate = new Date(`${entrada}T00:00:00`)
    const endDate = new Date(`${saida}T00:00:00`)
    const differenceInMs = endDate.getTime() - startDate.getTime()
    const nights = Math.ceil(differenceInMs / 86_400_000)

    if (Number.isFinite(nights) && nights > 0) {
      return nights
    }
  }

  if (duracaoFlexivel) {
    switch (duracaoFlexivel) {
      case '1':
        return 1
      case '2-3':
        return 3
      case '4-5':
        return 5
      case '6-7':
        return 7
      default: {
        const parsed = parseInt(duracaoFlexivel, 10)
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
      }
    }
  }

  return 1
}

function getRatingColor(rating: number) {
  if (rating >= 9) return '#087f5b'
  if (rating >= 7) return '#2b8a3e'
  if (rating >= 5) return '#f08c00'

  return '#c92a2a'
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
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false)
  const [minPrice, setMinPrice] = useState('100')
  const [maxPrice, setMaxPrice] = useState('1000')
  const hasPromotion = hotels.some((hotel) => hotel.promoted)
  const totalPages = Math.max(1, Math.ceil(hotels.length / RESULTS_PER_PAGE))
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
  const displayedHotels = hotels.slice(startIndex, startIndex + RESULTS_PER_PAGE)
  const nights = getNights(
    searchParams.get('entrada'),
    searchParams.get('saida'),
    searchParams.get('duracaoFlexivel'),
  )

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
                <button
                  type="button"
                  className={`filterToggle ${isPriceFilterOpen ? 'open' : ''}`}
                  onClick={() => setIsPriceFilterOpen((isOpen) => !isOpen)}
                >
                  <span>
                    <strong>Preco</strong>
                    R$ {minPrice},00 a R$ {maxPrice},00
                  </span>
                  <FaChevronDown aria-hidden="true" />
                </button>

                {isPriceFilterOpen ? (
                  <div className="priceDropdown">
                    <label>
                      Minimo
                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(event) => setMinPrice(event.target.value)}
                      />
                    </label>
                    <label>
                      Maximo
                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                      />
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(event.target.value)}
                    />
                  </div>
                ) : null}
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
                    (() => {
                      const rating = 10
                      const dailyPrice = getDisplayPrice(hotel)
                      const totalPrice = dailyPrice * nights

                      return (
                        <ResultCard
                          key={hotel.id}
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
                                    Preco com desconto disponivel
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
                                  Total: {totalPrice.toLocaleString('pt-BR', {
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
                    })()
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
