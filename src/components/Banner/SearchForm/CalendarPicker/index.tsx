import { useState } from 'react'
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import {
  ApplyButton,
  CalendarContainer,
  CheckboxLabel,
  DayCell,
  DaysGrid,
  Divider,
  DurationPill,
  FlexibleSection,
  FlexibleSectionTitle,
  FlexibleSubtitle,
  FlexibleTabContainer,
  MonthCard,
  MonthCardsGrid,
  MonthHeader,
  MonthSection,
  MonthsWrapper,
  PillsRow,
  QuickActionsToolbar,
  TabsHeader,
  WeekDaysRow,
} from './styles'
import { AVAILABLE_MONTHS, DURATION_OPTIONS, FLEXIBILITY_OPTIONS } from './constants'

const WEEK_DAYS = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.']
export interface CalendarPickerProps {
  entrada: string
  saida: string
  flexibilidade?: number
  duracaoFlexivel?: string
  incluirFimDeSemana?: boolean
  mesesFlexiveis?: string[]
  onChangeDates: (entrada: string, saida: string) => void
  onChangeFlexibility?: (days: number) => void
  onChangeFlexibleSearch?: (duracao: string, incluirFimDeSemana: boolean, meses: string[]) => void
  onApply?: () => void
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null
  const [year, month, day] = dateStr.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

function formatDateISO(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatMonthTitle(year: number, month: number): string {
  const date = new Date(year, month, 1)
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function CalendarPicker({
  entrada,
  saida,
  flexibilidade = 0,
  duracaoFlexivel = '1',
  incluirFimDeSemana = false,
  mesesFlexiveis = [],
  onChangeDates,
  onChangeFlexibility,
  onChangeFlexibleSearch,
  onApply,
}: CalendarPickerProps) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'flexible'>('calendar')
  const initialDate = parseDate(entrada) ?? new Date()
  const [baseDate, setBaseDate] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  )

  const startDate = parseDate(entrada)
  const endDate = parseDate(saida)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const month1Year = baseDate.getFullYear()
  const month1Month = baseDate.getMonth()

  const month2Date = new Date(month1Year, month1Month + 1, 1)
  const month2Year = month2Date.getFullYear()
  const month2Month = month2Date.getMonth()

  const handlePrevMonth = () => {
    setBaseDate(new Date(month1Year, month1Month - 1, 1))
  }

  const handleNextMonth = () => {
    setBaseDate(new Date(month1Year, month1Month + 1, 1))
  }

  const handleDayClick = (clickedDate: Date) => {
    const clickedTime = clickedDate.getTime()
    const clickedStr = formatDateISO(clickedDate)

    const startTime = startDate ? startDate.getTime() : null
    const endTime = endDate ? endDate.getTime() : null

    // CASO 1: Nenhuma data selecionada ainda -> Define Entrada
    if (!startTime && !endTime) {
      onChangeDates(clickedStr, '')
      return
    }

    // CASO 2: Apenas UMA data selecionada (Entrada)
    if (startTime && !endTime) {
      // 2.1 Clicou na MESMA data -> Limpa tudo (deixa seleção vazia)
      if (clickedTime === startTime) {
        onChangeDates('', '')
        return
      }

      // 2.2 Clicou em uma data POSTERIOR -> Define Saída
      if (clickedTime > startTime) {
        onChangeDates(formatDateISO(startDate!), clickedStr)
        return
      }

      // 2.3 Clicou em uma data ANTERIOR -> Nova data vira Entrada e a antiga vira Saída
      if (clickedTime < startTime) {
        onChangeDates(clickedStr, formatDateISO(startDate!))
        return
      }
    }

    // CASO 3: AMBAS as datas selecionadas (Entrada e Saída)
    if (startTime && endTime) {
      // 3.1 Clicou exatamente na Entrada -> Remove a Entrada, mantendo a Saída como nova Entrada
      if (clickedTime === startTime) {
        onChangeDates(formatDateISO(endDate!), '')
        return
      }

      // 3.2 Clicou exatamente na Saída -> Remove a Saída, mantendo a Entrada
      if (clickedTime === endTime) {
        onChangeDates(formatDateISO(startDate!), '')
        return
      }

      // 3.3 Clicou antes da Entrada -> Nova data vira Entrada, mantendo a Saída
      if (clickedTime < startTime) {
        onChangeDates(clickedStr, formatDateISO(endDate!))
        return
      }

      // 3.4 Clicou depois da Saída -> Mantém a Entrada, nova data vira Saída
      if (clickedTime > endTime) {
        onChangeDates(formatDateISO(startDate!), clickedStr)
        return
      }

      // 3.5 Clicou DENTRO do intervalo -> Ajusta o limite mais próximo
      const distanceToStart = Math.abs(clickedTime - startTime)
      const distanceToEnd = Math.abs(clickedTime - endTime)

      if (distanceToStart <= distanceToEnd) {
        onChangeDates(clickedStr, formatDateISO(endDate!))
      } else {
        onChangeDates(formatDateISO(startDate!), clickedStr)
      }
    }
  }

  const handleSelectDuration = (durationId: string) => {
    onChangeFlexibleSearch?.(durationId, incluirFimDeSemana, mesesFlexiveis)
  }

  const handleToggleWeekend = (checked: boolean) => {
    onChangeFlexibleSearch?.(duracaoFlexivel, checked, mesesFlexiveis)
  }

  const handleToggleMonth = (monthLabel: string) => {
    let newMonths: string[]
    if (mesesFlexiveis.includes(monthLabel)) {
      newMonths = mesesFlexiveis.filter((m) => m !== monthLabel)
    } else {
      newMonths = [...mesesFlexiveis, monthLabel]
    }
    onChangeFlexibleSearch?.(duracaoFlexivel, incluirFimDeSemana, newMonths)
  }

  const renderMonthGrid = (year: number, month: number, isFirstMonth: boolean) => {
    const totalDays = getDaysInMonth(year, month)
    const startDayOfWeek = getFirstDayOfWeek(year, month)

    const blankSlots = Array.from({ length: startDayOfWeek })
    const dayNumbers = Array.from({ length: totalDays }, (_, i) => i + 1)

    return (
      <MonthSection>
        <MonthHeader>
          {isFirstMonth ? (
            <button
              type="button"
              className="navButton"
              onClick={handlePrevMonth}
              aria-label="Mês anterior"
            >
              <FaChevronLeft size={12} />
            </button>
          ) : (
            <div style={{ width: '2rem' }} />
          )}

          <span className="monthTitle">{formatMonthTitle(year, month)}</span>

          {!isFirstMonth ? (
            <button
              type="button"
              className="navButton"
              onClick={handleNextMonth}
              aria-label="Próximo mês"
            >
              <FaChevronRight size={12} />
            </button>
          ) : (
            <div style={{ width: '2rem' }} />
          )}
        </MonthHeader>

        <WeekDaysRow>
          {WEEK_DAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </WeekDaysRow>

        <DaysGrid>
          {blankSlots.map((_, idx) => (
            <DayCell key={`blank-${year}-${month}-${idx}`} $isEmpty />
          ))}

          {dayNumbers.map((dayNum) => {
            const currentDate = new Date(year, month, dayNum)
            currentDate.setHours(0, 0, 0, 0)
            const dateStr = formatDateISO(currentDate)

            const isStart = startDate ? formatDateISO(startDate) === dateStr : false
            const isEnd = endDate ? formatDateISO(endDate) === dateStr : false
            const isInRange =
              startDate && endDate && currentDate > startDate && currentDate < endDate
            const isPast = currentDate < today
            const isToday = currentDate.getTime() === today.getTime()

            return (
              <DayCell
                key={dateStr}
                $isSelectedStart={isStart}
                $isSelectedEnd={isEnd}
                $isInRange={Boolean(isInRange)}
                $isDisabled={isPast}
                $isToday={isToday}
              >
                <button
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDayClick(currentDate)}
                >
                  {dayNum}
                </button>
              </DayCell>
            )
          })}
        </DaysGrid>
      </MonthSection>
    )
  }

  return (
    <CalendarContainer>
      <TabsHeader>
        <button
          type="button"
          className={activeTab === 'calendar' ? 'active' : ''}
          onClick={() => setActiveTab('calendar')}
        >
          Calendário
        </button>
        <button
          type="button"
          className={activeTab === 'flexible' ? 'active' : ''}
          onClick={() => setActiveTab('flexible')}
        >
          Datas flexíveis
        </button>
      </TabsHeader>

      {activeTab === 'calendar' ? (
        <>
          <MonthsWrapper>
            {renderMonthGrid(month1Year, month1Month, true)}
            {renderMonthGrid(month2Year, month2Month, false)}
          </MonthsWrapper>

          <QuickActionsToolbar>
            {FLEXIBILITY_OPTIONS.map((opt) => {
              const isActive = flexibilidade === opt.value
              return (
                <button
                  key={opt.label}
                  type="button"
                  className={isActive ? 'active' : ''}
                  onClick={() => onChangeFlexibility?.(opt.value)}
                >
                  {opt.label}
                </button>
              );
            })}
          </QuickActionsToolbar>
          <ApplyButton type="button" onClick={onApply}>
            Aplicar
          </ApplyButton>
        </>
      ) : (
        <FlexibleTabContainer>
          <FlexibleSection>
            <FlexibleSectionTitle>Quanto tempo você deseja ficar?</FlexibleSectionTitle>
            <PillsRow>
              {DURATION_OPTIONS.map((opt) => {
                const isActive = duracaoFlexivel === opt.id
                return (
                  <DurationPill
                    key={opt.id}
                    type="button"
                    className={isActive ? 'active' : ''}
                    onClick={() => handleSelectDuration(opt.id)}
                  >
                    {opt.label}
                  </DurationPill>
                )
              })}
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
      )}
    </CalendarContainer>
  )
}
