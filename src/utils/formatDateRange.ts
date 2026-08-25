export function formatDateRange(
  entrada: string,
  saida: string,
  flexibilidade: number,
  duracaoFlexivel: string,
  mesesFlexiveis: string[],
): string {
  if (entrada || saida) {
    let rangeText = entrada && saida ? `${entrada} - ${saida}` : entrada || saida
    if (flexibilidade > 0) {
      rangeText += ` (± ${flexibilidade}d)`
    }
    return rangeText
  }

  if (mesesFlexiveis.length > 0 && duracaoFlexivel) {
    const durLabel =
      duracaoFlexivel === '1'
        ? '1 diária'
        : duracaoFlexivel === '2-3'
          ? '2-3 diárias'
          : duracaoFlexivel === '4-5'
            ? '4-5 diárias'
            : '6-7 diárias'
    return `${durLabel} em ${mesesFlexiveis.join(', ')}`
  }

  return 'Selecione as datas'
}
