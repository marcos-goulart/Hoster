import styled from 'styled-components'

export const Container = styled.div`
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
