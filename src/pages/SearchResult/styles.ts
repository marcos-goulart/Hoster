import styled, { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

import resultBanner from '../../img/banners/banner-resultado.jpeg'

export const Container = styled.div`
  min-height: 100vh;

  main {
    width: 100%;
    min-height: 100vh;
    padding: 2rem 0 3rem;
  }

  .container {
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.sl}) {
    .container {
      max-width: 540px;
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    .container {
      max-width: 720px;
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    .container {
      max-width: 960px;
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.xl}) {
    .container {
      max-width: 1140px;
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.xxl}) {
    .container {
      max-width: 1320px;
    }
  }
`

export const SearchHero = styled.section`
  width: 100%;
  min-height: 24rem;
  padding: 5rem 0;
  display: flex;
  align-items: center;
  background-image:
    linear-gradient(rgba(20, 21, 24, 0.25), rgba(20, 21, 24, 0.25)), url(${resultBanner});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .searchCard {
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    padding: 1.5rem;
    border-radius: 0.25rem;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    min-height: 32rem;
    padding: 7rem 0;
  }
`

export const ResultsLayout = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
    align-items: start;
  }
`

export const ApplyButton = styled.button`
  width: 100%;
  margin-top: 1.25rem;
  padding: 0.625rem 1rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.orange};
  border: 1px solid transparent;
  font-family: inherit;
  cursor: not-allowed;
  opacity: 0.65;
`

export const ResultsColumn = styled.section`
  min-width: 0;

  .verified-tooltip {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .verified-tooltip-content {
    position: absolute;
    top: 130%;
    left: 50%;
    transform: translateX(-50%);

    width: 15rem;

    background-color: ${(props) => props.theme.colors.bgColor};
    color: #222;
    padding: 0.625rem 0.75rem;
    border-radius: 0.5rem;
    border: 0.0625rem solid ${(props) => props.theme.colors.gray300};

    box-shadow: 0 0.375rem 1.125rem rgba(0, 0, 0, 0.4);

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.15s ease;
    transition-delay: 0.5s;

    z-index: 1000;
  }

  .verified-tooltip-content strong {
    display: block;
    margin-bottom: 4px;
    font-size: 0.8rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.darkGreen};
  }

  .verified-tooltip-content span {
    display: block;
    font-size: 0.7rem;
    line-height: 1.25;
    color: ${(props) => props.theme.colors.gray700};
  }

  .verified-tooltip:hover .verified-tooltip-content {
    opacity: 1;
    visibility: visible;
  }

  .verified-tooltip:not(:hover) .verified-tooltip-content {
    transition-delay: 0s;
  }
`

export const TagAlert = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.8rem 1.2rem;
  color: ${(props) => props.theme.colors.accentGreen};
  background-color: #EBF5ED;
  border: 1px solid #C2E2C9;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 0;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    opacity: 0.75;
    transition: all 0.15s ease-in-out;

    &:hover {
      opacity: 1;
      transform: scale(1.05);
    }
  }
`

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
    background-color: #EBF5ED;
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

export const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  span {
    color: ${(props) => props.theme.colors.textMuted};
  }

  button {
    border: 1px solid ${(props) => props.theme.colors.accentWarm};
    background-color: transparent;
    color: ${(props) => props.theme.colors.accentWarm};
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    padding: 0.5rem 1.25rem;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.accentWarm};
      color: ${(props) => props.theme.colors.white};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.45;
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

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
`

const skeletonBlock = css`
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.gray200};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${shimmer} 1.4s ease-in-out infinite;
  }
`

export const SkeletonResultCard = styled.div`
  display: grid;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray300};

  .image {
    ${skeletonBlock};
    min-height: 14rem;
  }

  .content {
    padding: 1rem;
  }

  .line,
  .star,
  .service {
    ${skeletonBlock};
    border-radius: 0.25rem;
  }

  .title {
    width: 45%;
    height: 1.35rem;
    margin-bottom: 0.75rem;
  }

  .location {
    width: 32%;
    height: 1rem;
    margin-bottom: 0.75rem;
  }

  .stars {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }

  .star {
    width: 1rem;
    height: 1rem;
    border-radius: 999px;
  }

  .description {
    width: 80%;
    height: 1rem;
    margin-bottom: 0.6rem;

    &.short {
      width: 64%;
    }
  }

  .services {
    display: grid;
    gap: 0.5rem;
    margin-top: 1.25rem;
  }

  .service {
    width: 100%;
    height: 1.5rem;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    grid-template-columns: minmax(220px, 34%) minmax(0, 1fr);
  }
`

export const EmptyState = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  color: ${(props) => props.theme.colors.gray700};
  padding: 2rem;
  text-align: center;
`
