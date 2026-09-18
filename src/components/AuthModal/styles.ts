import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 26rem;
  background-color: ${(props) => props.theme.colors.bgCard};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.soft};
  overflow: hidden;
  animation: ${fadeIn} 0.25s ease-out forwards;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.textMuted};
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.bgMain};
    color: ${(props) => props.theme.colors.primaryDark};
  }
`

export const AuthNotice = styled.div`
  background-color: #fffbeb;
  border-bottom: 1px solid #fde68a;
  padding: 0.85rem 2.5rem 0.85rem 1rem;

  p {
    color: #b45309;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
  }
`

export const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  padding-right: 2.5rem;

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

    &.active {
      color: ${(props) => props.theme.colors.accentWarm};
      border-bottom: 2px solid ${(props) => props.theme.colors.accentWarm};
    }
  }
`
