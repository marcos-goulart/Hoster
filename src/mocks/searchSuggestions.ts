import type { SearchSuggestion } from '../interfaces/SearchSuggestion'

export const fallbackSearchSuggestions: SearchSuggestion[] = [
  {
    id: 'rio-de-janeiro',
    title: 'Rio de Janeiro',
    subtitle: 'Rio de Janeiro (estado), Brasil',
    type: 'city',
    value: 'Rio de Janeiro',
  },
  {
    id: 'copacabana',
    title: 'Copacabana',
    subtitle: 'Rio de Janeiro, Rio de Janeiro (estado), Brasil',
    type: 'district',
    value: 'Copacabana',
  },
  {
    id: 'centro-rio',
    title: 'Centro do Rio de Janeiro',
    subtitle: 'Rio de Janeiro, Rio de Janeiro (estado), Brasil',
    type: 'district',
    value: 'Centro do Rio de Janeiro',
  },
  {
    id: 'barra-da-tijuca',
    title: 'Barra da Tijuca',
    subtitle: 'Rio de Janeiro, Rio de Janeiro (estado), Brasil',
    type: 'district',
    value: 'Barra da Tijuca',
  },
  {
    id: 'ilheus',
    title: 'Ilheus',
    subtitle: 'Bahia, Brasil',
    type: 'city',
    value: 'Ilheus',
  },
  {
    id: 'porto-seguro',
    title: 'Porto Seguro',
    subtitle: 'Bahia, Brasil',
    type: 'city',
    value: 'Porto Seguro',
  },
  {
    id: 'galeao',
    title: 'Rio de Janeiro (GIG - Galeao-Antonio Carlos Jobim Int.)',
    subtitle: 'Brasil',
    type: 'airport',
    value: 'Rio de Janeiro',
  },
]
