import styled from 'styled-components'

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

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 0.25rem;
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

export const MonthSection = styled.div`
  display: flex;
  flex-direction: column;
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
