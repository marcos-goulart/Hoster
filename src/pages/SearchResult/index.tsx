import { useMemo } from 'react'
import { FaTag, FaTimes } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'

import { SearchForm } from '../../components/Banner/SearchForm'
import { FilterComponent } from '../../components/FilterComponent'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/NavBar'
import { getNights } from '../../components/HotelCardResult/searchUtils'
import { useHotelSearch } from './useHotelSearch'
import { HotelCardResult } from '../../components/HotelCardResult/index.tsx'
import { SearchSkeleton } from '../../components/SearchSkeleton/index.tsx'

import {
  Container,
  EmptyState,
  Pagination,
  ResultsColumn,
  ResultsLayout,
  SearchHero,
  TagAlert,
} from './styles'

export default function SearchResultPage() {
  const [searchParams] = useSearchParams()

  const {
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    appliedFilters,
    filteredHotels,
    displayedHotels,
    hasPromotion,
    isPromotionAlertVisible,
    setIsPromotionAlertVisible,
    handleApplyFilters,
  } = useHotelSearch(searchParams)

  const rawEntrada = searchParams.get('entrada')
  const rawSaida = searchParams.get('saida')
  const duracaoFlexivel = searchParams.get('duracaoFlexivel')

  const nights = useMemo(
    () => getNights(rawEntrada, rawSaida, duracaoFlexivel),
    [rawEntrada, rawSaida, duracaoFlexivel],
  )

  return (
    <Container>
      <Navbar />
      <SearchHero>
        <div className="container">
          <div className="searchCard">
            <SearchForm key={searchParams.toString()} />
          </div>
        </div>
      </SearchHero>

      <main>
        <div className="container">
          <ResultsLayout>
            <FilterComponent
              appliedFilters={appliedFilters}
              onApplyFilters={handleApplyFilters}
              totalResults={filteredHotels.length}
            />

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
                <SearchSkeleton />
              ) : filteredHotels.length > 0 ? (
                <>
                  {displayedHotels.map((hotel) => (
                    <HotelCardResult
                      key={`${hotel.id}-${searchParams.toString()}`}
                      hotel={hotel}
                      nights={nights}
                    />
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
