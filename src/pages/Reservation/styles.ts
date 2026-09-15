import styled, { css } from 'styled-components'
import { keyframes } from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
`

export const MainContent = styled.main`
  min-height: 100vh;
  padding: 2rem 0 3rem;

  .container {
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
  }

  .contentGrid {
    display: grid;
    gap: 1.5rem;
    align-items: start;
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
    padding-top: 2.5rem;

    .container {
      max-width: 960px;
    }

    .contentGrid {
      grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
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

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;

  h1 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 1.75rem;
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.primaryDark};
    margin-bottom: 0.5rem;
    position: relative;
    display: block;

    &::after {
      content: '';
      display: block;
      width: 50px;
      height: 3px;
      background-color: ${(props) => props.theme.colors.accentWarm};
      margin: 0.6rem auto 0;
      border-radius: 2px;
    }
  }

  .line {
    display: none;
  }
`

const cardSurface = css`
  background-color: ${(props) => props.theme.colors.bgCard};
  box-shadow: ${(props) => props.theme.shadows.soft};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 12px;
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
  background: ${(props) => props.theme.colors.gray200};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.35) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${shimmer} 1.4s ease-in-out infinite;
  }
`

export const SummaryCard = styled.article<{ $isAvailable: boolean }>`
  ${cardSurface};
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .summaryContent {
    padding: 1.25rem;
    text-align: left;
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
    margin-bottom: 0.75rem;
  }

  .stars {
    display: flex;
    gap: 0.25rem;
    color: ${(props) => props.theme.colors.accentGold};
    margin-bottom: 0.8rem;
  }

  .price {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.primaryDark};

    .oldPrice {
      color: ${(props) => props.theme.colors.gray500};
      text-decoration: line-through;
      font-size: 0.85rem;
      font-weight: 400;
    }
  }

  .description {
    color: ${(props) => props.theme.colors.textMuted};
    font-size: 0.85rem;
    margin-top: 0.8rem;
  }
`

export const StatusBadge = styled.div<{ $isAvailable: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.6rem 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 6px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.$isAvailable ? props.theme.colors.accentGreen : props.theme.colors.red};
`

export const ReservationSkeletonSummary = styled.article`
  ${cardSurface};
  overflow: hidden;

  .image {
    ${skeletonBlock};
    width: 100%;
    aspect-ratio: 4 / 3;
  }

  .summaryContent {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .line,
  .badge,
  .star {
    ${skeletonBlock};
    border-radius: 0.25rem;
  }

  .title {
    height: 1.6rem;
    width: 74%;
  }

  .location {
    height: 1rem;
    width: 42%;
  }

  .stars {
    display: flex;
    gap: 0.35rem;
  }

  .star {
    width: 1rem;
    height: 1rem;
    border-radius: 999px;
  }

  .price {
    height: 1.2rem;
    width: 38%;
  }

  .badge {
    height: 3rem;
    width: 100%;
  }

  .description {
    height: 1rem;
    width: 100%;

    &.short {
      width: 78%;
    }
  }
`

export const ReservationSkeletonForm = styled.section`
  ${cardSurface};
  padding: 2rem;

  .fieldGrid {
    display: flex;
    flex-wrap: wrap;
    margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
    margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);
    row-gap: 0.25rem;
  }

  .field {
    width: 100%;
    padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
    padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
    margin-bottom: 1rem;
  }

  .label,
  .input,
  .button {
    ${skeletonBlock};
    border-radius: 6px;
  }

  .label {
    width: 42%;
    height: 1rem;
    margin-bottom: 0.5rem;
  }

  .input {
    width: 100%;
    height: 2.75rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .button {
    width: 9rem;
    height: 2.75rem;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    .field.half {
      width: 50%;
    }

    .field.third {
      width: 33.3333333333%;
    }
  }
`

export const FormCard = styled.section`
  ${cardSurface};
  padding: 2rem;
  text-align: left;

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }
`

export const Notice = styled.div`
  margin-bottom: 1.5rem;
  padding: 0.875rem 1rem;
  border-left: 4px solid ${(props) => props.theme.colors.red};
  background-color: rgba(224, 49, 49, 0.08);
  border-radius: 6px;
  color: ${(props) => props.theme.colors.textMain};
`

export const FormGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  row-gap: 0.5rem;

  .field {
    width: 100%;
    padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
    padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
    margin-bottom: 0.5rem;
  }

  label {
    display: inline-block;
    margin-bottom: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.primaryDark};
  }

  input {
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    background-color: ${(props) => props.theme.colors.bgMain};
    color: ${(props) => props.theme.colors.textMain};
    padding: 0.65rem 0.8rem;
    font-family: inherit;
    font-size: 0.9rem;
    border-radius: 6px;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: ${(props) => props.theme.colors.accentWarm};
      background-color: ${(props) => props.theme.colors.white};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${(props) => props.theme.colors.textMuted};
      background-color: ${(props) => props.theme.colors.borderColor};
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    .field.half {
      width: 50%;
    }

    .field.third {
      width: 33.3333333333%;
    }
  }
`

export const ActionButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.accentWarm};
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 0.8rem 2.5rem;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.accentHover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const EmptyState = styled.div`
  ${cardSurface};
  padding: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.gray700};
`
