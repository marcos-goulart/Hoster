import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8fafc;
`

export const MainContent = styled.main`
  flex: 1;
  padding: 3rem 1.5rem;

  .container {
    max-width: 1140px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`

export const PaymentCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .btn-submit-payment {
    width: 100%;
    padding: 1.1rem;
    margin-top: 1.5rem;
    background-color: #16a34a;
    color: #ffffff;
    font-weight: 700;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);

    &:hover {
      background-color: #15803d;
      transform: translateY(-1px);
    }

    &:disabled {
      background-color: #9ca3af;
      box-shadow: none;
      cursor: not-allowed;
    }
  }
`

export const MethodSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  button {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    span {
      font-weight: 600;
      font-size: 0.95rem;
      color: #334155;
    }

    small {
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 0.2rem;
    }

    &.active {
      border-color: #2563eb;
      background-color: #eff6ff;

      span {
        color: #1d4ed8;
      }
    }
  }
`

export const LgpdNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.25rem;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;

  svg {
    font-size: 1.25rem;
    color: #475569;
    flex-shrink: 0;
  }

  strong {
    color: #334155;
  }
`
