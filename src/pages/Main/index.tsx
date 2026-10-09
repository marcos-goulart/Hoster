import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Banner } from '../../components/Banner'
import { Carousel } from '../../components/Carousel'
import { Differentials } from '../../components/Differentials'
import { Footer } from '../../components/Footer'
import { Highlights } from '../../components/Highlights'
import { Promotions } from '../../components/Promotions'
import { Reviews } from '../../components/Reviews'
import { Navbar } from '../../components/NavBar'
import { AuthModal } from '../../components/AuthModal'
import { useHomeAnimations } from '../../hooks/useHomeAnimations'
import type { Hotel } from '../../interfaces/Hotel'
import { getHotels } from '../../services/hotels'

import { Container } from './styles'
import { lenisInstance } from '../../hooks/useSmoothScroll'

export default function Main() {
  const containerRef = useRef<HTMLDivElement>(null)
  // 1. Inicializa como array vazio para não disparar animação em dados desatualizados
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [, setIsLoading] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    return Boolean((location.state as { openAuthModal?: boolean } | null)?.openAuthModal)
  })

  // Hook de animação do GSAP
  useHomeAnimations(containerRef)

  useEffect(() => {
    if ((location.state as { openAuthModal?: boolean } | null)?.openAuthModal) {
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (scrollTo) {
      const el = document.getElementById(scrollTo)
      if (el) {
        setTimeout(() => {
          if (lenisInstance) {
            lenisInstance.scrollTo(el, { duration: 1.2 })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 150)
      }
    }
  }, [location])

  // 2. Busca os hotéis e recalcula os seletores GSAP/ScrollTrigger
  useEffect(() => {
    let isMounted = true

    async function loadHotels() {
      setIsLoading(true)
      const hotelData = await getHotels()

      if (isMounted) {
        setHotels(hotelData)
        setIsLoading(false)

        // Força a atualização do GSAP após o React renderizar os novos elementos no DOM
        requestAnimationFrame(() => {
          setTimeout(() => {
            ScrollTrigger.refresh()
            // Zera qualquer estagnação visual dos novos elementos injetados
            gsap.fromTo(
              '.card-reveal',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, overwrite: 'auto' },
            )
          }, 100)
        })
      }
    }

    void loadHotels()

    return () => {
      isMounted = false
    }
  }, [])

  const featuredHotels = hotels.filter((hotel) => hotel.featured).slice(0, 3)
  const promotedHotels = hotels.filter((hotel) => hotel.promoted).slice(0, 3)

  return (
    <Container ref={containerRef}>
      <Navbar />
      <Banner />
      <Highlights hotels={featuredHotels} />
      <Promotions hotels={promotedHotels} />
      <Differentials />
      <Carousel />
      <Reviews />
      <Footer />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Container>
  )
}
