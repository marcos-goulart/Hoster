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

export const FilterAside = styled.aside`
  display: none;

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    display: block;
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray300};
    padding: 1.25rem;
  }

  .filterBlock {
    padding: 1.25rem 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};

    &:first-child {
      padding-top: 0;
    }
  }

  .filterTitle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  h2 {
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-bottom: 0.75rem;
  }

  label {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    color: ${(props) => props.theme.colors.gray700};
    margin-bottom: 0.6rem;
  }

  input[type='range'] {
    width: 100%;
    margin-top: 0.75rem;
  }

  span {
    color: ${(props) => props.theme.colors.gray700};
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
  margin-bottom: 1rem;
  padding: 0.875rem 1rem;
  color: #055160;
  background-color: #cff4fc;
  border: 1px solid #b6effb;

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
    transition:
      opacity 0.15s ease-in-out,
      transform 0.15s ease-in-out;

    &:hover {
      opacity: 1;
      transform: scale(1.05);
    }
  }
`

export const ResultCard = styled(Link)<{ $isPromotion: boolean }>`
  display: grid;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  color: inherit;
  text-decoration: none;
  transition:
    box-shadow 0.15s ease-in-out,
    transform 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
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

  .priceBadge {
    position: absolute;
    right: 0;
    bottom: 0;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) =>
      props.$isPromotion ? props.theme.colors.darkGreen : props.theme.colors.orange};
    padding: 0.35rem 0.65rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }

  .contentArea {
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  .textContent {
    padding: 1rem;
  }

  .titleRow {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${(props) => props.theme.colors.darkGreen};
      flex: 0 0 auto;
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    margin-bottom: 0.25rem;
  }

  .location,
  .description {
    color: ${(props) => props.theme.colors.phColor};
  }

  .stars {
    display: flex;
    gap: 0.2rem;
    color: ${(props) => props.theme.colors.yellow};
    margin-top: 0.25rem;
  }

  .description {
    margin-top: 0.85rem;
  }

  .footerRow {
    display: grid;
    gap: 1rem;
    margin-top: auto;
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.gray100};
  }

  .services {
    display: grid;
    gap: 0.5rem;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    grid-template-columns: minmax(220px, 34%) minmax(0, 1fr);

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
  margin-top: 1.5rem;

  span {
    color: ${(props) => props.theme.colors.gray700};
  }

  button {
    border: 1px solid ${(props) => props.theme.colors.orange};
    background-color: transparent;
    color: ${(props) => props.theme.colors.orange};
    cursor: pointer;
    font-family: inherit;
    padding: 0.5rem 1rem;
    transition:
      color 0.15s ease-in-out,
      background-color 0.15s ease-in-out,
      opacity 0.15s ease-in-out;

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.orange};
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
