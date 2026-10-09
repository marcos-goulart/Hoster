export interface FilterState {
  promotions: string[]
  minPrice: string
  maxPrice: string
  accommodations: string[]
  services: string[]
}

export const DEFAULT_FILTER_STATE: FilterState = {
  promotions: [],
  minPrice: '',
  maxPrice: '', // Deixar vazio por padrão para não restringir a busca vinda da URL
  accommodations: [],
  services: [],
}
