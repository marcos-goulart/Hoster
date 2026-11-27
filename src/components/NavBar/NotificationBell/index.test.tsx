import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { AppThemeProvider } from '../../../styles/themeProvider'
import { BrowserRouter } from 'react-router-dom'
import { NotificationBell } from './index'
import { notificationService } from '../../../services/notificationService'
import type { NotificationItem } from '../../../types/notification'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../../services/notificationService', () => ({
  notificationService: {
    getNotifications: vi.fn(),
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn(),
    deleteNotification: vi.fn(),
    deleteAllNotifications: vi.fn(),
  },
}))

let mockIsLogged = true
let mockUser: { uid: string; email: string } | null = {
  uid: 'test-user',
  email: 'test@hoster.com',
}

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    isLogged: mockIsLogged,
    user: mockUser,
  }),
}))

describe('NotificationBell Component', () => {
  const mockNotifications: NotificationItem[] = [
    {
      id: 'notif-1',
      type: 'BOOKING_CREATED',
      title: 'Reserva criada com sucesso!',
      message: 'Conclua o pagamento em até 2 horas.',
      actionUrl: '/pagamento/booking-123',
      isRead: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min atrás
    },
    {
      id: 'notif-2',
      type: 'PROMOTION',
      title: 'Cupom de 15% OFF',
      message: 'Use BEMVINDO15 na sua próxima reserva.',
      actionUrl: '/#promocoes',
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockIsLogged = true
    mockUser = { uid: 'test-user', email: 'test@hoster.com' }
    vi.mocked(notificationService.getNotifications).mockResolvedValue({
      notifications: mockNotifications,
      unreadCount: 1,
    })
    vi.mocked(notificationService.markAsRead).mockResolvedValue({
      ...mockNotifications[0],
      isRead: true,
    })
    vi.mocked(notificationService.markAllAsRead).mockResolvedValue()
    vi.mocked(notificationService.deleteNotification).mockResolvedValue()
    vi.mocked(notificationService.deleteAllNotifications).mockResolvedValue()
  })

  const renderComponent = (props = {}) =>
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <NotificationBell {...props} />
        </BrowserRouter>
      </AppThemeProvider>,
    )

  it('deve renderizar o sino e exibir badge numérico quando houver notificações não lidas', async () => {
    renderComponent()

    const triggerBtn = screen.getByTestId('notification-bell-trigger')
    expect(triggerBtn).toBeInTheDocument()

    await waitFor(() => {
      const badge = screen.getByTestId('notification-unread-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('1')
    })
  })

  it('deve exibir badge com 9+ quando houver mais de 9 notificações não lidas', async () => {
    vi.mocked(notificationService.getNotifications).mockResolvedValue({
      notifications: mockNotifications,
      unreadCount: 15,
    })

    renderComponent()

    await waitFor(() => {
      const badge = screen.getByTestId('notification-unread-badge')
      expect(badge).toHaveTextContent('9+')
    })
  })

  it('não deve exibir badge quando não houver notificações não lidas', async () => {
    vi.mocked(notificationService.getNotifications).mockResolvedValue({
      notifications: mockNotifications,
      unreadCount: 0,
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.queryByTestId('notification-unread-badge')).not.toBeInTheDocument()
    })
  })

  it('deve abrir o popover ao clicar no sino e renderizar a lista de notificações', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('notification-unread-badge')).toBeInTheDocument()
    })

    const triggerBtn = screen.getByTestId('notification-bell-trigger')
    expect(screen.queryByTestId('notification-popover')).not.toBeInTheDocument()
    expect(screen.getByTestId('notification-bell-icon-outline')).toBeInTheDocument()
    expect(screen.queryByTestId('notification-bell-icon-filled')).not.toBeInTheDocument()

    fireEvent.click(triggerBtn)

    expect(screen.getByTestId('notification-popover')).toBeInTheDocument()
    expect(screen.getByTestId('notification-bell-icon-filled')).toBeInTheDocument()
    expect(screen.queryByTestId('notification-bell-icon-outline')).not.toBeInTheDocument()
    expect(screen.getByText('Reserva criada com sucesso!')).toBeInTheDocument()
    expect(screen.getByText('Cupom de 15% OFF')).toBeInTheDocument()
    expect(screen.getByText('há 5 min')).toBeInTheDocument()
  })

  it('deve fechar o popover ao pressionar Escape ou clicar fora', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('notification-unread-badge')).toBeInTheDocument()
    })

    const triggerBtn = screen.getByTestId('notification-bell-trigger')
    fireEvent.click(triggerBtn)
    expect(screen.getByTestId('notification-popover')).toBeInTheDocument()

    // Pressiona Escape
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('notification-popover')).not.toBeInTheDocument()

    // Reabre e clica fora
    fireEvent.click(triggerBtn)
    expect(screen.getByTestId('notification-popover')).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByTestId('notification-popover')).not.toBeInTheDocument()
  })

  it('deve marcar como lida e redirecionar para actionUrl ao clicar no item', async () => {
    const handleCloseMobileMenu = vi.fn()
    renderComponent({ onCloseMobileMenu: handleCloseMobileMenu })

    await waitFor(() => {
      expect(screen.getByTestId('notification-unread-badge')).toBeInTheDocument()
    })

    const triggerBtn = screen.getByTestId('notification-bell-trigger')
    fireEvent.click(triggerBtn)

    const itemRow = screen.getByTestId('notification-item-notif-1')
    fireEvent.click(itemRow)

    expect(notificationService.markAsRead).toHaveBeenCalledWith('notif-1')
    expect(handleCloseMobileMenu).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/pagamento/booking-123')
    expect(screen.queryByTestId('notification-popover')).not.toBeInTheDocument()
  })

  it('deve excluir notificação individual ao clicar no botão X sem propagar o clique para navegação', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('notification-unread-badge')).toBeInTheDocument()
    })

    const triggerBtn = screen.getByTestId('notification-bell-trigger')
    fireEvent.click(triggerBtn)

    const deleteBtn = screen.getByTestId('delete-notification-notif-1')
    fireEvent.click(deleteBtn)

    expect(notificationService.deleteNotification).toHaveBeenCalledWith('notif-1')
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(screen.queryByTestId('notification-item-notif-1')).not.toBeInTheDocument()
  })

  it('deve marcar todas como lidas ao clicar no botão do cabeçalho', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('notification-unread-badge')).toBeInTheDocument()
    })

    const triggerBtn = screen.getByTestId('notification-bell-trigger')
    fireEvent.click(triggerBtn)

    const markAllBtn = screen.getByTestId('mark-all-read-btn')
    fireEvent.click(markAllBtn)

    expect(notificationService.markAllAsRead).toHaveBeenCalled()
    await waitFor(() => {
      expect(screen.queryByTestId('notification-unread-badge')).not.toBeInTheDocument()
    })
  })

  it('deve limpar todas as notificações ao clicar em Limpar tudo', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('notification-unread-badge')).toBeInTheDocument()
    })

    const triggerBtn = screen.getByTestId('notification-bell-trigger')
    fireEvent.click(triggerBtn)

    const clearAllBtn = screen.getByTestId('clear-all-notifications-btn')
    fireEvent.click(clearAllBtn)

    expect(notificationService.deleteAllNotifications).toHaveBeenCalled()
    expect(screen.getByTestId('empty-notifications-state')).toBeInTheDocument()
    expect(screen.getByText('Nenhuma notificação por aqui.')).toBeInTheDocument()
  })
})
