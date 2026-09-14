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
