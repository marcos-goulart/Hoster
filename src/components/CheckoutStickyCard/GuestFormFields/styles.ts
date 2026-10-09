import styled from 'styled-components'

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.85rem;

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.primaryDark};
  }

  input {
    padding: 0.65rem 0.85rem;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 6px;
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.textMain};
    background-color: ${(props) => props.theme.colors.bgMain};
    outline: none;
    width: 100%;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: ${(props) => props.theme.colors.accentWarm};
      background-color: ${(props) => props.theme.colors.white};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`
