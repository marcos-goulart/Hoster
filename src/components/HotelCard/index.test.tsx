import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppThemeProvider } from '../../styles/themeProvider'
import { HotelCard } from './index'
import type { Hotel } from '../../interfaces/Hotel'
import AllHotelsPage from '../../pages/AllHotels'
import * as hotelService from '../../services/hotels'

// Mock do módulo de serviço de hotéis
vi.mock('../../services/hotels', async () => {
  const actual = await vi.importActual('../../services/hotels')
  return {
    ...actual,
    listHotels: vi.fn(),
  }
})

describe('HotelCard', () => {
  const mockHotel: Hotel = {
    id: 'california-123',
    name: 'Hotel California',
    address: 'Av. Beira Mar, 100',
    city: 'Porto Seguro',
    state: 'BA',
    description: 'Hotel próximo de lindas praias e muito aconchegante.',
    price: 699.9,
    photos: ['https://example.com/hotel-1.jpg'],
    amenities: ['wifi', 'pool'],
    ratingScore: 4.8,
    reviewCount: 45,
  }

  const renderCard = (hotel: Hotel, hasDiscount?: boolean) => {
    return render(
      <AppThemeProvider>
        <BrowserRouter>
          <HotelCard hotel={hotel} hasDiscount={hasDiscount} />
        </BrowserRouter>
      </AppThemeProvider>,
    )
  }

  it('deve renderizar as informações básicas do hotel corretamente', () => {
    renderCard(mockHotel)

    expect(screen.getByText('Hotel California')).toBeInTheDocument()
    expect(screen.getByText(/Porto Seguro/i)).toBeInTheDocument()
    expect(
      screen.getByText('Hotel próximo de lindas praias e muito aconchegante.'),
    ).toBeInTheDocument()

    const image = screen.getByRole('img', { name: 'Hotel California' }) as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toBe('https://example.com/hotel-1.jpg')

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
      price: 800.0,
      discountPrice: 650.0,
    }

    renderCard(promotionalHotel)

    // O preço antigo (800,00) e o novo (650,00) devem aparecer formatados
    expect(screen.getByText(/800,00/)).toBeInTheDocument()
    expect(screen.getByText(/650,00/)).toBeInTheDocument()
  })
})

describe('Listagem de Hotéis e Estado Vazio', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  const renderAllHotelsPage = (category: string) => {
    return render(
      <AppThemeProvider>
        <MemoryRouter initialEntries={[`/hoteis/${category}`]}>
          <Routes>
            <Route path="/hoteis/:category" element={<AllHotelsPage />} />
          </Routes>
        </MemoryRouter>
      </AppThemeProvider>,
    )
  }

  it('deve renderizar 3 hotéis na listagem', async () => {
    const mockList: Hotel[] = [
      {
        id: '1',
        name: 'Hotel Alfa',
        address: 'Rua A',
        city: 'Destino A',
        state: 'RJ',
        price: 100,
        photos: ['img1.jpg'],
        amenities: [],
        ratingScore: 4.5,
        reviewCount: 10,
      },
      {
        id: '2',
        name: 'Hotel Beta',
        address: 'Rua B',
        city: 'Destino B',
        state: 'SP',
        price: 200,
        photos: ['img2.jpg'],
        amenities: [],
        ratingScore: 4.7,
        reviewCount: 20,
      },
      {
        id: '3',
        name: 'Hotel Gama',
        address: 'Rua C',
        city: 'Destino C',
        state: 'MG',
        price: 300,
        photos: ['img3.jpg'],
        amenities: [],
        ratingScore: 4.9,
        reviewCount: 30,
      },
    ]

    // Usando a função correta exportada pelo serviço
    vi.spyOn(hotelService, 'getHotelsByCategory').mockResolvedValue(mockList)

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
    // Usando a função correta exportada pelo serviço
    vi.spyOn(hotelService, 'getHotelsByCategory').mockResolvedValue([])

    renderAllHotelsPage('destaques')

    const emptyStateMessage = await screen.findByText(/Nenhum hotel foi encontrado/i)
    expect(emptyStateMessage).toBeInTheDocument()
  })
})
