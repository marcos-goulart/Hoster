import styled from 'styled-components'

export const Form = styled.form`
  position: relative;
  z-index: 100;

  .searchRow {
    display: grid;
    gap: 1rem;
  }

  .field {
    position: relative;
    min-width: 0;
  }

  label {
    display: inline-block;
    margin-bottom: 0.3rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.colors.primaryMedium};
  }

  select,
  .fieldButton {
    width: 100%;
    height: 2.8rem;
    min-height: 2.8rem;
    max-height: 2.8rem;
    box-sizing: border-box;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    background-color: ${(props) => props.theme.colors.bgMain};
    color: ${(props) => props.theme.colors.textMain};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 0.8rem;
    font-family: inherit;
    font-size: 0.9rem;
    line-height: 1.2;
    border-radius: 6px;
    outline: none;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.2s ease;
  }

  select:focus,
  .fieldButton:focus {
    border-color: ${(props) => props.theme.colors.accentWarm};
    background-color: ${(props) => props.theme.colors.white};
  }

  .fieldButton {
    cursor: pointer;
  }

  .floatingPanel {
    position: absolute;
    top: calc(100% + 0.65rem);
    left: 0;
    z-index: 9995;
    width: min(34rem, calc(100vw - 2rem));
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 0.75rem;
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.25);
    animation: panel-rise 0.18s ease-out;

    &.datesPanel {
      width: min(44rem, calc(100vw - 2rem));
      padding: 1.25rem;
    }

    &::before {
      content: '';
      position: absolute;
      top: -0.45rem;
      left: 1.5rem;
      width: 0.9rem;
      height: 0.9rem;
      background-color: ${(props) => props.theme.colors.white};
      transform: rotate(45deg);
    }

    .destinationWrapper {
      position: relative;
    }

    /* Estilo da mensagem de erro */
    .error-message {
      position: absolute;
      bottom: -1.4rem;
      left: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: ${(props) => props.theme.colors.red || '#e53e3e'};
      font-size: 0.75rem;
      font-weight: 500;
      animation: fadeIn 0.2s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-2px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @keyframes panel-rise {
    from {
      opacity: 0;
      transform: translateY(-0.5rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    .searchRow {
      grid-template-columns: 1.35fr 1.1fr 0.8fr 1.05fr 0.85fr;
      align-items: end;
    }
  }
`
