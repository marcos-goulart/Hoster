import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppThemeProvider } from '../../styles/themeProvider'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './index'

let mockAuth = {
  isLogged: false,
  user: null as { displayName?: string; email?: string } | null,
  logout: vi.fn(),
}

// Mock do hook useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => mockAuth,
}))

// Mock do notificationService
vi.mock('../../services/notificationService', () => ({
  notificationService: {
    getNotifications: vi.fn().mockResolvedValue({
      notifications: [],
      unreadCount: 0,
    }),
    markAsRead: vi.fn().mockResolvedValue({}),
    markAllAsRead: vi.fn().mockResolvedValue(undefined),
    deleteNotification: vi.fn().mockResolvedValue(undefined),
    deleteAllNotifications: vi.fn().mockResolvedValue(undefined),
  },
}))

describe('Navbar', () => {
  it('deve abrir e fechar o menu mobile ao clicar no botão hambúrguer', () => {
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    const menuButton = screen.getByRole('button', { name: '' })
    const menu = document.querySelector('.navbar-collapse')

    expect(menu).not.toBeVisible()

    fireEvent.click(menuButton)
    expect(menu).toBeVisible()

    fireEvent.click(menuButton)
    expect(menu).not.toBeVisible()
  })

  it('deve direcionar para a Home (/) ao clicar no logo Hoster', () => {
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    const logoLink = screen.getByText('Hoster')
    expect(logoLink).toBeInTheDocument()
    expect(logoLink.getAttribute('href')).toBe('/')
  })

  it('deve exibir o botão de Login quando o usuário não estiver logado', () => {
    mockAuth = { isLogged: false, user: null, logout: vi.fn() }

    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    const loginLink = screen.getByText('Login')
    expect(loginLink).toBeInTheDocument()
    expect(screen.queryByTestId('notification-bell-container')).not.toBeInTheDocument()
  })

  it('deve exibir o sino de notificações e o menu de perfil quando o usuário estiver logado', async () => {
    mockAuth = {
      isLogged: true,
      user: { displayName: 'Marcos Goulart', email: 'marcos@teste.com' },
      logout: vi.fn(),
    }

    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    expect(screen.queryByText('Login')).not.toBeInTheDocument()
    expect(screen.getByTestId('notification-bell-container')).toBeInTheDocument()
    expect(screen.getByText('Marcos Goulart')).toBeInTheDocument()

    // Aguarda resolver ciclo de notificações
    await vi.waitFor(() => {
      expect(screen.getByTestId('notification-bell-trigger')).toBeInTheDocument()
    })
  })
})
