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
export const EditPopover = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  .popover-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.primaryDark || '#1f2937'};
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 0.6rem;

      button {
        width: 1.85rem;
        height: 1.85rem;
        border-radius: 50%;
        border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
        background: #f9fafb;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s;

        &:hover {
          background: #e5e7eb;
        }
      }

      strong {
        font-size: 0.95rem;
        min-width: 1.2rem;
        text-align: center;
      }
    }
  }

  .btn-apply-popover {
    width: 100%;
    padding: 0.65rem;
    background-color: ${(props) => props.theme.colors.accentWarm || '#c07a46'};
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.9;
    }
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.85rem;

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.primaryDark};
  }

  input {
    padding: 0.65rem 0.85rem;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 6px;
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.textMain};
    background-color: ${(props) => props.theme.colors.bgMain};
    outline: none;
    width: 100%;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: ${(props) => props.theme.colors.accentWarm};
      background-color: ${(props) => props.theme.colors.white};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`

export const SummaryBox = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  margin: 1.25rem 0;

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.textMuted};
    margin-bottom: 0.5rem;

    &.total {
      font-size: 1rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.primaryDark};
      border-top: 1px dashed ${(props) => props.theme.colors.borderColor};
      padding-top: 0.6rem;
      margin-bottom: 0;
    }
  }
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
