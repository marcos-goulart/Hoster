import type { Hotel } from '../../interfaces/Hotel'
import { HotelCard } from '../HotelCard'
import { Main, PromotionsContainer, ViewAllButton, ViewAllWrapper } from './styles'

interface PromotionsProps {
  hotels: Hotel[]
}

export function Promotions({ hotels }: PromotionsProps) {
  return (
    <Main>
      <div className="container">
        <div className="title">
          <h1 className='text-reveal'>Nossos hoteis e pousadas em promocões</h1>
        </div>
        <PromotionsContainer>
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} hasDiscount className='card-reveal' />
          ))}
        </PromotionsContainer>
        <ViewAllWrapper>
          <ViewAllButton to='/hoteis/promocoes' className='card-reveal text-reveal'>
            Visualizar Todos
          </ViewAllButton>
        </ViewAllWrapper>
      </div>
    </Main>
  )
}
