export interface SearchSuggestion {
  id: string
  title: string
  subtitle: string
  type: 'city' | 'neighborhood' | 'airport' | 'district'
  value: string
}
