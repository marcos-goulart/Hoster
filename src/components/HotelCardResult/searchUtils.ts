import type { Hotel } from '../../interfaces/Hotel'
import type { HotelSearchCriteria } from '../../services/hotels'

export function getCriteriaFromParams(searchParams: URLSearchParams): HotelSearchCriteria {
  let entrada = searchParams.get('entrada') ?? undefined
  let saida = searchParams.get('saida') ?? undefined

  // Trata caso a data chegue concatenada na query 'entrada'
  if (entrada && entrada.includes(' - ')) {
    const parts = entrada.split(' - ')
    entrada = parts[0]?.trim()
    saida = parts[1]?.trim()
  }

  return {
    localizacao: searchParams.get('localizacao') ?? undefined,
    entrada,
    saida,
    periodo: searchParams.get('periodo') ?? undefined,
    nome: searchParams.get('nome') ?? undefined,
    flexibilidade: searchParams.get('flexibilidade')
      ? Number(searchParams.get('flexibilidade'))
      : undefined,
    duracaoFlexivel: searchParams.get('duracaoFlexivel') ?? undefined,
    incluirFimDeSemana: searchParams.get('incluirFimDeSemana') === 'true',
    mesesFlexiveis: searchParams.get('mesesFlexiveis')
      ? searchParams.get('mesesFlexiveis')!.split(',')
      : undefined,
  }
}

export function getDisplayPrice(hotel: Hotel): number {
  return hotel.discountPrice ?? hotel.price ?? 0
}

export function getNights(
  entrada: string | null | undefined,
  saida: string | null | undefined,
  duracaoFlexivel?: string | null,
): number {
  let startStr = entrada
  let endStr = saida

  // Se 'entrada' contiver o período completo ("2026-11-02 - 2026-11-30")
  if (startStr && startStr.includes(' - ')) {
    const parts = startStr.split(' - ')
    startStr = parts[0]?.trim()
    endStr = parts[1]?.trim()
  }

  if (startStr && endStr) {
    // Parse limpo YYYY-MM-DD
    const [y1, m1, d1] = startStr.split('-').map(Number)
    const [y2, m2, d2] = endStr.split('-').map(Number)

    if (y1 && m1 && d1 && y2 && m2 && d2) {
      const startDate = new Date(y1, m1 - 1, d1)
      const endDate = new Date(y2, m2 - 1, d2)

      const differenceInMs = endDate.getTime() - startDate.getTime()
      const diffDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24))

      if (diffDays > 0) {
        return diffDays // Retorna a quantidade exata de diárias (noites)
      }
    }
  }

  if (duracaoFlexivel) {
    switch (duracaoFlexivel) {
      case '1':
        return 1
      case '2-3':
        return 3
      case '4-5':
        return 5
      case '6-7':
        return 7
      default: {
        const parsed = parseInt(duracaoFlexivel, 10)
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
      }
    }
  }

  return 1
}

export function getRatingColor(rating: number): string {
  if (rating >= 9) return '#087f5b'
  if (rating >= 7) return '#2b8a3e'
  if (rating >= 5) return '#f08c00'
  return '#c92a2a'
}
