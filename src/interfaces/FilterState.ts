export interface FilterState {
  promotions: string[]
  minPrice: string
  maxPrice: string
  accommodations: string[]
  services: string[]
}

export const DEFAULT_FILTER_STATE: FilterState = {
  promotions: [],
  minPrice: '100',
  maxPrice: '1000',
  accommodations: [],
  services: [],
}
