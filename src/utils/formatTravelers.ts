export function formatTravelers(adultos: number, criancas: number, quartos: number): string {
  const totalTravelers = adultos + criancas

  if (totalTravelers === 0) {
    return 'Selecione os viajantes'
  }

  const travelerLabel = totalTravelers === 1 ? 'viajante' : 'viajantes'
  const roomLabel = quartos === 1 ? 'quarto' : 'quartos'

  return `${totalTravelers} ${travelerLabel}, ${quartos} ${roomLabel}`
}
