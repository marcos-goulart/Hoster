import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../../components/Footer'
import { HotelCard } from '../../components/HotelCard'
import { Navbar } from '../../components/NavBar'
import type { Hotel } from '../../interfaces/Hotel'
import { getHotelsByCategory, isHotelCategory, type HotelCategory } from '../../services/hotels'

import {
  Container,
  EmptyState,
  HotelsGrid,
  MainSection,
  SectionHeader,
  SkeletonCard,
  SkeletonGrid,
} from './styles'

const categoryContent: Record<
  HotelCategory,
  { title: string; description: string; hasDiscount: boolean }
> = {
  destaques: {
    title: 'Todos os hoteis e pousadas em destaque',
    description: 'Confira todas as hospedagens que estao em evidencia no momento.',
    hasDiscount: false,
  },
  promocoes: {
    title: 'Todos os hoteis e pousadas em promocao',
    description: 'Veja todas as oportunidades com preco promocional disponiveis na plataforma.',
    hasDiscount: true,
  },
}

export default function AllHotelsPage() {
  const { category } = useParams()
  const currentCategory = isHotelCategory(category) ? category : null

  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadHotels() {
      if (!currentCategory) {
        if (isMounted) {
          setHotels([])
          setIsLoading(false)
        }

        return
      }

      setIsLoading(true)

      const hotelList = await getHotelsByCategory(currentCategory)

      if (isMounted) {
        setHotels(hotelList)
        setIsLoading(false)
      }
    }

    void loadHotels()

    return () => {
      isMounted = false
    }
  }, [currentCategory])

  const pageContent = currentCategory ? categoryContent[currentCategory] : null
  const skeletonCards = Array.from({ length: 6 }, (_, index) => `skeleton-${index}`)

  return (
    <Container>
      <Navbar />
      <MainSection>
        <div className="container">
          {pageContent ? (
            <>
              <SectionHeader>
                <h1>{pageContent.title}</h1>
                <p>{pageContent.description}</p>
              </SectionHeader>

              {isLoading ? (
                <SkeletonGrid aria-hidden="true">
                  {skeletonCards.map((cardId) => (
                    <SkeletonCard key={cardId}>
                      <div className="image" />
                      <div className="content">
                        <div className="line title" />
                        <div className="line subtitle" />
                        <div className="line body" />
                        <div className="line body short" />
                        <div className="button" />
                      </div>
                    </SkeletonCard>
                  ))}
                </SkeletonGrid>
              ) : hotels.length > 0 ? (
                <HotelsGrid>
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} hasDiscount={pageContent.hasDiscount} />
                  ))}
                </HotelsGrid>
              ) : (
                <EmptyState>Nenhum hotel foi encontrado para esta categoria no momento.</EmptyState>
              )}
            </>
          ) : (
            <EmptyState>
              Categoria invalida. Volte para a Home e escolha uma listagem disponivel.
            </EmptyState>
          )}
        </div>
      </MainSection>
      <Footer />
    </Container>
  )
}
