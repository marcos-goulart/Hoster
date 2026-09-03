import { useState } from 'react'
import { formatDateISO, parseDate } from '../utils/dateUtils'

export function useDateRangeSelection(
  entrada: string,
  saida: string,
  onChangeDates: (entrada: string, saida: string) => void,
) {
  const initialDate = parseDate(entrada) ?? new Date()
  const [baseDate, setBaseDate] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  )

  const startDate = parseDate(entrada)
  const endDate = parseDate(saida)

  const handlePrevMonth = () => {
    setBaseDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setBaseDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleDayClick = (clickedDate: Date) => {
    const clickedTime = clickedDate.getTime()
    const clickedStr = formatDateISO(clickedDate)

    const startTime = startDate ? startDate.getTime() : null
    const endTime = endDate ? endDate.getTime() : null

    if (!startTime && !endTime) {
      onChangeDates(clickedStr, '')
      return
    }

    if (startTime && !endTime) {
      if (clickedTime === startTime) {
        onChangeDates('', '')
        return
      }
      if (clickedTime > startTime) {
        onChangeDates(formatDateISO(startDate!), clickedStr)
        return
      }
      if (clickedTime < startTime) {
        onChangeDates(clickedStr, formatDateISO(startDate!))
        return
      }
    }

    if (startTime && endTime) {
      if (clickedTime === startTime) {
        onChangeDates(formatDateISO(endDate!), '')
        return
      }
      if (clickedTime === endTime) {
        onChangeDates(formatDateISO(startDate!), '')
        return
      }
      if (clickedTime < startTime) {
        onChangeDates(clickedStr, formatDateISO(endDate!))
        return
      }
      if (clickedTime > endTime) {
        onChangeDates(formatDateISO(startDate!), clickedStr)
        return
      }

      const distanceToStart = Math.abs(clickedTime - startTime)
      const distanceToEnd = Math.abs(clickedTime - endTime)

      if (distanceToStart <= distanceToEnd) {
        onChangeDates(clickedStr, formatDateISO(endDate!))
      } else {
        onChangeDates(formatDateISO(startDate!), clickedStr)
      }
    }
  }

  return {
    baseDate,
    startDate,
    endDate,
    handlePrevMonth,
    handleNextMonth,
    handleDayClick,
  }
}
