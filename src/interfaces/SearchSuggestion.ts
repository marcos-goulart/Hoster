export interface SearchSuggestion {
  id: string
  title: string
  subtitle: string
  type: 'city' | 'district' | 'airport'
  value: string
}
