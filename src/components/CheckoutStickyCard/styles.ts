import styled from 'styled-components'

export const Card = styled.div`
  background: ${(props) => props.theme.colors.bgCard};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);

  @media (max-width: ${(props) => props.theme.screenMedias.sl}) {
    padding: 1.25rem;
  }
`

export const CheckoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};

  .price-main {
    strong {
      font-size: 1.65rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.accentWarm};
    }

    span {
      font-size: 0.85rem;
      color: ${(props) => props.theme.colors.textMuted};
    }
  }

  .nights-label {
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.textMuted};
    font-weight: 500;
  }
`

export const StayDetailsBox = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  border-radius: 8px;
  padding: 0.85rem 1rem;
  margin-bottom: 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  background-color: #ffffff;

  .stay-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
      font-size: 0.7rem;
      color: ${(props) => props.theme.colors.textMuted || '#6b7280'};
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.03em;
      display: block;
    }

    span {
      font-size: 0.875rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.primaryDark || '#1f2937'};
      display: block;
      line-height: 1.2;
    }
  }

  .btn-edit-stay {
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.accentWarm || '#c07a46'};
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    margin-top: 0.25rem;
    padding-top: 0.5rem;
    border-top: 1px dashed ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`

export const GuaranteeBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
`

export const SectionTitle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.85rem;
  color: ${(props) => props.theme.colors.primaryDark};
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: ${(props) => props.theme.colors.accentWarm};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.accentHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
