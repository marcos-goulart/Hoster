import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .card-error-alert {
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #334155;
    }

    input,
    select {
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.95rem;

      &:focus {
        outline: none;
        border-color: #2563eb;
      }
    }
  }

  .row {
    display: flex;
    gap: 1rem;

    .input-group {
      flex: 1;
    }
  }
`
