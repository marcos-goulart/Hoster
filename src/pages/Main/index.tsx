import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { Banner } from '../../components/Banner'
import { Carousel } from '../../components/Carousel'
import { Differentials } from '../../components/Differentials'
import { Footer } from '../../components/Footer'
import { Highlights } from '../../components/Highlights'
import { Promotions } from '../../components/Promotions'
import { Reviews } from '../../components/Reviews'
import { Navbar } from '../../components/NavBar'
import { useHomeAnimations } from '../../hooks/useHomeAnimations'
import type { Hotel } from '../../interfaces/Hotel'
import { fallbackHotels } from '../../mocks/hotelRecords'
import { getHotels } from '../../services/hotels'

import { Container } from './styles'

import { lenisInstance } from '../../hooks/useSmoothScroll'

export default function Main() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hotels, setHotels] = useState<Hotel[]>(fallbackHotels)
  const location = useLocation()

  useHomeAnimations(containerRef)

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

  useEffect(() => {
    let isMounted = true

    async function loadHotels() {
      const hotelData = await getHotels()

      if (isMounted) {
        setHotels(hotelData)
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
    </Container>
  )
}
