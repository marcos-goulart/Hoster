interface SearchFormValues {
  localizacao: string
  entrada: string
  saida: string
  periodo: string
  flexibilidade: number
  duracaoFlexivel: string
  incluirFimDeSemana: boolean
  mesesFlexiveis: string[]
  adultos: number
  criancas: number
  quartos: number
}

export function buildSearchUrl(values: SearchFormValues) {
  const params = new URLSearchParams()

  let finalEntrada = values.entrada
  let finalSaida = values.saida

  // Se entrada contiver intervalo concatenado
  if (finalEntrada.includes(' - ')) {
    const parts = finalEntrada.split(' - ')
    finalEntrada = parts[0].trim()
    finalSaida = parts[1].trim()
  }

  if (finalEntrada.trim()) {
    params.set('checkIn', finalEntrada.trim())
    params.set('entrada', finalEntrada.trim())
  }

  if (finalSaida.trim()) {
    params.set('checkOut', finalSaida.trim())
    params.set('saida', finalSaida.trim())
  }

  Object.entries(values).forEach(([key, value]) => {
    if (key === 'entrada' || key === 'saida') {
      return
    }

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
