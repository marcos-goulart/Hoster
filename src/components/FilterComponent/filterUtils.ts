import { DEFAULT_FILTER_STATE, type FilterState } from '../../interfaces/FilterState'

export function countActiveFilters(filters: FilterState): number {
  let count = 0
  if (filters.promotions.length > 0) count += filters.promotions.length
  if (filters.accommodations.length > 0) count += filters.accommodations.length
  if (filters.services.length > 0) count += filters.services.length
  if (
    filters.minPrice !== DEFAULT_FILTER_STATE.minPrice ||
    filters.maxPrice !== DEFAULT_FILTER_STATE.maxPrice
  ) {
    count += 1
  }
  return count
}

export function isFilterStateEqual(a: FilterState, b: FilterState): boolean {
  return (
    JSON.stringify(a.promotions.sort()) === JSON.stringify(b.promotions.sort()) &&
    JSON.stringify(a.accommodations.sort()) === JSON.stringify(b.accommodations.sort()) &&
    JSON.stringify(a.services.sort()) === JSON.stringify(b.services.sort()) &&
    a.minPrice === b.minPrice &&
    a.maxPrice === b.maxPrice
  )
}
