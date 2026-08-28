import type { Hotel } from '../../interfaces/Hotel'
import { HotelCard } from '../HotelCard'
import { Main, HotelsContainer, ViewAllButton, ViewAllWrapper } from './styles'

interface HighlightsProps {
  hotels: Hotel[]
}

export function Highlights({ hotels }: HighlightsProps) {
  return (
    <Main>
      <div className="container">
        <h1 className="text-reveal">Hoteis e pousadas em destaque</h1>
        <HotelsContainer>
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} className='card-reveal'/>
          ))}
        </HotelsContainer>
        <ViewAllWrapper className='card-reveal'>
          <ViewAllButton to="/hoteis/destaques" className='card-reveal'>Visualizar Todos</ViewAllButton>
        </ViewAllWrapper>
      </div>
    </Main>
  )
}
