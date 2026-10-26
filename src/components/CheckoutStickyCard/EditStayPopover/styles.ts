import styled from 'styled-components'

export const Container = styled.div`
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

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
      font-size: 0.75rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.primaryDark || '#1f2937'};
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    input[type='date'],
    select {
      width: 100%;
      padding: 0.45rem 0.6rem;
      border: 1px solid ${(props) => props.theme.colors.borderColor || '#d1d5db'};
      border-radius: 6px;
      font-size: 0.85rem;
      color: #1f2937;
      background-color: #f9fafb;
      outline: none;
      transition:
        border-color 0.15s,
        background-color 0.15s;

      &:focus {
        border-color: ${(props) => props.theme.colors.accentWarm || '#c07a46'};
        background-color: #ffffff;
      }
    }
  }

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
