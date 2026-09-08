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
  margin-bottom: 3rem;

  h1 {
    font-size: ${(props) => props.theme.fontSize['2xl']};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-bottom: 0.5rem;
  }

  .line {
    width: 5rem;
    height: 0.25rem;
    background-color: ${(props) => props.theme.colors.orange};
  }
`

const cardSurface = css`
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08);
  border-radius: 0.25rem;
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
    font-size: ${(props) => props.theme.fontSize.xl};
    margin-bottom: 0.25rem;
  }

  .location {
    color: ${(props) => props.theme.colors.phColor};
    margin-bottom: 0.75rem;
  }

  .stars {
    display: flex;
    gap: 0.25rem;
    color: ${(props) => props.theme.colors.yellow};
    margin-bottom: 1rem;
  }

  .price {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 1rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};

    .oldPrice {
      color: ${(props) => props.theme.colors.phColor};
      text-decoration: line-through;
      font-weight: ${(props) => props.theme.fontWeight.normal};
    }
  }

  .description {
    color: ${(props) => props.theme.colors.gray700};
    margin-top: 1rem;
  }
`

export const StatusBadge = styled.div<{ $isAvailable: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1rem;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.$isAvailable ? props.theme.colors.darkGreen : props.theme.colors.red};
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
  padding: 1.5rem;

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
    border-radius: 0.25rem;
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
  padding: 1.5rem;
  text-align: left;

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
`

export const Notice = styled.div`
  margin-bottom: 1.5rem;
  padding: 0.875rem 1rem;
  border-left: 4px solid ${(props) => props.theme.colors.red};
  background-color: rgba(224, 49, 49, 0.08);
  color: ${(props) => props.theme.colors.gray800};
`

export const FormGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  row-gap: 0.25rem;

  .field {
    width: 100%;
    padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
    padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
  }

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }

  input {
    width: 100%;
    border: 2px solid ${(props) => props.theme.colors.bgBrown2};
    background-color: ${(props) => props.theme.colors.bgBrown2};
    color: ${(props) => props.theme.colors.bgBrown1};
    padding: 0.625rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 0;
    transition:
      border-color 0.15s ease-in-out,
      background-color 0.15s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.blue};
      background-color: ${(props) => props.theme.colors.white};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${(props) => props.theme.colors.gray600};
      background-color: ${(props) => props.theme.colors.gray200};
      border-color: ${(props) => props.theme.colors.gray200};
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
  background-color: ${(props) => props.theme.colors.orange};
  border: 1px solid transparent;
  padding: 0.625rem 1.75rem;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.15s ease-in-out,
    opacity 0.15s ease-in-out;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.orange2};
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
