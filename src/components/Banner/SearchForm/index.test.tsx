import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { AppThemeProvider } from '../../../styles/themeProvider'
import { BrowserRouter } from 'react-router-dom'
import { SearchForm } from './index'
import { PageLoadingProvider } from '../../../context/PageLoadingProvider'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('SearchForm', () => {
  const originalImage = window.Image

  beforeEach(() => {
  mockNavigate.mockClear()

  // Define um Mock Object que respeita a tipagem global de Image sem quebrar o JSDOM
  const MockImage = function (this: HTMLImageElement) {
    let _src = ''

    Object.defineProperty(this, 'src', {
      get() {
        return _src
      },
      set(val: string) {
        _src = val
        setTimeout(() => {
          if (this.onload) this.onload(new Event('load'))
        }, 10)
      },
      configurable: true,
      enumerable: true,
    })

    this.onload = () => {}
    this.onerror = () => {}
  }

  // Atribuição tipada sem avisos de ESLint e sem quebrar o construtor do JSDOM
  window.Image = MockImage as unknown as typeof Image
})

  afterEach(() => {
    window.Image = originalImage
  })

  const renderComponent = () => {
    return render(
      <AppThemeProvider>
        <BrowserRouter>
          <PageLoadingProvider>
            <SearchForm />
          </PageLoadingProvider>
        </BrowserRouter>
      </AppThemeProvider>
    )
  }

  it('deve renderizar todos os campos essenciais do formulário', () => {
    renderComponent()

    expect(screen.getByLabelText('Digite o destino')).toBeInTheDocument()
    expect(screen.getByText('Datas')).toBeInTheDocument()
    expect(screen.getByLabelText('Periodo')).toBeInTheDocument()
    expect(screen.getByText('Viajantes')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /pesquisar/i })).toBeInTheDocument()
  })

  it('deve atualizar o valor do input de destino ao digitar', () => {
    renderComponent()

    const destinationInput = screen.getByLabelText('Digite o destino') as HTMLInputElement
    fireEvent.change(destinationInput, { target: { value: 'Rio de Janeiro' } })

    expect(destinationInput.value).toBe('Rio de Janeiro')
  })

  it('deve atualizar o valor do select de período ao selecionar uma opção', () => {
    renderComponent()

    const periodSelect = screen.getByLabelText('Periodo') as HTMLSelectElement
    fireEvent.change(periodSelect, { target: { value: 'tarde' } })

    expect(periodSelect.value).toBe('tarde')
  })

  it('deve pesquisar corretamente com os dados preenchidos', async () => {
    renderComponent()

    // 1. Preencher destino
    const destinationInput = screen.getByLabelText('Digite o destino')
    fireEvent.change(destinationInput, { target: { value: 'Rio de Janeiro' } })

    // 2. Selecionar período
    const periodSelect = screen.getByLabelText('Periodo')
    fireEvent.change(periodSelect, { target: { value: 'tarde' } })

    // 3. Preencher viajantes
    const travelersButton = screen.getByText('Selecione os viajantes')
    fireEvent.click(travelersButton)

    // Clicar no botão "+" para adicionar adultos (primeiro botão "+" no painel)
    const plusButtons = screen.getAllByText('+')
    fireEvent.click(plusButtons[0]) // Incrementa de 0 para 1
    fireEvent.click(plusButtons[0]) // Incrementa de 1 para 2

    // Fechar o painel clicando no botão OK
    const okButton = screen.getByRole('button', { name: 'OK' })
    fireEvent.click(okButton)

    // 4. Submeter formulário
    const submitButton = screen.getByRole('button', { name: /pesquisar/i })
    fireEvent.click(submitButton)

    // Verificar se o redirecionamento foi chamado com os parâmetros
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled()
    })
    const calledUrl = mockNavigate.mock.calls[0][0]
    expect(calledUrl).toContain('/resultado')
    expect(calledUrl).toContain('localizacao=Rio+de+Janeiro')
    expect(calledUrl).toContain('periodo=tarde')
    expect(calledUrl).toContain('adultos=2')
  })

  it('deve exibir mensagem de erro e não pesquisar se a localização estiver vazia', () => {
    renderComponent()

    const submitButton = screen.getByRole('button', { name: /pesquisar/i })
    fireEvent.click(submitButton)

    // Deve exibir a mensagem de erro
    expect(screen.getByPlaceholderText('Por favor, insira um destino')).toBeInTheDocument()

    // Não deve disparar a navegaçãoq
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
