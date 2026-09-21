import type { Hotel } from '../../interfaces/Hotel'
import type { HotelSearchCriteria } from '../../services/hotels'

export function getCriteriaFromParams(searchParams: URLSearchParams): HotelSearchCriteria {
  return {
    localizacao: searchParams.get('localizacao') ?? undefined,
    entrada: searchParams.get('entrada') ?? undefined,
    saida: searchParams.get('saida') ?? undefined,
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
  return hotel.discountPrice ?? hotel.price
}

export function getNights(
  entrada: string | null,
  saida: string | null,
  duracaoFlexivel?: string | null,
): number {
  if (entrada && saida) {
    const startDate = new Date(`${entrada}T00:00:00`)
    const endDate = new Date(`${saida}T00:00:00`)
    const differenceInMs = endDate.getTime() - startDate.getTime()
    const diffDays = Math.round(differenceInMs / 86_400_000)
    const nights = diffDays + 1

    if (Number.isFinite(nights) && nights > 0) {
      return nights
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
