import styled, { css } from 'styled-components'

export const Container = styled.div<{ $hasError?: boolean }>`
  position: relative;
  min-width: 0;

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }

  .inputShell {
    position: relative;

    input {
      width: 100%;
      min-height: 2.5rem;
      border: 2px solid ${(props) => props.theme.colors.bgBrown2};
      background-color: ${(props) => props.theme.colors.bgBrown2};

      color: ${(props) => props.theme.colors.bgBrown1};

      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 2.5rem 0.5rem 0.75rem;
      font-family: inherit;
      font-size: ${(props) => props.theme.fontSize.base};
      line-height: 1.4;
      border-radius: 0;
      outline: none;
      transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;

      &::placeholder {
        color: ${(props) => props.theme.colors.gray600};
        opacity: 1;
      }

      &:focus {
        border-color: ${(props) => props.theme.colors.blue};
        background-color: ${(props) => props.theme.colors.white};
      }

      ${(props) =>
            props.$hasError &&
            css`
              border-color: #e53e3e;
              background-color: #fff5f5;

              &::placeholder {
                color: #e53e3e;
                font-weight: 600;
              }
            `}
    }
  }

  .clearButton {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    width: 1.75rem;
    height: 1.75rem;
    border: 0;
    background-color: transparent;
    transform: translateY(-50%);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    transition: color 0.15s ease-in-out, transform 0.15s ease-in-out;

    &::placeholder {
    color: ${(props) => props.theme.colors.bgBrown1};
    opacity: 1;
  }

    &:hover {
      color: ${(props) => props.theme.colors.gray900};
      transform: translateY(-50%) scale(1.1);
    }
  }

  .floatingPanel.destinationPanel {
    position: absolute;
    top: calc(100% + 0.65rem);
    left: 0;
    z-index: 20;
    width: min(34rem, calc(100vw - 2rem));
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 0.75rem;
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.18);
    animation: panel-rise 0.18s ease-out;

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
  }

  .suggestionItem {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 0;
    background-color: transparent;
    color: ${(props) => props.theme.colors.gray900};
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    border-radius: 0.4rem;

    &:hover {
      background-color: ${(props) => props.theme.colors.gray100};
    }

    svg {
      margin-top: 0.2rem;
      flex: 0 0 auto;
    }

    span {
      display: grid;
    }

    small {
      color: ${(props) => props.theme.colors.gray700};
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
`
