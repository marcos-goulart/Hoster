import { useState } from 'react'
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import {
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

const DURATION_OPTIONS = [
  { id: '1', label: '1 diária' },
  { id: '2-3', label: '2 a 3 diárias' },
  { id: '4-5', label: '4 a 5 diárias' },
  { id: '6-7', label: '6 a 7 diárias' },
]

const AVAILABLE_MONTHS = [
  { month: 'Agosto', year: '2026' },
  { month: 'Setembro', year: '2026' },
  { month: 'Outubro', year: '2026' },
  { month: 'Novembro', year: '2026' },
  { month: 'Dezembro', year: '2026' },
  { month: 'Janeiro', year: '2027' },
]

export function CalendarPicker({
  entrada,
  saida,
  flexibilidade = 0,
  duracaoFlexivel = '1',
  incluirFimDeSemana = false,
  mesesFlexiveis = ['Agosto 2026'],
  onChangeDates,
  onChangeFlexibility,
  onChangeFlexibleSearch,
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

  const handleDayClick = (date: Date) => {
    const clickedStr = formatDateISO(date)

    if (!startDate || (startDate && endDate)) {
      onChangeDates(clickedStr, '')
      return
    }

    if (startDate && !endDate) {
      if (date >= startDate) {
        onChangeDates(formatDateISO(startDate), clickedStr)
      } else {
        onChangeDates(clickedStr, '')
      }
    }
  }

  const flexibilityOptions = [
    { label: 'Datas exatas', value: 0 },
    { label: '± 1 dia', value: 1 },
    { label: '± 2 dias', value: 2 },
    { label: '± 3 dias', value: 3 },
    { label: '± 7 dias', value: 7 },
  ]

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
      if (newMonths.length === 0) {
        newMonths = [monthLabel]
      }
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
            {flexibilityOptions.map((opt) => {
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
          </FlexibleSection>
        </FlexibleTabContainer>
      )}
    </CalendarContainer>
  )
}
