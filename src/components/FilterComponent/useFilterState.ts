import { useEffect, useState } from 'react'

import { DEFAULT_FILTER_STATE, type FilterState } from '../../interfaces/FilterState'
import { countActiveFilters, isFilterStateEqual } from './filterUtils'

export function useFilterState(
  appliedFilters: FilterState,
  onApplyFilters: (filters: FilterState) => void,
) {
  const [draftFilters, setDraftFilters] = useState<FilterState>(appliedFilters)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)

  useEffect(() => {
    setDraftFilters(appliedFilters)
  }, [appliedFilters])

  const isDirty = !isFilterStateEqual(draftFilters, appliedFilters)
  const activeCount = countActiveFilters(appliedFilters)

  const togglePromotion = (value: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      promotions: prev.promotions.includes(value)
        ? prev.promotions.filter((v) => v !== value)
        : [...prev.promotions, value],
    }))
  }

  const toggleAccommodation = (value: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      accommodations: prev.accommodations.includes(value)
        ? prev.accommodations.filter((v) => v !== value)
        : [...prev.accommodations, value],
    }))
  }

  const toggleService = (value: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((v) => v !== value)
        : [...prev.services, value],
    }))
  }

  const setMinPrice = (minPrice: string) => {
    setDraftFilters((prev) => ({ ...prev, minPrice }))
  }

  const setMaxPrice = (maxPrice: string) => {
    setDraftFilters((prev) => ({ ...prev, maxPrice }))
  }

  const handleApply = () => {
    onApplyFilters(draftFilters)
    setIsMobileOpen(false)
  }

  const handleClear = () => {
    setDraftFilters(DEFAULT_FILTER_STATE)
    onApplyFilters(DEFAULT_FILTER_STATE)
    setIsMobileOpen(false)
  }

  return {
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
  }
}
