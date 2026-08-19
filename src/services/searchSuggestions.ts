import type { SearchSuggestion } from '../interfaces/SearchSuggestion'
import { fallbackSearchSuggestions } from '../mocks/searchSuggestions'
import api from './api'

function normalizeValue(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export async function getSearchSuggestions(query = ''): Promise<SearchSuggestion[]> {
  try {
    const { data } = await api.get<SearchSuggestion[]>('/searchSuggestions')

    if (!Array.isArray(data)) {
      return fallbackSearchSuggestions
    }

    const normalizedQuery = normalizeValue(query.trim())

    if (!normalizedQuery) {
      return data.slice(0, 7)
    }

    return data
      .filter((suggestion) =>
        normalizeValue(`${suggestion.title} ${suggestion.subtitle}`).includes(normalizedQuery),
      )
      .slice(0, 7)
  } catch {
    const normalizedQuery = normalizeValue(query.trim())

    if (!normalizedQuery) {
      return fallbackSearchSuggestions.slice(0, 7)
    }

    return fallbackSearchSuggestions
      .filter((suggestion) =>
        normalizeValue(`${suggestion.title} ${suggestion.subtitle}`).includes(normalizedQuery),
      )
      .slice(0, 7)
  }
}
