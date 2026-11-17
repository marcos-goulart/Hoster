import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(44, 30, 22, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const ModalContainer = styled.div`
  background: ${(props) => props.theme.colors.bgCard || '#ffffff'};
  border-radius: 1rem;
  max-width: 650px;
  width: 100%;
  max-height: min(88vh, 90dvh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.hover || '0 20px 40px rgba(0,0,0,0.2)'};
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  position: relative;
  animation: slideUp 0.25s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  flex-shrink: 0;

  h2 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 1.35rem;
    color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    margin: 0;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.textMuted || '#736964'};
    font-size: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.35rem;
    border-radius: 0.375rem;
    transition: all 0.15s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
      background-color: ${(props) => props.theme.colors.bgMain || '#FAFAF7'};
    }
  }
`

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  flex-shrink: 0;
  overflow: hidden;
`

export const ProgressBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  background-color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
  width: ${(props) => `${props.$progress}%`};
  transition: width 0.1s ease-out;
`

export const ModalBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1 1 auto;
  overflow-y: auto;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
    border-radius: 6px;
  }
`

export const VoucherBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  background-color: ${(props) => props.theme.colors.bgMain || '#FAFAF7'};
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px dashed ${(props) => props.theme.colors.borderColor || '#E8E2DB'};

  .code-group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    span {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: ${(props) => props.theme.colors.textMuted || '#736964'};
      font-weight: 600;
    }

    strong {
      font-family: monospace;
      font-size: 1rem;
      color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    }
  }
`

export const HotelSection = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;

  img {
    width: 110px;
    height: 100px;
    object-fit: cover;
    border-radius: 0.5rem;
    flex-shrink: 0;
    border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  }

  .hotel-info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    h3 {
      font-family: ${(props) => props.theme.fontFamily.heading};
      font-size: 1.2rem;
      color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
      margin: 0;
    }

    p.address {
      font-size: 0.875rem;
      color: ${(props) => props.theme.colors.textMuted || '#736964'};
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    p.room {
      font-size: 0.9rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
      margin-top: 0.2rem;
    }
  }
`

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.bgMain || '#FAFAF7'};
  padding: 1.25rem;
  border-radius: 0.75rem;

  .item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    span.label {
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 700;
      color: ${(props) => props.theme.colors.textMuted || '#736964'};
    }

    span.value {
      font-size: 0.95rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.textMain || '#332B27'};
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  }
`

export const FinancialSummary = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h4 {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    margin: 0 0 0.5rem;
  }

  .line {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.textMuted || '#736964'};

    &.total {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px dashed ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
      font-size: 1.15rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    }
  }
`

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  background-color: ${(props) => props.theme.colors.bgMain || '#FAFAF7'};
  border-radius: 0 0 1rem 1rem;
  flex-shrink: 0;

  button {
    padding: 0.6rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &.btn-secondary {
      background: #ffffff;
      border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
      color: ${(props) => props.theme.colors.textMain || '#332B27'};

      &:hover {
        background-color: ${(props) => props.theme.colors.gray200 || '#E8E2DB'};
      }
    }

    &.btn-primary {
      background-color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
      border: 1px solid transparent;
      color: #ffffff;

      &:hover {
        background-color: ${(props) => props.theme.colors.accentHover || '#72462C'};
      }
    }
  }
`
