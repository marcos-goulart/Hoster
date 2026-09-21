import styled, { css, keyframes } from 'styled-components'

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
  background-color: #ebf5ed;
  border: 1px solid #c2e2c9;
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

export const EmptyState = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  color: ${(props) => props.theme.colors.gray700};
  padding: 2rem;
  text-align: center;
`
