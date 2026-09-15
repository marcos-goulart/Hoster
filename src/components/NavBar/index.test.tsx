import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppThemeProvider } from '../../styles/themeProvider'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './index'

describe('Navbar', () => {
  it('deve abrir e fechar o menu ao clicar no botão', () => {
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    const menuButton = screen.getByRole('button')
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

  it('deve direcionar para o Login (/login) ao clicar no botão Login', () => {
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    const loginLink = screen.getByText('Login')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink.getAttribute('href')).toBe('/login')
  })

  it('deve exibir Acomodações, Promoções e Diferenciais na home (/)', () => {
    window.history.pushState({}, 'Home', '/')
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    expect(screen.getByText('Acomodações')).toBeInTheDocument()
    expect(screen.getByText('Promoções')).toBeInTheDocument()
    expect(screen.getByText('Diferenciais')).toBeInTheDocument()
  })

  it('não deve exibir Acomodações, Promoções e Diferenciais em páginas que não sejam a home', () => {
    window.history.pushState({}, 'Search Result', '/resultado')
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    expect(screen.queryByText('Acomodações')).not.toBeInTheDocument()
    expect(screen.queryByText('Promoções')).not.toBeInTheDocument()
    expect(screen.queryByText('Diferenciais')).not.toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
