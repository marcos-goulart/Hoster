import { useEffect, useState } from 'react'

import { DEFAULT_FILTER_STATE, type FilterState } from '../../interfaces/FilterState'
import type { Hotel } from '../../interfaces/Hotel'
import { searchHotels } from '../../services/hotels'
import { getCriteriaFromParams } from './searchUtils'

const RESULTS_PER_PAGE = 10

export function useHotelSearch(searchParams: URLSearchParams) {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isPromotionAlertVisible, setIsPromotionAlertVisible] = useState(true)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(DEFAULT_FILTER_STATE)

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

  const handleApplyFilters = (newFilters: FilterState) => {
    setAppliedFilters(newFilters)
    setCurrentPage(1)
  }

  const filteredHotels = hotels.filter((hotel) => {
    if (appliedFilters.promotions.includes('cancelamento') && !hotel.freeCancellation) {
      return false
    }
    if (appliedFilters.promotions.includes('reserva-imediato') && !hotel.immediateBooking) {
      return false
    }
    if (appliedFilters.promotions.includes('ofertas-especiais') && !hotel.specialOffer) {
      return false
    }

    const displayPrice = hotel.discountPrice ?? hotel.price
    const min = parseFloat(appliedFilters.minPrice) || 0
    const max = parseFloat(appliedFilters.maxPrice) || Infinity
    if (displayPrice < min || displayPrice > max) {
      return false
    }

    if (appliedFilters.accommodations.length > 0) {
      const typeMap: Record<string, string> = {
        hoteis: 'hotel',
        pousadas: 'pousada',
      }
      const mappedTypes = appliedFilters.accommodations.map((t) => typeMap[t] ?? t)
      if (!hotel.accommodationType || !mappedTypes.includes(hotel.accommodationType)) {
        return false
      }
    }

    if (appliedFilters.services.length > 0) {
      const hasAllServices = appliedFilters.services.every((s) => hotel.services?.includes(s))
      if (!hasAllServices) {
        return false
      }
    }

    return true
  })

  const hasPromotion = filteredHotels.some((hotel) => hotel.promoted)
  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / RESULTS_PER_PAGE))
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
  const displayedHotels = filteredHotels.slice(startIndex, startIndex + RESULTS_PER_PAGE)

  return {
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
  }
}
