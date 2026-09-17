import styled from 'styled-components'

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;

  .icon {
    color: ${(props) => props.theme.colors.gray700 || '#6b7280'};
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 0.95rem;
    color: ${(props) => props.theme.colors.primaryDark};

    &::placeholder {
      color: ${(props) => props.theme.colors.gray700 || '#9ca3af'};
    }
  }
`

export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .no-results {
    text-align: center;
    color: ${(props) => props.theme.colors.gray700 || '#6b7280'};
    padding: 2rem;
  }
`

export const FAQItem = styled.div<{ $isOpen: boolean }>`
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  border-radius: 0.375rem;
  overflow: hidden;
  background-color: #ffffff;

  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: transparent;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.primaryDark};
    cursor: pointer;
    text-align: left;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: #f9fafb;
    }

    svg {
      color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
      flex-shrink: 0;
    }
  }

  .faq-answer {
    padding: 0 1.25rem 1.25rem 1.25rem;
    font-size: 0.925rem;
    line-height: 1.6;
    color: ${(props) => props.theme.colors.textMain || '#4b5563'};
    border-top: 1px solid ${(props) => props.theme.colors.borderColor || '#f3f4f6'};
    padding-top: 0.75rem;
  }
`
