import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppThemeProvider } from '../../../styles/themeProvider'
import { BrowserRouter } from 'react-router-dom'
import { UserDropdownMenu } from './index'

describe('UserDropdownMenu Component', () => {
  const mockUser = {
    displayName: 'Marcos Goulart',
    email: 'marcos@hoster.com',
    photoURL: 'https://images.unsplash.com/photo-profile.jpg',
  }

  const renderComponent = (props = {}) => {
    const handleLogout = vi.fn()
    const handleCloseMobileMenu = vi.fn()

    const result = render(
      <AppThemeProvider>
        <BrowserRouter>
          <UserDropdownMenu
            user={mockUser}
            onLogout={handleLogout}
            onCloseMobileMenu={handleCloseMobileMenu}
            {...props}
          />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    return { ...result, handleLogout, handleCloseMobileMenu }
  }

  it('deve renderizar o botão do usuário com nome e avatar', () => {
    renderComponent()

    expect(screen.getByText('Marcos Goulart')).toBeInTheDocument()
    const avatar = screen.getByAltText('Marcos Goulart')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', mockUser.photoURL)
  })

  it('deve exibir as iniciais quando o usuário não tiver foto', () => {
    renderComponent({ user: { displayName: 'Marcos Goulart', photoURL: null } })

    expect(screen.getByText('MG')).toBeInTheDocument()
  })

  it('deve alternar a visibilidade do menu flutuante ao clicar no botão do perfil', () => {
    renderComponent()

    expect(screen.queryByTestId('user-dropdown-menu')).not.toBeInTheDocument()

    const triggerBtn = screen.getByRole('button', { name: /marcos goulart/i })
    fireEvent.click(triggerBtn)

    expect(screen.getByTestId('user-dropdown-menu')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /minhas viagens/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /favoritos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /minha conta/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument()

    // Clica novamente para fechar
    fireEvent.click(triggerBtn)
    expect(screen.queryByTestId('user-dropdown-menu')).not.toBeInTheDocument()
  })

  it('deve fechar o menu flutuante ao clicar fora dele', () => {
    renderComponent()

    const triggerBtn = screen.getByRole('button', { name: /marcos goulart/i })
    fireEvent.click(triggerBtn)
    expect(screen.getByTestId('user-dropdown-menu')).toBeInTheDocument()

    // Simula clique fora
    fireEvent.mouseDown(document.body)
    expect(screen.queryByTestId('user-dropdown-menu')).not.toBeInTheDocument()
  })

  it('deve chamar onLogout ao clicar em Sair', () => {
    const { handleLogout } = renderComponent()

    const triggerBtn = screen.getByRole('button', { name: /marcos goulart/i })
    fireEvent.click(triggerBtn)

    const logoutBtn = screen.getByRole('button', { name: /sair/i })
    fireEvent.click(logoutBtn)

    expect(handleLogout).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('user-dropdown-menu')).not.toBeInTheDocument()
  })
})
