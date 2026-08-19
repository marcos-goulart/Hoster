import styled from 'styled-components'

export const Form = styled.form`
  position: relative;
  z-index: 5;

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
    margin-bottom: 0.5rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }

  input,
  select,
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
    transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
  }

  input:focus,
  select:focus,
  .fieldButton:focus {
    border-color: ${(props) => props.theme.colors.blue};
    background-color: ${(props) => props.theme.colors.white};
  }

  .inputShell {
    position: relative;

    input {
      padding-right: 2.5rem;
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
    color: ${(props) => props.theme.colors.gray600};
    transform: translateY(-50%);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    transition: color 0.15s ease-in-out, transform 0.15s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.colors.gray900};
      transform: translateY(-50%) scale(1.1);
    }
  }

  .fieldButton {
    cursor: pointer;
  }

  .floatingPanel {
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

    &.datesPanel {
      width: min(44rem, calc(100vw - 2rem));
      padding: 1.25rem;
    }
  }

  .floatingPanel::before {
    content: '';
    position: absolute;
    top: -0.45rem;
    left: 1.5rem;
    width: 0.9rem;
    height: 0.9rem;
    background-color: ${(props) => props.theme.colors.white};
    transform: rotate(45deg);
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
  }

  .suggestionItem:hover {
    background-color: ${(props) => props.theme.colors.gray100};
  }

  .suggestionItem svg {
    margin-top: 0.2rem;
    flex: 0 0 auto;
  }

  .suggestionItem span {
    display: grid;
  }

  .suggestionItem small {
    color: ${(props) => props.theme.colors.gray700};
  }

  .dateInputs {
    display: grid;
    gap: 0.75rem;
  }

  .quickDateActions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${(props) => props.theme.colors.gray300};
  }

  .quickDateActions button,
  .counterRow button,
  .addRoomButton,
  .confirmButton {
    border: 1px solid ${(props) => props.theme.colors.gray500};
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.gray900};
    cursor: pointer;
    font-family: inherit;
  }

  .quickDateActions button {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
  }

  .travelersPanel {
    right: 0;
    left: auto;
    max-width: 26rem;
  }

  .travelersPanel::before {
    right: 1.5rem;
    left: auto;
  }

  .counterRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
  }

  .counterRow div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .counterRow button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .addRoomButton {
    display: block;
    margin: 1rem 0;
    border: 0;
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }

  .confirmButton {
    float: right;
    padding: 0.5rem 1.5rem;
    border-radius: 999px;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.gray900};
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
