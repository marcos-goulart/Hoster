import styled from 'styled-components'

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem;

  .inputGroup {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    width: 100%;

    label {
      font-size: ${(props) => props.theme.fontSize.sm};
      font-weight: ${(props) => props.theme.fontWeight.medium};
      color: ${(props) => props.theme.colors.gray700};
    }

    input {
      width: 100%;
      padding: 0.75rem 0.875rem;
      border: 1px solid ${(props) => props.theme.colors.gray300};
      border-radius: 0.375rem;
      font-family: inherit;
      font-size: ${(props) => props.theme.fontSize.base};
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colors.accentWarm};
        box-shadow: 0 0 0 3px rgba(140, 90, 60, 0.15);
      }

      &:disabled {
        background-color: ${(props) => props.theme.colors.bgMain};
        cursor: not-allowed;
      }
    }
  }

  .field-error {
    color: #dc2626;
    font-size: 0.75rem;
    margin-top: 0.15rem;
  }

  .firebase-error {
    color: #dc2626;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: ${(props) => props.theme.fontSize.sm};
    text-align: center;
  }

  .success-message {
    color: #15803d;
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    padding: 0.75rem;
    border-radius: 0.375rem;
    font-size: ${(props) => props.theme.fontSize.sm};
    text-align: center;
  }
`

export const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    padding-right: 2.75rem !important;
  }

  button {
    position: absolute;
    right: 0.75rem;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.textMuted};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;

    &:hover {
      color: ${(props) => props.theme.colors.primaryDark};
    }
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.85rem 1rem;
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.colors.accentWarm};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.accentHover};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
