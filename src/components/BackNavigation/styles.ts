import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;

  .btn-back {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.gray700 || '#4b5563'};
    font-weight: 600;
    cursor: pointer;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
    }
  }

  .separator {
    color: ${(props) => props.theme.colors.gray300 || '#d1d5db'};
  }

  .link-home {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: ${(props) => props.theme.colors.gray700 || '#4b5563'};
    text-decoration: none;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
    }
  }
`
