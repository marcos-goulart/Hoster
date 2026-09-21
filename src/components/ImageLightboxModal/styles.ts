import styled from 'styled-components'

export const LightboxOverlay = styled.div<{ $active: boolean }>`
  display: ${(props) => (props.$active ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.92);
  z-index: 99999;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 8px;
      object-fit: contain;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
  }

  .lightbox-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    font-size: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    z-index: 10;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    &.prev {
      left: -4rem;
    }

    &.next {
      right: -4rem;
    }

    @media (max-width: ${(props) => props.theme.screenMedias.md}) {
      &.prev {
        left: 0.5rem;
      }
      &.next {
        right: 0.5rem;
      }
    }
  }

  .lightbox-close {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    color: white;
    font-size: 2.5rem;
    line-height: 1;
    cursor: pointer;
    background: transparent;
    border: 0;
    padding: 0.5rem;
    transition: transform 0.15s ease;

    &:hover {
      transform: scale(1.15);
    }
  }

  .lightbox-counter {
    color: white;
    margin-top: 1.25rem;
    font-size: 1rem;
    font-weight: 500;
  }
`
