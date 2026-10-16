import type { Review } from '../interfaces/Review'

export const reviewList: Review[] = [
  {
    id: 'review-1',
    hotelId: '1',
    userName: 'Carlos Eduardo Oliveira',
    comment: 'Vale muito a pena, preco acessivel e lugares muito lindos.',
    rating: 5,
    stayDate: '16/10/2023',
  },
  {
    id: 'review-2',
    hotelId: '1',
    userName: 'Ivaneide Pereira',
    comment: 'Hoteis e pousadas de otima qualidade. Recomendo!',
    rating: 5,
    stayDate: '10/10/2023',
  },
  {
    id: 'review-3',
    hotelId: '1',
    userName: 'Marcos Andrade',
    comment: 'Passei minha lua de mel em um desses hoteis e valeu muito a pena.',
    rating: 5,
    stayDate: '16/10/2026',
  },
]
