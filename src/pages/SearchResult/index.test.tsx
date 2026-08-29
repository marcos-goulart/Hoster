import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { AppThemeProvider } from '../../styles/themeProvider'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SearchResultPage from './index'
import type { Hotel } from '../../interfaces/Hotel'
import * as hotelService from '../../services/hotels'
import { PageLoadingProvider } from '../../context/PageLoadingProvider'

// Mock searchHotels service
vi.mock('../../services/hotels', async () => {
  const actual = await vi.importActual('../../services/hotels')
  return {
    ...actual,
    searchHotels: vi.fn(),
  }
})

describe('SearchResultPage Filters', () => {
  const originalImage = window.Image

  const mockHotels: Hotel[] = [
    {
      id: 'hotel-a',
      name: 'Hotel Alfa',
      location: 'Rio de Janeiro/RJ',
      price: 300.0,
      image: 'alfa.jpg',
      accommodationType: 'hotel',
      services: ['piscina', 'wifi'],
      freeCancellation: false,
      immediateBooking: false,
      promoted: false,
    },
    {
      id: 'hotel-b',
      name: 'Hotel Beta',
      location: 'Rio de Janeiro/RJ',
      price: 400.0,
      discountPrice: 380.0,
      image: 'beta.jpg',
      accommodationType: 'hotel',
      services: ['wifi', 'cafe-manha'],
      freeCancellation: true,
      immediateBooking: true,
      promoted: true,
    },
    {
      id: 'hotel-c',
      name: 'Pousada Gama',
      location: 'Rio de Janeiro/RJ',
      price: 700.0,
      image: 'gama.jpg',
      accommodationType: 'pousada',
      services: ['piscina'],
      freeCancellation: true,
      immediateBooking: false,
      promoted: false,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(hotelService.searchHotels).mockResolvedValue(mockHotels)

    // Mock Image load for jsdom
    // @ts-ignore
    window.Image = class {
      onload: () => void = () => {}
      onerror: () => void = () => {}
      _src: string = ''
      complete: boolean = false
      get src() { return this._src }
      set src(val: string) {
        this._src = val
        setTimeout(() => { if (this.onload) this.onload() }, 10)
      }
    }
  })

  afterEach(() => {
    window.Image = originalImage
  })

  const renderPage = () => {
    return render(
      <AppThemeProvider>
        <MemoryRouter initialEntries={['/resultado?localizacao=Rio+de+Janeiro']}>
          <PageLoadingProvider>
            <Routes>
              <Route path="/resultado" element={<SearchResultPage />} />
            </Routes>
          </PageLoadingProvider>
        </MemoryRouter>
      </AppThemeProvider>
    )
  }

  it('deve aplicar o filtro de serviço "Piscinas" e exibir apenas hotéis com piscina', async () => {
    renderPage()

    // Espera os hotéis serem carregados inicialmente
    expect(await screen.findByText('Hotel Alfa')).toBeInTheDocument()
    expect(screen.getByText('Hotel Beta')).toBeInTheDocument()
    expect(screen.getByText('Pousada Gama')).toBeInTheDocument()

    // Clicar no checkbox de Piscinas
    const piscinaCheckbox = screen.getByLabelText('Piscinas')
    fireEvent.click(piscinaCheckbox)

    // Apenas Hotel Alfa e Pousada Gama possuem piscina
    expect(screen.getByText('Hotel Alfa')).toBeInTheDocument()
    expect(screen.queryByText('Hotel Beta')).not.toBeInTheDocument()
    expect(screen.getByText('Pousada Gama')).toBeInTheDocument()
  })

  it('deve desmarcar o filtro "Piscinas" e fazer com que todos os hotéis voltem a aparecer', async () => {
    renderPage()

    expect(await screen.findByText('Hotel Alfa')).toBeInTheDocument()

    const piscinaCheckbox = screen.getByLabelText('Piscinas')
    // Ativa o filtro
    fireEvent.click(piscinaCheckbox)
    expect(screen.queryByText('Hotel Beta')).not.toBeInTheDocument()

    // Desativa o filtro
    fireEvent.click(piscinaCheckbox)
    expect(screen.getByText('Hotel Alfa')).toBeInTheDocument()
    expect(screen.getByText('Hotel Beta')).toBeInTheDocument()
    expect(screen.getByText('Pousada Gama')).toBeInTheDocument()
  })

  it('deve combinar múltiplos filtros (Piscinas e Wi-fi) e mostrar apenas hotéis que atendam a ambos', async () => {
    renderPage()

    expect(await screen.findByText('Hotel Alfa')).toBeInTheDocument()

    const piscinaCheckbox = screen.getByLabelText('Piscinas')
    const wifiCheckbox = screen.getByLabelText('Wi-fi')

    fireEvent.click(piscinaCheckbox)
    fireEvent.click(wifiCheckbox)

    // Apenas Hotel Alfa atende a ambos
    expect(screen.getByText('Hotel Alfa')).toBeInTheDocument()
    expect(screen.queryByText('Hotel Beta')).not.toBeInTheDocument()
    expect(screen.queryByText('Pousada Gama')).not.toBeInTheDocument()
  })

  it('deve filtrar hotéis por faixa de preço e ocultar hotéis fora da faixa', async () => {
    renderPage()

    expect(await screen.findByText('Hotel Alfa')).toBeInTheDocument()

    // Abrir painel de preços
    const precoToggle = screen.getByText('Preco')
    fireEvent.click(precoToggle)

    // Definir mínimo = 350, máximo = 500
    const minInput = screen.getByLabelText('Minimo')
    const maxInput = screen.getByLabelText('Maximo')

    fireEvent.change(minInput, { target: { value: '350' } })
    fireEvent.change(maxInput, { target: { value: '500' } })

    // Apenas Hotel Beta (R$ 380,00) deve estar visível
    expect(screen.queryByText('Hotel Alfa')).not.toBeInTheDocument() // 300
    expect(screen.getByText('Hotel Beta')).toBeInTheDocument() // 380
    expect(screen.queryByText('Pousada Gama')).not.toBeInTheDocument() // 700
  })

  it('deve mostrar mensagem de "Nenhum hotel encontrado" ao selecionar filtros sem resultados', async () => {
    renderPage()

    expect(await screen.findByText('Hotel Alfa')).toBeInTheDocument()

    // Seleciona tipo de acomodação "Pousadas" e serviço "Wi-fi"
    const pousadasCheckbox = screen.getByLabelText('Pousadas')
    const wifiCheckbox = screen.getByLabelText('Wi-fi')

    fireEvent.click(pousadasCheckbox)
    fireEvent.click(wifiCheckbox)

    // Nenhuma pousada possui wi-fi nas mockadas
    const emptyState = await screen.findByText('Nenhum hotel encontrado para os criterios informados.')
    expect(emptyState).toBeInTheDocument()
  })
})
