import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppThemeProvider } from '../../styles/themeProvider'
import ReservationPage from './index'
import type { HotelDetail } from '../../interfaces/Reservation'
import * as reservationService from '../../services/reservationMock'

// Mock de autenticação para testes
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isLogged: false,
    user: null,
    logout: vi.fn(),
  }),
}))

// Mock de favoritos
const mockToggleFavorite = vi.fn()
vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [],
    loading: false,
    toggleFavorite: mockToggleFavorite,
  }),
}))

const mockHotelDetail: HotelDetail = {
  id: 'hotel-paris-germany',
  name: 'Hotel Paris Germany',
  address: 'Av. Beira Mar, 450, Ilhéus - BA',
  city: 'Ilhéus',
  state: 'BA',
  description: 'Um hotel magnífico à beira mar com vista panorâmica.',
  price: 800,
  about:
    'Fundado em 1995, o hotel oferece uma experiência acolhedora com vista deslumbrante para o mar.',
  photos: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
  ],
  amenities: [
    'Wi-Fi de alta velocidade',
    'Café da manhã incluso',
    'Piscina externa',
    'Estacionamento gratuito',
  ],
  amenitiesList: [
    'Wi-Fi de alta velocidade',
    'Café da manhã incluso',
    'Piscina externa',
    'Estacionamento gratuito',
  ],
  rooms: [
    {
      id: 'suite-standard-king',
      title: 'Suíte Standard King',
      subtitle: '2 Hóspedes • Ar-condicionado • Wi-fi',
      pricePerNight: 800,
      size: '32m²',
      bedType: '1 Cama King',
      tags: ['1 Cama King', 'Café incluso'],
      isAvailable: true,
    },
    {
      id: 'suite-executiva-mar',
      title: 'Suíte Executiva Vista Mar',
      subtitle: '2 Hóspedes • Varanda privativa • Hidromassagem',
      pricePerNight: 1050,
      size: '48m²',
      bedType: '1 Cama King',
      tags: ['1 Cama King', 'Frente para o Mar'],
      isAvailable: true,
    },
  ],
  reviews: [
    {
      id: 'review-1',
      userName: 'Mariana Gonçalves',
      avatarInitials: 'MG',
      avatarBgColor: '#C07A46',
      stayDate: 'Hospedou-se em Agosto de 2026',
      rating: 5,
      comment: 'Excelente localização e atendimento impecável.',
    },
  ],
  questions: [
    {
      id: 'q-1',
      hotelId: 'hotel-paris-germany',
      userId: 'user-1',
      question: 'O hotel aceita animais de estimação?',
      answer: 'Sim, aceitamos pets de pequeno porte com taxa adicional.',
      createdAt: '2026-08-10T14:00:00Z',
      user: {
        name: 'Roberto Dias',
      },
    },
  ],
  mapEmbedUrl: 'https://maps.google.com/maps?q=Ilheus&output=embed',
  ratingScore: 4.9,
  reviewCount: 128,
}

describe('ReservationPage - Testes de Integração e UI', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    mockToggleFavorite.mockClear()
    window.scrollTo = vi.fn()

    vi.spyOn(reservationService, 'getHotelDetailById').mockResolvedValue(mockHotelDetail)
    vi.spyOn(reservationService, 'createBooking').mockResolvedValue({
      success: true,
      bookingId: 'HTR-CONFIRMED-999',
      message: 'Pré-reserva confirmada com sucesso no PostgreSQL!',
      booking: {
        hotelId: 'hotel-paris-germany',
        roomId: 'suite-standard-king',
        checkIn: '10 Out',
        checkOut: '13 Out',
        nights: 3,
        guestsCount: 2,
        guestData: {
          fullName: 'Marcos Goulart',
          email: 'marcos@email.com',
          document: '123.456.789-00',
          phone: '(11) 98888-7777',
        },
        roomPricePerNight: 800,
        serviceFee: 120,
        totalPrice: 2520,
        createdAt: '2026-10-16T12:00:00.000Z',
      },
    })
  })

  const renderReservationPage = (initialEntry = '/pre-reserva/hotel-paris-germany') => {
    return render(
      <AppThemeProvider>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route path="/pre-reserva/:hotelId" element={<ReservationPage />} />
          </Routes>
        </MemoryRouter>
      </AppThemeProvider>,
    )
  }

  it('deve exibir o esqueleto de carregamento (skeleton) antes de carregar os dados', () => {
    // Retorna uma Promise não resolvida imediatamente para capturar o loading
    vi.spyOn(reservationService, 'getHotelDetailById').mockReturnValue(new Promise(() => {}))

    renderReservationPage()

    expect(screen.getByTestId('reservation-skeleton')).toBeInTheDocument()
  })

  it('deve renderizar as informações completas do hotel (cabeçalho, fotos, comodidades, quartos, sobre, mapa, avaliações e perguntas)', async () => {
    renderReservationPage()

    // Aguarda carregar as informações do hotel
    expect(await screen.findByTestId('hotel-title')).toHaveTextContent('Hotel Paris Germany')
    expect(screen.getByTestId('hotel-address')).toHaveTextContent('Av. Beira Mar, 450, Ilhéus - BA')
    expect(screen.getByTestId('hotel-rating-badge')).toHaveTextContent('4.9 (128 avaliações)')

    // Comodidades
    expect(screen.getByText('Wi-Fi de alta velocidade')).toBeInTheDocument()
    expect(screen.getByText('Café da manhã incluso')).toBeInTheDocument()
    expect(screen.getByText('Piscina externa')).toBeInTheDocument()
    expect(screen.getByText('Estacionamento gratuito')).toBeInTheDocument()

    // Quartos disponíveis
    expect(screen.getByText('Suíte Standard King')).toBeInTheDocument()
    expect(screen.getByText('Suíte Executiva Vista Mar')).toBeInTheDocument()

    // Mais informações sobre o hotel (HotelAboutSection)
    expect(screen.getByText('Mais informações sobre o hotel')).toBeInTheDocument()
    expect(
      screen.getByText(/Fundado em 1995, o hotel oferece uma experiência acolhedora/i),
    ).toBeInTheDocument()

    // Localização (LocationMap)
    expect(screen.getByText('Localização')).toBeInTheDocument()

    // Avaliações (HotelReviews)
    expect(screen.getByText('Mariana Gonçalves')).toBeInTheDocument()
    expect(screen.getByText('"Excelente localização e atendimento impecável."')).toBeInTheDocument()

    // Perguntas e Respostas (HotelQASection)
    expect(screen.getByText('Perguntas ao Hotel / Anfitrião')).toBeInTheDocument()
    expect(screen.getByText('O hotel aceita animais de estimação?')).toBeInTheDocument()
    expect(
      screen.getByText('Sim, aceitamos pets de pequeno porte com taxa adicional.'),
    ).toBeInTheDocument()
  })

  it('deve permitir favoritar a acomodação ao clicar no botão de coração', async () => {
    renderReservationPage()

    expect(await screen.findByTestId('hotel-title')).toBeInTheDocument()

    const favoriteButton = screen.getByRole('button', { name: /adicionar aos favoritos/i })
    expect(favoriteButton).toBeInTheDocument()

    fireEvent.click(favoriteButton)
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1)
  })

  it('deve recalcular os valores da diária e total da reserva ao alternar a seleção do quarto', async () => {
    renderReservationPage()

    expect(await screen.findByTestId('hotel-title')).toBeInTheDocument()

    // Quarto inicial selecionado: Suíte Standard King (R$ 800)
    expect(screen.getByTestId('checkout-daily-price')).toHaveTextContent(/800/i)
    expect(screen.getByTestId('summary-room-total')).toHaveTextContent(/2\.400/i)
    expect(screen.getByTestId('summary-grand-total')).toHaveTextContent(/2\.520/i)

    // Seleciona o quarto Suíte Executiva Vista Mar (R$ 1.050)
    const executivaRadio = screen.getByTestId('room-radio-suite-executiva-mar')
    fireEvent.click(executivaRadio)

    // O valor no card sticky de checkout deve ser recalculado
    await waitFor(() => {
      expect(screen.getByTestId('checkout-daily-price')).toHaveTextContent(/1\.050/i)
      expect(screen.getByTestId('summary-room-total')).toHaveTextContent(/3\.150/i)
      expect(screen.getByTestId('summary-grand-total')).toHaveTextContent(/3\.270/i)
    })
  })

  it('deve abrir o modal Lightbox de imagens, navegar entre fotos e fechar corretamente', async () => {
    renderReservationPage()

    expect(await screen.findByTestId('hotel-title')).toBeInTheDocument()

    // Clica na primeira foto da galeria
    const firstPhoto = screen.getByTestId('gallery-image-0')
    fireEvent.click(firstPhoto)

    // Modal deve estar visível
    const dialog = screen.getByRole('dialog', { name: /visualizador de fotos/i })
    expect(dialog).toBeInTheDocument()
    expect(screen.getByTestId('lightbox-counter')).toHaveTextContent('1 / 3')

    // Avança para a próxima foto
    const nextBtn = screen.getByTestId('lightbox-next')
    fireEvent.click(nextBtn)
    expect(screen.getByTestId('lightbox-counter')).toHaveTextContent('2 / 3')

    // Volta para a foto anterior
    const prevBtn = screen.getByTestId('lightbox-prev')
    fireEvent.click(prevBtn)
    expect(screen.getByTestId('lightbox-counter')).toHaveTextContent('1 / 3')

    // Fecha o modal pelo botão fechar
    const closeBtn = screen.getByTestId('lightbox-close')
    fireEvent.click(closeBtn)

    expect(screen.queryByRole('dialog', { name: /visualizador de fotos/i })).not.toBeInTheDocument()
  })

  it('deve preencher o formulário do hóspede principal e submeter a pré-reserva com sucesso', async () => {
    renderReservationPage()

    expect(await screen.findByTestId('hotel-title')).toBeInTheDocument()

    // Preenche os campos obrigatórios do formulário
    const inputDocument = screen.getByTestId('input-document')
    const inputPhone = screen.getByTestId('input-phone')

    fireEvent.change(inputDocument, { target: { value: '12345678900' } })
    fireEvent.change(inputPhone, { target: { value: '11988887777' } })

    // Clica no botão de submissão
    const submitBtn = screen.getByTestId('btn-confirm-checkout')
    fireEvent.click(submitBtn)

    // Alerta de sucesso com o código da reserva deve ser exibido
    expect(await screen.findByTestId('booking-success-alert')).toBeInTheDocument()
    expect(screen.getByText(/HTR-CONFIRMED-999/i)).toBeInTheDocument()
  })

  it('deve exibir o estado vazio quando o hotel não for encontrado na API', async () => {
    vi.spyOn(reservationService, 'getHotelDetailById').mockResolvedValue(null)

    renderReservationPage('/pre-reserva/hotel-inexistente')

    expect(await screen.findByTestId('reservation-empty-state')).toBeInTheDocument()
    expect(screen.getByText('Acomodação não encontrada')).toBeInTheDocument()
    expect(
      screen.getByText('Não foi possível carregar os dados desta acomodação para a pré-reserva.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar para a página inicial/i })).toBeInTheDocument()
  })
})
