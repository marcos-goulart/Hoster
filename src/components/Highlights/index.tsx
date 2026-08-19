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
        <h1>Hoteis e pousadas em destaque</h1>
        <HotelsContainer>
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </HotelsContainer>
        <ViewAllWrapper>
          <ViewAllButton to="/hoteis/destaques">Visualizar Todos</ViewAllButton>
        </ViewAllWrapper>
      </div>
    </Main>
  )
}
