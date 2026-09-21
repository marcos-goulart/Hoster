export function maskCPFOrPassport(value: string): string {
  const clean = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

  // Se contiver letras, trata como Passaporte (máx 9 caracteres alfanuméricos)
  if (/[A-Z]/.test(clean)) {
    return clean.slice(0, 9)
  }

  // Caso contrário, aplica máscara de CPF: 000.000.000-00
  const numbersOnly = clean.replace(/\D/g, '').slice(0, 11)
  return numbersOnly
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function maskPhone(value: string): string {
  const numbersOnly = value.replace(/\D/g, '').slice(0, 11)

  if (numbersOnly.length <= 10) {
    // Telefone Fixo: (00) 0000-0000
    return numbersOnly.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
  }

  // Telemóvel / Celular: (00) 00000-0000
  return numbersOnly.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}
