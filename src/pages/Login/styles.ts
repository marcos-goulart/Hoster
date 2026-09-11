import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.bgColor || props.theme.colors.gray100};

  main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }
`

export const AuthCard = styled.div`
  width: 100%;
  max-width: 28rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
  overflow: hidden;
`

export const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};

  button {
    flex: 1;
    padding: 1rem;
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: ${(props) => props.theme.fontSize.base};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.gray600};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
      color: ${(props) => props.theme.colors.orange};
      border-bottom: 2px solid ${(props) => props.theme.colors.orange};
      background-color: rgba(249, 115, 22, 0.04);
    }

    &:hover:not(.active) {
      color: ${(props) => props.theme.colors.gray900};
      background-color: ${(props) => props.theme.colors.gray100};
    }
  }
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem;

  .inputGroup {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

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

      &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colors.orange};
        box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
      }
    }
  }
`

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray700};
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
    border-color: ${(props) => props.theme.colors.gray400};
    color: ${(props) => props.theme.colors.gray900};
  }
`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.colors.gray600};
  font-size: ${(props) => props.theme.fontSize.sm};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  }

  span {
    padding: 0 0.75rem;
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.85rem 1rem;
  background-color: ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.orange2 || props.theme.colors.orange};
  }
`
export const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    padding-right: 2.5rem !important; /* Espaço para o ícone não sobrepor o texto */
  }

  button {
    position: absolute;
    right: 0.75rem;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.gray600};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    font-size: 1.1rem;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.colors.gray900};
    }

    &:focus {
      outline: none;
    }
  }
`
