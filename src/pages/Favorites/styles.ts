import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`

export const PageHeader = styled.header`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  padding-bottom: 1rem;

  h1 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 2rem;
    color: ${(props) => props.theme.colors.primaryDark};
  }

  p {
    font-size: ${(props) => props.theme.fontSize.base};
    color: ${(props) => props.theme.colors.gray700 || '#4b5563'};
    margin-top: 0.5rem;
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  text-align: center;

  .icon {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.gray300 || '#d1d5db'};
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.primaryDark};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${(props) => props.theme.colors.gray700 || '#6b7280'};
    font-size: 0.95rem;
    max-width: 400px;
    margin-bottom: 1.5rem;
  }

  .btn-explore {
    padding: 0.75rem 1.5rem;
    background-color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
    color: #ffffff;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.colors.primaryDark};
    }
  }
`
