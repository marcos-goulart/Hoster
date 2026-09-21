import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ResultCard = styled(Link)<{ $isPromotion: boolean; $ratingColor: string }>`
  display: grid;
  margin-bottom: 1.5rem;
  background-color: ${(props) => props.theme.colors.bgCard};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.soft};
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.hover};
    transform: translateY(-3px);
  }

  .imageArea {
    position: relative;
    min-height: 14rem;

    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
      display: block;
      object-fit: cover;
    }
  }

  .contentArea {
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  .textContent {
    padding: 1.5rem;
  }

  .titleRow {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${(props) => props.theme.colors.accentGreen};
      flex: 0 0 auto;
    }
  }

  h2 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 1.3rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.primaryDark};
    margin-bottom: 0.25rem;
  }

  .location {
    color: ${(props) => props.theme.colors.textMuted};
    font-size: 0.85rem;
  }

  .description {
    color: ${(props) => props.theme.colors.textMain};
    font-size: 0.9rem;
    margin-top: 0.85rem;
  }

  .ratingRow {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.4rem;
  }

  .stars {
    display: flex;
    gap: 0.2rem;
    color: ${(props) => props.theme.colors.accentGold};
  }

  .ratingBadge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.25rem;
    padding: 0.2rem 0.4rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.$ratingColor || props.theme.colors.accentWarm};
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .priceSummary {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin-top: 1rem;

    .priceRow {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    strong {
      font-size: 1.3rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.primaryDark};
    }

    .discountPrice {
      color: ${(props) => props.theme.colors.accentGreen};
      font-size: 1.3rem;
      font-weight: 700;
    }

    .oldDailyPrice {
      color: ${(props) => props.theme.colors.gray500};
      text-decoration: line-through;
      font-size: 0.85rem;
      font-weight: 400;
    }

    small {
      color: ${(props) => props.theme.colors.textMuted};
      font-size: 0.75rem;
    }

    > span:not(.discountTag) {
      color: ${(props) => props.theme.colors.textMuted};
    }
  }

  .discountTag {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    width: fit-content;
    border-radius: 4px;
    color: ${(props) => props.theme.colors.accentGreen};
    background-color: #ebf5ed;
    padding: 0.2rem 0.6rem;
    margin-top: 0.4rem;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .footerRow {
    display: grid;
    gap: 1rem;
    margin-top: auto;
    padding: 1rem 1.5rem;
    border-top: 1px solid ${(props) => props.theme.colors.borderColor};
    background-color: ${(props) => props.theme.colors.bgMain};
  }

  .services {
    display: grid;
    gap: 0.5rem;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    grid-template-columns: 260px 1fr;

    .imageArea {
      min-height: 100%;

      img {
        aspect-ratio: auto;
      }
    }

    .footerRow {
      display: block;
    }

    .services {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`
export const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.gray700};

  svg {
    flex: 0 0 auto;
    color: ${(props) => props.theme.colors.gray600};
  }
`
