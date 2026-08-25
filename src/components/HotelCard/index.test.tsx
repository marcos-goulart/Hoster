import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { AppThemeProvider } from '../../styles/themeProvider'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { HotelCard } from './index'
import type { Hotel } from '../../interfaces/Hotel'
import AllHotelsPage from '../../pages/AllHotels'
import * as hotelService from '../../services/hotels'

// Mock the hotels service
vi.mock('../../services/hotels', async () => {
  const actual = await vi.importActual('../../services/hotels')
  return {
    ...actual,
    getHotelsByCategory: vi.fn(),
  }
})

describe('HotelCard', () => {
  const mockHotel: Hotel = {
    id: 'california-123',
    name: 'Hotel California',
    location: 'Porto Seguro/BA',
    description: 'Hotel próximo de lindas praias e muito aconchegante.',
    price: 699.90,
    image: 'hotel-1.jpg',
  }

  const renderCard = (hotel: Hotel, hasDiscount?: boolean) => {
    return render(
      <AppThemeProvider>
        <BrowserRouter>
          <HotelCard hotel={hotel} hasDiscount={hasDiscount} />
        </BrowserRouter>
      </AppThemeProvider>
    )
  }

  it('deve renderizar as informações básicas do hotel corretamente', () => {
    renderCard(mockHotel)

    expect(screen.getByText('Hotel California')).toBeInTheDocument()
    expect(screen.getByText('Porto Seguro/BA')).toBeInTheDocument()
    expect(screen.getByText('Hotel próximo de lindas praias e muito aconchegante.')).toBeInTheDocument()
    
    const image = screen.getByRole('img', { name: 'Hotel California' }) as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toBe('hotel-1.jpg')

    // Preço BRL formatado
    expect(screen.getByText(/699,90/)).toBeInTheDocument()
  })

  it('deve possuir o link correto direcionando para a página de pré-reserva', () => {
    renderCard(mockHotel)

    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/pre-reserva/california-123')
  })

  it('deve renderizar o preço antigo e novo promocional corretamente', () => {
    const promotionalHotel: Hotel = {
      ...mockHotel,
      price: 800.00,
      discountPrice: 650.00,
    }

    renderCard(promotionalHotel)

    // O preço antigo (800,00) e o novo (650,00) devem aparecer formatados
    expect(screen.getByText(/800,00/)).toBeInTheDocument()
    expect(screen.getByText(/650,00/)).toBeInTheDocument()
  })
})

describe('Listagem de Hotéis e Estado Vazio', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderAllHotelsPage = (category: string) => {
    return render(
      <AppThemeProvider>
        <MemoryRouter initialEntries={[`/hoteis/${category}`]}>
          <Routes>
            <Route path="/hoteis/:category" element={<AllHotelsPage />} />
          </Routes>
        </MemoryRouter>
      </AppThemeProvider>
    )
  }

  it('deve renderizar 3 hotéis na listagem', async () => {
    const mockList: Hotel[] = [
      { id: '1', name: 'Hotel Alfa', location: 'Destino A', price: 100, image: 'img1.jpg' },
      { id: '2', name: 'Hotel Beta', location: 'Destino B', price: 200, image: 'img2.jpg' },
      { id: '3', name: 'Hotel Gama', location: 'Destino C', price: 300, image: 'img3.jpg' },
    ]

    vi.mocked(hotelService.getHotelsByCategory).mockResolvedValue(mockList)

    renderAllHotelsPage('destaques')

    // Esperar carregar os hotéis
    const hotel1 = await screen.findByText('Hotel Alfa')
    const hotel2 = await screen.findByText('Hotel Beta')
    const hotel3 = await screen.findByText('Hotel Gama')

    expect(hotel1).toBeInTheDocument()
    expect(hotel2).toBeInTheDocument()
    expect(hotel3).toBeInTheDocument()
  })

  it('deve exibir mensagem de estado vazio quando a lista estiver vazia', async () => {
    vi.mocked(hotelService.getHotelsByCategory).mockResolvedValue([])

    renderAllHotelsPage('destaques')

    const emptyStateMessage = await screen.findByText('Nenhum hotel foi encontrado para esta categoria no momento.')
    expect(emptyStateMessage).toBeInTheDocument()
  })
})
