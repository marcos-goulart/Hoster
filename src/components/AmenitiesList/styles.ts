import styled from 'styled-components'

export const SectionTitle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.15rem;
  color: ${(props) => props.theme.colors.primaryDark};
`

export const AmenitiesFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;

  .amenity-card {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background-color: #f8fafc;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 8px;
    padding: 0.85rem 1.1rem;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.textMain};
    font-weight: 500;
    flex: 1 1 calc(50% - 0.85rem);
    min-width: 180px;

    svg {
      color: ${(props) => props.theme.colors.accentWarm};
      flex-shrink: 0;
    }
  }

  @media (max-width: ${(props) => props.theme.screenMedias.sl}) {
    .amenity-card {
      flex: 1 1 100%;
    }
  }
`
