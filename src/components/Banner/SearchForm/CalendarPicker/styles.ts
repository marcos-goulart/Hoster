import styled from 'styled-components'

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-family: inherit;
  color: ${(props) => props.theme.colors.gray900};
  user-select: none;
`

export const TabsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  padding-bottom: 0.25rem;

  button {
    background: none;
    border: none;
    padding: 0.5rem 0.25rem;
    font-size: 0.95rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.gray700};
    cursor: pointer;
    position: relative;
    transition: color 0.15s ease-in-out;

    &.active {
      color: ${(props) => props.theme.colors.gray900};

      &::after {
        content: '';
        position: absolute;
        bottom: -0.25rem;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #0f172a;
        border-radius: 1px;
      }
    }

    &:hover:not(.active) {
      color: ${(props) => props.theme.colors.gray900};
    }
  }
`

export const MonthsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`

export const MonthSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const MonthHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  min-height: 2.25rem;

  .navButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 0;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.gray100};
    color: ${(props) => props.theme.colors.gray800};
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.colors.gray300};
    }
  }

  .monthTitle {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
    text-transform: lowercase;
    text-align: center;
    flex: 1;

    &::first-letter {
      text-transform: uppercase;
    }
  }
`

export const WeekDaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5rem;

  span {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray700};
    padding: 0.25rem 0;
  }
`

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 0.25rem;
`

export const DayCell = styled.div<{
  $isSelectedStart?: boolean
  $isSelectedEnd?: boolean
  $isInRange?: boolean
  $isDisabled?: boolean
  $isToday?: boolean
  $isEmpty?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  position: relative;
  background-color: ${(props) => (props.$isInRange ? '#e0f2fe' : 'transparent')};
  border-top-left-radius: ${(props) => (props.$isSelectedStart ? '50%' : '0')};
  border-bottom-left-radius: ${(props) => (props.$isSelectedStart ? '50%' : '0')};
  border-top-right-radius: ${(props) => (props.$isSelectedEnd ? '50%' : '0')};
  border-bottom-right-radius: ${(props) => (props.$isSelectedEnd ? '50%' : '0')};

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 0;
    border-radius: 50%;
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: ${(props) =>
      props.$isSelectedStart || props.$isSelectedEnd || props.$isToday ? '700' : '500'};
    color: ${(props) => {
      if (props.$isSelectedStart || props.$isSelectedEnd) return '#ffffff'
      if (props.$isDisabled) return '#cbd5e1'
      return '#0f172a'
    }};
    background-color: ${(props) => {
      if (props.$isSelectedStart || props.$isSelectedEnd) return '#0f172a'
      return 'transparent'
    }};
    cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
    transition:
      background-color 0.15s ease-in-out,
      color 0.15s ease-in-out;

    &::before {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;

      /* Máscara com transição suave nas bordas para suavizar o raio do anel */
      mask: radial-gradient(farthest-side, transparent calc(100% - 4.5px), #fff calc(100% - 4px));
      -webkit-mask: radial-gradient(
        farthest-side,
        transparent calc(100% - 4.5px),
        #fff calc(100% - 4px)
      );

      ${(props) =>
        props.$isSelectedStart &&
        `
        opacity: 1;
        /* Rampa estendida (25deg até 48deg) para suavizar a ponta do arco verde */
        background: conic-gradient(
          from 270deg,
          transparent 25deg,
          #22c55e 48deg,
          #22c55e 132deg,
          transparent 155deg
        );
      `}

      ${(props) =>
        props.$isSelectedEnd &&
        `
        opacity: 1;
        /* Rampa estendida (25deg até 48deg) para suavizar a ponta do arco vermelho */
        background: conic-gradient(
          from 90deg,
          transparent 25deg,
          #ef4444 48deg,
          #ef4444 132deg,
          transparent 155deg
        );
      `}
    }

    &:hover:not(:disabled) {
      background-color: ${(props) =>
        props.$isSelectedStart || props.$isSelectedEnd ? '#0f172a' : '#cbd5e1'};
    }
  }
`

export const QuickActionsToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.gray300};

  button {
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &.active {
      border: 2px solid #0f172a;
      background-color: #ffffff;
      color: #0f172a;
      font-weight: 700;
    }

    &:not(.active) {
      border: 1px solid ${(props) => props.theme.colors.gray400};
      background-color: #ffffff;
      color: ${(props) => props.theme.colors.gray800};
      font-weight: 500;

      &:hover {
        border-color: #0f172a;
      }
    }
  }
`

export const FlexibleTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.5rem 0;
`

export const FlexibleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
`

export const FlexibleSectionTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`

export const FlexibleSubtitle = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin: -0.25rem 0 0.25rem;
`

export const PillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
`

export const DurationPill = styled.button`
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.15s ease-in-out;

  &.active {
    border: 2px solid #0f172a;
    color: #0f172a;
    font-weight: 700;
    box-shadow: 0 0 0 1px #0f172a;
  }

  &:not(.active) {
    border: 1px solid #cbd5e1;
    color: #334155;
    font-weight: 500;

    &:hover {
      border-color: #0f172a;
    }
  }
`

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0f172a;
  cursor: pointer;
  margin-top: 0.25rem;

  input[type='checkbox'] {
    width: 1.15rem;
    height: 1.15rem;
    accent-color: #0f172a;
    cursor: pointer;
  }
`

export const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #e2e8f0;
  margin: 0.5rem 0;
`

export const MonthCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  width: 100%;

  @media (min-width: 520px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

export const MonthCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.85rem 0.5rem;
  border-radius: 0.65rem;
  background-color: #ffffff;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s ease-in-out;

  svg {
    font-size: 1.35rem;
    color: #0f172a;
  }

  strong {
    font-size: 0.8rem;
    color: #0f172a;
    line-height: 1.1;
  }

  small {
    font-size: 0.725rem;
    color: #64748b;
  }

  &.active {
    border: 2px solid #0f172a;
    background-color: #f8fafc;
    box-shadow: 0 0 0 1px #0f172a;

    strong {
      font-weight: 700;
    }
  }

  &:not(.active) {
    border: 1px solid #cbd5e1;

    &:hover {
      border-color: #0f172a;
      background-color: #f8fafc;
    }
  }
`

export const ApplyButton = styled.button`
  width: 100%;
  padding: 0.65rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #0f172a;
  color: #ffffff;
  font-size: 0.95rem;
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  transition:
    background-color 0.15s ease-in-out,
    transform 0.15s ease-in-out;

  &:hover {
    background-color: #1e293b;
  }

  &:active {
    transform: scale(0.99);
  }
`
