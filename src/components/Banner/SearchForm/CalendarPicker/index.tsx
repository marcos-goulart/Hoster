import { useState } from 'react'
import {
  ApplyButton,
  CalendarContainer,
  MonthsWrapper,
  QuickActionsToolbar,
  TabsHeader,
} from './styles'
import { FLEXIBILITY_OPTIONS } from './constants'
import { useDateRangeSelection } from '../../../../hooks/useDateRangeSelection.ts'
import { MonthGrid } from './MonthGrid'
import { FlexibleSearchTab } from './FlexibleSearchTab.tsx'

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

  const {
    baseDate,
    startDate,
    endDate,
    handlePrevMonth,
    handleNextMonth,
    handleDayClick,
  } = useDateRangeSelection(entrada, saida, onChangeDates)

  const month1Year = baseDate.getFullYear()
  const month1Month = baseDate.getMonth()

  const month2Date = new Date(month1Year, month1Month + 1, 1)
  const month2Year = month2Date.getFullYear()
  const month2Month = month2Date.getMonth()

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
            <MonthGrid
              year={month1Year}
              month={month1Month}
              isFirstMonth
              startDate={startDate}
              endDate={endDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onDayClick={handleDayClick}
            />
            <MonthGrid
              year={month2Year}
              month={month2Month}
              isFirstMonth={false}
              startDate={startDate}
              endDate={endDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onDayClick={handleDayClick}
            />
          </MonthsWrapper>

          <QuickActionsToolbar>
            {FLEXIBILITY_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={flexibilidade === opt.value ? 'active' : ''}
                onClick={() => onChangeFlexibility?.(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </QuickActionsToolbar>

          <ApplyButton type="button" onClick={onApply}>
            Aplicar
          </ApplyButton>
        </>
      ) : (
        <FlexibleSearchTab
          duracaoFlexivel={duracaoFlexivel}
          incluirFimDeSemana={incluirFimDeSemana}
          mesesFlexiveis={mesesFlexiveis}
          onChangeFlexibleSearch={onChangeFlexibleSearch}
          onApply={onApply}
        />
      )}
    </CalendarContainer>
  )
}
