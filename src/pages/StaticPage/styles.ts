import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  max-width: 1050px;
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

export const ContentGrid = styled.div<{ $hasSidebar: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasSidebar }) => ($hasSidebar ? '240px 1fr' : '1fr')};
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const SidebarNav = styled.aside`
  position: sticky;
  top: 100px;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  border-radius: 0.375rem;
  padding: 1.25rem;

  strong {
    display: block;
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.primaryDark};
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li a {
      font-size: 0.85rem;
      color: ${(props) => props.theme.colors.gray700 || '#4b5563'};
      text-decoration: none;
      transition: color 0.15s ease-in-out;

      &:hover {
        color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const ContentWrapper = styled.article`
  font-size: ${(props) => props.theme.fontSize.base};
  line-height: 1.7;
  color: ${(props) => props.theme.colors.textMain};

  section {
    margin-bottom: 2rem;
    scroll-margin-top: 100px;
  }

  h2 {
    font-size: 1.35rem;
    color: ${(props) => props.theme.colors.primaryDark};
    margin-bottom: 0.75rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#f3f4f6'};
  }

  p {
    margin-bottom: 0.85rem;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.35rem;
    }
  }
`
