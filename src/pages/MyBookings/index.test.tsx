import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, beforeAll, afterAll } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AppThemeProvider } from '../../styles/themeProvider'
import { MyBookingsPage } from './index'
import { userService } from '../../services/userService'
import type { BookingRecord } from '../../services/userService'

vi.mock('../../services/userService', () => ({
  userService: {
    getMyBookings: vi.fn(),
    cancelBooking: vi.fn(),
  },
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('MyBookingsPage Component', () => {
  const now = new Date('2026-11-16T12:00:00Z').getTime()

  beforeAll(() => {
    vi.spyOn(Date, 'now').mockReturnValue(now)
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockBookings: BookingRecord[] = [
    {
      id: 'booking-confirmed-1',
      checkIn: new Date(now + 48 * 60 * 60 * 1000).toISOString(), // Daqui a 48h (>24h)
      checkOut: new Date(now + 96 * 60 * 60 * 1000).toISOString(),
      totalPrice: 1250.0,
      status: 'CONFIRMED',
      period: 'Tarde',
      guests: 2,
      serviceFee: 120.0,
      hotel: {
        name: 'Hotel Vista Linda',
        city: 'Florianópolis',
        state: 'SC',
        address: 'Av. Beira Mar, 500',
        photos: ['https://images.unsplash.com/photo-hotel1.jpg'],
      },
      room: {
        title: 'Suíte Luxo Frente Mar',
        subtitle: 'Cama King • Vista Panorâmica',
      },
    },
    {
      id: 'booking-pending-1',
      checkIn: new Date(now + 72 * 60 * 60 * 1000).toISOString(),
      checkOut: new Date(now + 120 * 60 * 60 * 1000).toISOString(),
      totalPrice: 850.0,
      status: 'PENDING_PAYMENT',
      createdAt: new Date(now - 30 * 60 * 1000).toISOString(), // Criada há 30 min (restam 1h 30min)
      hotel: {
        name: 'Pousada Recanto Verde',
        city: 'Campos do Jordão',
        state: 'SP',
      },
      room: {
        title: 'Chalé com Lareira',
      },
    },
    {
      id: 'booking-soon-1',
      checkIn: new Date(now + 10 * 60 * 60 * 1000).toISOString(), // Daqui a 10h (<24h)
      checkOut: new Date(now + 34 * 60 * 60 * 1000).toISOString(),
      totalPrice: 400.0,
      status: 'CONFIRMED',
      hotel: {
        name: 'Hotel Urbano Express',
        city: 'São Paulo',
        state: 'SP',
      },
      room: {
        title: 'Quarto Executivo',
      },
    },
    {
      id: 'booking-cancelled-1',
      checkIn: new Date(now + 120 * 60 * 60 * 1000).toISOString(),
      checkOut: new Date(now + 160 * 60 * 60 * 1000).toISOString(),
      totalPrice: 600.0,
      status: 'CANCELLED',
      hotel: {
        name: 'Pousada Mar Azul',
        city: 'Búzios',
        state: 'RJ',
      },
    },
  ]

  const renderComponent = () =>
    render(
      <AppThemeProvider>
        <MemoryRouter>
          <MyBookingsPage />
        </MemoryRouter>
      </AppThemeProvider>,
    )

  it('deve carregar e renderizar as reservas do usuário', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)

    renderComponent()

    expect(screen.getByText(/carregando suas reservas/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Hotel Vista Linda')).toBeInTheDocument()
      expect(screen.getByText('Pousada Recanto Verde')).toBeInTheDocument()
      expect(screen.getByText('Hotel Urbano Express')).toBeInTheDocument()
      expect(screen.getByText('Pousada Mar Azul')).toBeInTheDocument()
    })
  })

  it('deve filtrar corretamente por status ao clicar nas abas', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Hotel Vista Linda')).toBeInTheDocument()
    })

    // Clica na aba Pendentes
    const pendingTab = screen.getByRole('tab', { name: /pendentes/i })
    fireEvent.click(pendingTab)

    expect(screen.getByText('Pousada Recanto Verde')).toBeInTheDocument()
    expect(screen.queryByText('Hotel Vista Linda')).not.toBeInTheDocument()
    expect(screen.queryByText('Pousada Mar Azul')).not.toBeInTheDocument()

    // Clica na aba Canceladas
    const cancelledTab = screen.getByRole('tab', { name: /canceladas/i })
    fireEvent.click(cancelledTab)

    expect(screen.getByText('Pousada Mar Azul')).toBeInTheDocument()
    expect(screen.queryByText('Pousada Recanto Verde')).not.toBeInTheDocument()

    // Clica na aba Confirmadas
    const confirmedTab = screen.getByRole('tab', { name: /confirmadas/i })
    fireEvent.click(confirmedTab)

    expect(screen.getByText('Hotel Vista Linda')).toBeInTheDocument()
    expect(screen.getByText('Hotel Urbano Express')).toBeInTheDocument()
  })

  it('deve exibir o aviso de prazo restante e botão de pagamento para reservas PENDING_PAYMENT', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Pousada Recanto Verde')).toBeInTheDocument()
    })

    // Como criada há 30 minutos, restam 1h 30min
    expect(screen.getByText(/1h 30min restantes para pagar/i)).toBeInTheDocument()

    const payButton = screen.getByRole('link', { name: /concluir pagamento/i })
    expect(payButton).toBeInTheDocument()
    expect(payButton).toHaveAttribute('href', '/pagamento/booking-pending-1')
  })

  it('deve bloquear botão de cancelamento e exibir aviso informativo quando faltarem < 24h para o check-in', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Hotel Urbano Express')).toBeInTheDocument()
    })

    const cardSoon = screen.getByTestId('booking-card-booking-soon-1')
    expect(cardSoon).toHaveTextContent(/menos de 24h para o check-in/i)
    expect(cardSoon.querySelector('.btn-cancel')).toBeNull()
  })

  it('deve abrir o modal de voucher com detalhes ao clicar em Ver Voucher', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Hotel Vista Linda')).toBeInTheDocument()
    })

    const cardConfirmed = screen.getByTestId('booking-card-booking-confirmed-1')
    const voucherBtn = cardConfirmed.querySelector('.btn-voucher')!
    fireEvent.click(voucherBtn)

    // Modal de Voucher aberto
    expect(screen.getByRole('heading', { name: 'Voucher da Reserva' })).toBeInTheDocument()
    expect(screen.getByText('booking-confirmed-1')).toBeInTheDocument()
    expect(screen.getByText(/Av. Beira Mar, 500/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Suíte Luxo Frente Mar/i).length).toBeGreaterThanOrEqual(2)

    // Fecha o modal
    const closeBtn = screen.getByRole('button', { name: /fechar detalhes da reserva/i })
    fireEvent.click(closeBtn)

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Voucher da Reserva' })).not.toBeInTheDocument()
    })
  })

  it('deve executar o fluxo de cancelamento via modal com sucesso e atualizar a UI', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)
    vi.mocked(userService.cancelBooking).mockResolvedValue({
      ...mockBookings[0],
      status: 'CANCELLED',
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Hotel Vista Linda')).toBeInTheDocument()
    })

    const cardConfirmed = screen.getByTestId('booking-card-booking-confirmed-1')
    const cancelBtn = cardConfirmed.querySelector('.btn-cancel')!
    fireEvent.click(cancelBtn)

    // Modal de confirmação aberto
    expect(screen.getByText(/confirmar cancelamento/i)).toBeInTheDocument()
    expect(screen.getByText(/tem certeza que deseja cancelar sua reserva no/i)).toBeInTheDocument()

    // Confirma cancelamento
    const confirmModalBtn = screen.getByRole('button', { name: /sim, cancelar/i })
    fireEvent.click(confirmModalBtn)

    await waitFor(() => {
      expect(userService.cancelBooking).toHaveBeenCalledWith('booking-confirmed-1')
    })

    // Status deve ter mudado para Cancelada na UI
    await waitFor(() => {
      expect(cardConfirmed).toHaveTextContent(/cancelada/i)
    })
  })

  it('deve alternar filtros e fechar menu ao selecionar opção pelo dropdown mobile', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Hotel Vista Linda')).toBeInTheDocument()
    })

    const mobileTrigger = screen.getByRole('button', {
      name: /abrir seletor de filtros de viagens/i,
      hidden: true,
    })
    expect(mobileTrigger).toHaveTextContent(/todas \(4\)/i)

    // Abre o dropdown
    fireEvent.click(mobileTrigger)
    const dropdownMenu = screen.getByRole('listbox', {
      name: /opções de filtros de viagens/i,
      hidden: true,
    })
    expect(dropdownMenu).toBeInTheDocument()

    // Seleciona a opção "Pendentes"
    const pendingOption = screen.getByRole('option', { name: /pendentes 1/i, hidden: true })
    fireEvent.click(pendingOption)

    // Dropdown deve fechar automaticamente
    expect(
      screen.queryByRole('listbox', { name: /opções de filtros de viagens/i, hidden: true }),
    ).not.toBeInTheDocument()

    // Filtro ativo atualizado
    expect(mobileTrigger).toHaveTextContent(/pendentes \(1\)/i)
    expect(screen.getByText('Pousada Recanto Verde')).toBeInTheDocument()
    expect(screen.queryByText('Hotel Vista Linda')).not.toBeInTheDocument()
  })

  it('deve bloquear o scroll do body ao abrir o BookingDetailsModal e restaurar ao fechar', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Hotel Vista Linda')).toBeInTheDocument()
    })

    expect(document.body.style.overflow).toBe('')

    // Abre o modal de voucher
    const cardConfirmed = screen.getByTestId('booking-card-booking-confirmed-1')
    const voucherBtn = cardConfirmed.querySelector('.btn-voucher')!
    fireEvent.click(voucherBtn)

    expect(document.body.style.overflow).toBe('hidden')

    // Fecha o modal
    const closeBtn = screen.getByRole('button', { name: /fechar detalhes da reserva/i })
    fireEvent.click(closeBtn)

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('')
    })
  })

  it('deve exibir a barra de progresso de scroll no modal de voucher e atualizar com a rolagem', async () => {
    vi.mocked(userService.getMyBookings).mockResolvedValue(mockBookings)

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Hotel Vista Linda')).toBeInTheDocument()
    })

    const cardConfirmed = screen.getByTestId('booking-card-booking-confirmed-1')
    const voucherBtn = cardConfirmed.querySelector('.btn-voucher')!
    fireEvent.click(voucherBtn)

    const progressBar = screen.getByTestId('voucher-scroll-progress')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveStyle({ width: '0%' })

    const modalBody = screen.getByText('Código da Reserva').closest('[data-lenis-prevent]')!

    // Simula scroll no modal: maxScroll = 1000 - 500 = 500; scrollTop = 250 -> 50%
    Object.defineProperty(modalBody, 'scrollHeight', { value: 1000, configurable: true })
    Object.defineProperty(modalBody, 'clientHeight', { value: 500, configurable: true })
    Object.defineProperty(modalBody, 'scrollTop', { value: 250, configurable: true })

    fireEvent.scroll(modalBody)

    expect(progressBar).toHaveStyle({ width: '50%' })
  })
})
