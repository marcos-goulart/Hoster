import { FaCalendarAlt } from 'react-icons/fa'
import {
  ApplyButton,
  CheckboxLabel,
  Divider,
  DurationPill,
  FlexibleSection,
  FlexibleSectionTitle,
  FlexibleSubtitle,
  FlexibleTabContainer,
  MonthCard,
  MonthCardsGrid,
  PillsRow,
} from './styles'
import { AVAILABLE_MONTHS, DURATION_OPTIONS } from '../constants'

interface FlexibleSearchTabProps {
  duracaoFlexivel?: string
  incluirFimDeSemana?: boolean
  mesesFlexiveis?: string[]
  onChangeFlexibleSearch?: (duracao: string, incluirFimDeSemana: boolean, meses: string[]) => void
  onApply?: () => void
}

export function FlexibleSearchTab({
  duracaoFlexivel = '1',
  incluirFimDeSemana = false,
  mesesFlexiveis = [],
  onChangeFlexibleSearch,
  onApply,
}: FlexibleSearchTabProps) {
  const handleSelectDuration = (durationId: string) => {
    onChangeFlexibleSearch?.(durationId, incluirFimDeSemana, mesesFlexiveis)
  }

  const handleToggleWeekend = (checked: boolean) => {
    onChangeFlexibleSearch?.(duracaoFlexivel, checked, mesesFlexiveis)
  }

  const handleToggleMonth = (monthLabel: string) => {
    const newMonths = mesesFlexiveis.includes(monthLabel)
      ? mesesFlexiveis.filter((m) => m !== monthLabel)
      : [...mesesFlexiveis, monthLabel]

    onChangeFlexibleSearch?.(duracaoFlexivel, incluirFimDeSemana, newMonths)
  }

  return (
    <FlexibleTabContainer>
      <FlexibleSection>
        <FlexibleSectionTitle>Quanto tempo você deseja ficar?</FlexibleSectionTitle>
        <PillsRow>
          {DURATION_OPTIONS.map((opt) => (
            <DurationPill
              key={opt.id}
              type="button"
              className={duracaoFlexivel === opt.id ? 'active' : ''}
              onClick={() => handleSelectDuration(opt.id)}
            >
              {opt.label}
            </DurationPill>
          ))}
        </PillsRow>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={incluirFimDeSemana}
            onChange={(e) => handleToggleWeekend(e.target.checked)}
          />
          Deve incluir fim de semana
        </CheckboxLabel>
      </FlexibleSection>

      <Divider />

      <FlexibleSection>
        <FlexibleSectionTitle>Quando você deseja viajar?</FlexibleSectionTitle>
        <FlexibleSubtitle>Você pode selecionar mais de um mês.</FlexibleSubtitle>
        <MonthCardsGrid>
          {AVAILABLE_MONTHS.map((item) => {
            const label = `${item.month} ${item.year}`
            const isActive = mesesFlexiveis.includes(label)
            return (
              <MonthCard
                key={label}
                type="button"
                className={isActive ? 'active' : ''}
                onClick={() => handleToggleMonth(label)}
              >
                <FaCalendarAlt aria-hidden="true" />
                <strong>{item.month}</strong>
                <small>{item.year}</small>
              </MonthCard>
            )
          })}
        </MonthCardsGrid>
        <ApplyButton type="button" onClick={onApply}>
          Aplicar
        </ApplyButton>
      </FlexibleSection>
    </FlexibleTabContainer>
  )
}
