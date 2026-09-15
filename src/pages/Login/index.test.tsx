import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppThemeProvider } from '../../styles/themeProvider'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './index'

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isLogged: false,
    loading: false,
    signInWithGoogle: vi.fn(),
    loginWithEmail: vi.fn(),
    registerWithEmail: vi.fn(),
    logout: vi.fn(),
  }),
}))

describe('LoginPage', () => {
  it('deve renderizar a página de login com abas de Entrar e Criar Conta', () => {
    render(
      <AppThemeProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AppThemeProvider>,
    )

    expect(screen.getAllByText('Entrar')[0]).toBeInTheDocument()
    expect(screen.getByText('Criar Conta')).toBeInTheDocument()
  })
})
