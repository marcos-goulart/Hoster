import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DEFAULT_FILTER_STATE } from '../../interfaces/FilterState'
import { AppThemeProvider } from '../../styles/themeProvider'
import { FilterComponent } from './index'

describe('FilterComponent', () => {
  const renderComponent = (onApplyFilters = vi.fn()) => {
    return render(
      <AppThemeProvider>
        <FilterComponent
          appliedFilters={DEFAULT_FILTER_STATE}
          onApplyFilters={onApplyFilters}
          totalResults={12}
        />
      </AppThemeProvider>
    )
  }

  it('deve renderizar os blocos de filtro e o botão de toggle mobile', () => {
    renderComponent()

    expect(screen.getByRole('button', { name: /alternar painel de filtros/i })).toBeInTheDocument()
    expect(screen.getByText('Promoções')).toBeInTheDocument()
    expect(screen.getByText('Preço')).toBeInTheDocument()
    expect(screen.getByText('Tipo de Acomodação')).toBeInTheDocument()
    expect(screen.getByText('Serviços')).toBeInTheDocument()
  })

  it('não deve disparar onApplyFilters ao marcar checkbox antes de clicar em Aplicar Filtros', () => {
    const handleApply = vi.fn()
    renderComponent(handleApply)

    const cancelamentoCheckbox = screen.getByLabelText('Cancelamento grátis')
    fireEvent.click(cancelamentoCheckbox)

    // O callback de aplicação NÃO deve ter sido chamado ainda
    expect(handleApply).not.toHaveBeenCalled()

    // Clicar em Aplicar Filtros
    const applyButton = screen.getByRole('button', { name: /aplicar filtros/i })
    fireEvent.click(applyButton)

    // Agora sim deve ter sido chamado com a promoção incluída no rascunho
    expect(handleApply).toHaveBeenCalledTimes(1)
    expect(handleApply.mock.calls[0][0].promotions).toContain('cancelamento')
  })

  it('deve alternar a visibilidade da sanfona mobile ao clicar no botão de filtros', () => {
    renderComponent()

    const mobileToggle = screen.getByRole('button', { name: /alternar painel de filtros/i })
    expect(mobileToggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(mobileToggle)
    expect(mobileToggle).toHaveAttribute('aria-expanded', 'true')
  })
})
