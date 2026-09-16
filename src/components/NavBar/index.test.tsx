import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppThemeProvider } from '../../styles/themeProvider'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './index'

// Mock do hook useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isLogged: false,
    user: null,
    logout: vi.fn(),
  }),
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
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    const loginLink = screen.getByText('Login')
    expect(loginLink).toBeInTheDocument()
  })
})
