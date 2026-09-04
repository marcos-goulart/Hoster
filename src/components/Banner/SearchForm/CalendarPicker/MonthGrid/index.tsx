import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import {
  DayCell,
  DaysGrid,
  MonthHeader,
  MonthSection,
  WeekDaysRow,
} from './styles'
import { WEEK_DAYS } from '../constants'
import {
  formatDateISO,
  formatMonthTitle,
  getDaysInMonth,
  getFirstDayOfWeek,
} from '../../../../../utils/dateUtils'

interface MonthGridProps {
  year: number
  month: number
  isFirstMonth: boolean
  startDate: Date | null
  endDate: Date | null
  onPrevMonth: () => void
  onNextMonth: () => void
  onDayClick: (date: Date) => void
}

export function MonthGrid({
  year,
  month,
  isFirstMonth,
  startDate,
  endDate,
  onPrevMonth,
  onNextMonth,
  onDayClick,
}: MonthGridProps) {
  const totalDays = getDaysInMonth(year, month)
  const startDayOfWeek = getFirstDayOfWeek(year, month)

  const blankSlots = Array.from({ length: startDayOfWeek })
  const dayNumbers = Array.from({ length: totalDays }, (_, i) => i + 1)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <MonthSection>
      <MonthHeader>
        {isFirstMonth ? (
          <button
            type="button"
            className="navButton"
            onClick={onPrevMonth}
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
            onClick={onNextMonth}
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
                onClick={() => onDayClick(currentDate)}
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
