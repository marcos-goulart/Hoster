import type { SearchFormValues } from "../interfaces/SearchFormValues"

export function buildSearchUrl(values: SearchFormValues) {
  const params = new URLSearchParams()

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      if (value) params.set(key, 'true')
      return
    }

    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(','))
      return
    }

    if (typeof value === 'number') {
      if (value > 0 || key === 'adultos' || key === 'quartos') {
        params.set(key, String(value))
      }
      return
    }

    if (typeof value === 'string' && value.trim()) {
      params.set(key, value.trim())
    }
  })

  return `/resultado?${params.toString()}`
}
