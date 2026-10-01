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
    const { data } = await api.get<SearchSuggestion[]>('/searchSuggestions', {
      params: { q: query },
    })

    if (!Array.isArray(data)) {
      return fallbackSearchSuggestions
    }

    return data
  } catch {
    // Caso haja instabilidade na rede, utiliza o fallback local sem quebrar a UI
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
