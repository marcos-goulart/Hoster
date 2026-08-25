import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  min-width: 0;

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }

  .fieldButton {
    width: 100%;
    min-height: 2.5rem;
    border: 2px solid ${(props) => props.theme.colors.bgBrown2};
    background-color: ${(props) => props.theme.colors.bgBrown2};
    color: ${(props) => props.theme.colors.bgBrown1};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-family: inherit;
    font-size: ${(props) => props.theme.fontSize.base};
    line-height: 1.4;
    border-radius: 0;
    outline: none;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;

    &:focus {
      border-color: ${(props) => props.theme.colors.blue};
      background-color: ${(props) => props.theme.colors.white};
    }
  }

  .travelersPanel {
    position: absolute;
    top: calc(100% + 0.65rem);
    right: 0;
    left: auto;
    z-index: 20;
    width: min(34rem, calc(100vw - 2rem));
    max-width: 26rem;
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 0.75rem;
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.18);
    animation: panel-rise 0.18s ease-out;

    &::before {
      content: '';
      position: absolute;
      top: -0.45rem;
      right: 1.5rem;
      left: auto;
      width: 0.9rem;
      height: 0.9rem;
      background-color: ${(props) => props.theme.colors.white};
      transform: rotate(45deg);
    }
  }

  .counterRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;

    div {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    button {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme.colors.gray500};
      background-color: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.gray900};
      cursor: pointer;
      font-family: inherit;
    }
  }

  .addRoomButton {
    display: block;
    margin: 1rem 0;
    border: 0;
    background-color: transparent;
    color: ${(props) => props.theme.colors.gray900};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    cursor: pointer;
    font-family: inherit;
  }

  .confirmButton {
    float: right;
    padding: 0.5rem 1.5rem;
    border-radius: 999px;
    border: 0;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.gray900};
    cursor: pointer;
    font-family: inherit;
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
