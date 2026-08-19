import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  background-color: rgba(15, 23, 42, 0.45);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.$isVisible ? 'all' : 'none')};
  transition: opacity 0.25s ease-in-out, visibility 0.25s ease-in-out;
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};

  .loadingWindow {
    min-width: min(20rem, calc(100vw - 2rem));
    padding: 2rem 2.5rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.85rem;
    transform: ${(props) => (props.$isVisible ? 'scale(1)' : 'scale(0.92)')};
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .spinner {
    width: 2.75rem;
    height: 2.75rem;
    border: 3px solid #e2e8f0;
    border-top-color: ${(props) => props.theme.colors.orange};
    border-radius: 50%;
    animation: ${spin} 0.75s linear infinite;
  }

  .loadingTitle {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .loadingSubtext {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }
`
