import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppThemeProvider } from '../../styles/themeProvider'
import ReservationPage from './index'
import type { HotelDetail } from '../../interfaces/Reservation'
import * as reservationService from '../../services/reservationMock'

const mockHotelDetail: HotelDetail = {
  id: 'hotel-paris-germany',
  name: 'Hotel Paris Germany',
  location: 'Praia dos Milionários, Ilhéus - BA',
  address: 'Av. Beira Mar, 450 - Praia dos Milionários, Ilhéus - BA',
  price: 800,
  image: 'https://example.com/photo1.jpg',
  photos: [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
    'https://example.com/photo3.jpg',
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
      subtitle: '32m² • Vista para o jardim • Ar-condicionado',
      pricePerNight: 800,
      size: '32m²',
      bedType: '1 Cama King',
      tags: ['1 Cama King', 'Café incluso'],
      isAvailable: true,
    },
    {
      id: 'suite-executiva-mar',
      title: 'Suíte Executiva Vista Mar',
      subtitle: '48m² • Varanda privativa • Hidromassagem',
      pricePerNight: 1050,
      size: '48m²',
      bedType: '1 Cama King',
      tags: ['1 Cama King', 'Frente para o Mar'],
      isAvailable: true,
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      userName: 'Mariana Gonçalves',
      avatarInitials: 'MG',
      stayDate: 'Hospedou-se em Agosto de 2026',
      rating: 5,
      comment: 'Excelente localização e atendimento impecável.',
    },
  ],
  mapEmbedUrl: 'https://maps.google.com/maps?q=Ilheus&output=embed',
  ratingScore: 4.9,
  reviewCount: 128,
}

describe('ReservationPage - Detalhes e Pré-Reserva', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(reservationService, 'getHotelDetailById').mockResolvedValue(mockHotelDetail)
    vi.spyOn(reservationService, 'createBooking').mockResolvedValue({
      success: true,
      bookingId: 'HTR-TEST-1234',
      message: 'Pré-reserva confirmada com sucesso! Prossiga com o pagamento.',
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
        createdAt: '2026-09-18T00:00:00.000Z',
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

  it('deve renderizar as informações completas do hotel (nome, comodidades, localização e avaliações)', async () => {
    renderReservationPage()

    // Aguarda o carregamento das informações do hotel
    expect(await screen.findByTestId('hotel-title')).toHaveTextContent('Hotel Paris Germany')
    expect(screen.getByTestId('hotel-address')).toHaveTextContent(
      'Av. Beira Mar, 450 - Praia dos Milionários, Ilhéus - BA',
    )
    expect(screen.getByTestId('hotel-rating-badge')).toHaveTextContent('4.9 (128 avaliações)')

    // Comodidades
    expect(screen.getByText('Wi-Fi de alta velocidade')).toBeInTheDocument()
    expect(screen.getByText('Café da manhã incluso')).toBeInTheDocument()
    expect(screen.getByText('Piscina externa')).toBeInTheDocument()
    expect(screen.getByText('Estacionamento gratuito')).toBeInTheDocument()

    // Quartos disponíveis
    expect(screen.getByText('Suíte Standard King')).toBeInTheDocument()
    expect(screen.getByText('Suíte Executiva Vista Mar')).toBeInTheDocument()

    // Avaliação do hóspede
    expect(screen.getByText('Mariana Gonçalves')).toBeInTheDocument()
    expect(screen.getByText('"Excelente localização e atendimento impecável."')).toBeInTheDocument()
  })

  it('deve recalcular os valores da diária e total da reserva ao alterar a seleção do quarto', async () => {
    renderReservationPage()

    expect(await screen.findByTestId('hotel-title')).toBeInTheDocument()

    // Quarto padrão inicial: Suíte Standard King (R$ 800 x 3 noites = R$ 2.400 + R$ 120 taxa = R$ 2.520)
    const initialPrice = screen.getByTestId('checkout-daily-price')
    expect(initialPrice).toHaveTextContent(/800/i)

    const initialTotal = screen.getByTestId('summary-grand-total')
    expect(initialTotal).toHaveTextContent(/2\.520/i)

    // Seleciona o quarto Suíte Executiva Vista Mar (R$ 1.050)
    const executivaRadio = screen.getByTestId('room-radio-suite-executiva-mar')
    fireEvent.click(executivaRadio)

    // O valor no card sticky deve recalcular para R$ 1.050 / noite
    // Total: 1050 * 3 = 3.150 + 120 = 3.270
    await waitFor(() => {
      expect(screen.getByTestId('checkout-daily-price')).toHaveTextContent(/1\.050/i)
      expect(screen.getByTestId('summary-room-total')).toHaveTextContent(/3\.150/i)
      expect(screen.getByTestId('summary-grand-total')).toHaveTextContent(/3\.270/i)
    })
  })

  it('deve abrir o modal Lightbox ao clicar na foto da galeria e fechar ao clicar no botão de fechar', async () => {
    renderReservationPage()

    expect(await screen.findByTestId('hotel-title')).toBeInTheDocument()

    // Clica na primeira imagem da galeria
    const firstImage = screen.getByTestId('gallery-image-0')
    fireEvent.click(firstImage)

    // Lightbox modal deve estar aberto e visível
    const modalDialog = screen.getByRole('dialog', { name: /visualizador de fotos/i })
    expect(modalDialog).toBeInTheDocument()
    expect(screen.getByTestId('lightbox-counter')).toHaveTextContent('1 / 3')

    // Clica no botão de próxima foto
    const nextBtn = screen.getByTestId('lightbox-next')
    fireEvent.click(nextBtn)
    expect(screen.getByTestId('lightbox-counter')).toHaveTextContent('2 / 3')

    // Clica para fechar o Lightbox
    const closeBtn = screen.getByTestId('lightbox-close')
    fireEvent.click(closeBtn)

    // O modal deve ser fechado (não estar mais presente)
    expect(screen.queryByRole('dialog', { name: /visualizador de fotos/i })).not.toBeInTheDocument()
  })

  it('deve preencher os dados do hóspede e confirmar a pré-reserva com sucesso', async () => {
    renderReservationPage()

    expect(await screen.findByTestId('hotel-title')).toBeInTheDocument()

    // Preenche campos do formulário
    const inputDocument = screen.getByTestId('input-document')
    const inputPhone = screen.getByTestId('input-phone')

    fireEvent.change(inputDocument, { target: { value: '123.456.789-00' } })
    fireEvent.change(inputPhone, { target: { value: '(11) 98888-7777' } })

    // Clica no botão de confirmar reserva
    const submitBtn = screen.getByTestId('btn-confirm-checkout')
    fireEvent.click(submitBtn)

    // Deve exibir o alerta com o código da reserva confirmado
    expect(await screen.findByTestId('booking-success-alert')).toBeInTheDocument()
    expect(screen.getByText(/HTR-TEST-1234/i)).toBeInTheDocument()
  })

  it('deve exibir mensagem de estado vazio quando o hotel não for encontrado', async () => {
    vi.spyOn(reservationService, 'getHotelDetailById').mockResolvedValue(null)

    renderReservationPage('/pre-reserva/hotel-inexistente')

    expect(await screen.findByTestId('reservation-empty-state')).toBeInTheDocument()
    expect(screen.getByText('Acomodação não encontrada')).toBeInTheDocument()
  })
})
