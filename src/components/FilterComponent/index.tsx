import { FaChevronDown, FaFilter, FaTimes } from 'react-icons/fa'

import type { FilterState } from '../../interfaces/FilterState'
import { PriceFilterBlock } from './PriceFilterBlock'
import { ServicesFilterBlock } from './ServicesFilterBlock'
import {
  ActionsArea,
  ApplyFilterButton,
  ClearFilterButton,
  FilterContent,
  FilterWrapper,
  MobileAccordionHeader,
} from './styles'
import { useFilterState } from './useFilterState'

export interface FilterComponentProps {
  appliedFilters: FilterState
  onApplyFilters: (filters: FilterState) => void
  totalResults?: number
}

export function FilterComponent({
  appliedFilters,
  onApplyFilters,
  totalResults,
}: FilterComponentProps) {
  const {
    draftFilters,
    isDirty,
    activeCount,
    isMobileOpen,
    setIsMobileOpen,
    isPriceDropdownOpen,
    setIsPriceDropdownOpen,
    togglePromotion,
    toggleAccommodation,
    toggleService,
    setMinPrice,
    setMaxPrice,
    handleApply,
    handleClear,
  } = useFilterState(appliedFilters, onApplyFilters)

  return (
    <FilterWrapper>
      {/* Mobile Accordion Header Toggle */}
      <MobileAccordionHeader
        type="button"
        aria-label="Alternar painel de filtros"
        $isOpen={isMobileOpen}
        $activeCount={activeCount}
        onClick={() => setIsMobileOpen((prev) => !prev)}
        aria-expanded={isMobileOpen}
      >
        <div className="headerLeft">
          <FaFilter className="filterIcon" aria-hidden="true" />
          <span>Filtros</span>
          {typeof totalResults === 'number' && (
            <small style={{ color: '#64748b', fontWeight: 500 }}>({totalResults} resultados)</small>
          )}
          {activeCount > 0 && <span className="badge">{activeCount}</span>}
        </div>
        <FaChevronDown className="chevronIcon" aria-hidden="true" />
      </MobileAccordionHeader>

      {/* Main Filter Content */}
      <FilterContent $isMobileOpen={isMobileOpen}>
        {/* Promoções Block */}
        <div className="filterBlock">
          <h3>Promoções</h3>
          <label>
            <input
              type="checkbox"
              value="cancelamento"
              checked={draftFilters.promotions.includes('cancelamento')}
              onChange={() => togglePromotion('cancelamento')}
            />
            Cancelamento grátis
          </label>
          <label>
            <input
              type="checkbox"
              value="reserva-imediato"
              checked={draftFilters.promotions.includes('reserva-imediato')}
              onChange={() => togglePromotion('reserva-imediato')}
            />
            Reserva de imediato
          </label>
          <label>
            <input
              type="checkbox"
              value="ofertas-especiais"
              checked={draftFilters.promotions.includes('ofertas-especiais')}
              onChange={() => togglePromotion('ofertas-especiais')}
            />
            Ofertas especiais
          </label>
        </div>

        {/* Preço Block Subcomponent */}
        <PriceFilterBlock
          minPrice={draftFilters.minPrice}
          maxPrice={draftFilters.maxPrice}
          isOpen={isPriceDropdownOpen}
          onToggle={() => setIsPriceDropdownOpen((prev) => !prev)}
          onChangeMinPrice={setMinPrice}
          onChangeMaxPrice={setMaxPrice}
        />

        {/* Tipo de Acomodação Block */}
        <div className="filterBlock">
          <h3>Tipo de Acomodação</h3>
          <label>
            <input
              type="checkbox"
              value="hoteis"
              checked={draftFilters.accommodations.includes('hoteis')}
              onChange={() => toggleAccommodation('hoteis')}
            />
            Hotéis
          </label>
          <label>
            <input
              type="checkbox"
              value="pousadas"
              checked={draftFilters.accommodations.includes('pousadas')}
              onChange={() => toggleAccommodation('pousadas')}
            />
            Pousadas
          </label>
        </div>

        {/* Serviços Block Subcomponent */}
        <ServicesFilterBlock
          selectedServices={draftFilters.services}
          onToggleService={toggleService}
        />

        {/* Apply and Clear Actions */}
        <ActionsArea>
          <ApplyFilterButton type="button" $isDirty={isDirty} onClick={handleApply}>
            Aplicar Filtros
          </ApplyFilterButton>
          {(activeCount > 0 || isDirty) && (
            <ClearFilterButton type="button" onClick={handleClear}>
              <FaTimes aria-hidden="true" />
              Limpar filtros
            </ClearFilterButton>
          )}
        </ActionsArea>
      </FilterContent>
    </FilterWrapper>
  )
}
