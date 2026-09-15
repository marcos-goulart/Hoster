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
  background-color: ${(props) => props.theme.colors.bgCard};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.soft};
  overflow: hidden;
`

export const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};

  button {
    flex: 1;
    padding: 1rem;
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: ${(props) => props.theme.fontSize.base};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.textMuted};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
      color: ${(props) => props.theme.colors.accentWarm};
      border-bottom: 2px solid ${(props) => props.theme.colors.accentWarm};
      background-color: rgba(140, 90, 60, 0.05);
    }

    &:hover:not(.active) {
      color: ${(props) => props.theme.colors.primaryDark};
      background-color: ${(props) => props.theme.colors.bgMain};
    }
  }
`
