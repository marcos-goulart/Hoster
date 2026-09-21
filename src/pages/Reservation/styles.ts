import styled, { css, keyframes } from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.bgMain};
`

export const MainContent = styled.main`
  min-height: 100vh;
  padding: 2.5rem 1.5rem 4rem;

  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }

  @media (max-width: ${(props) => props.theme.screenMedias.md}) {
    padding: 1.5rem 1rem 3rem;
  }
`

/* Cabeçalho do Hotel */
export const HotelHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.75rem;
  gap: 1rem;

  .header-left {
    h1 {
      font-family: ${(props) => props.theme.fontFamily.heading};
      font-size: 2.1rem;
      color: ${(props) => props.theme.colors.primaryDark};
      margin: 0;
      line-height: 1.2;
    }

    p {
      color: ${(props) => props.theme.colors.textMuted};
      font-size: 0.95rem;
      margin-top: 0.35rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
  }

  .rating-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background-color: #fffbeb;
    border: 1px solid #fde68a;
    padding: 0.5rem 0.85rem;
    border-radius: 8px;
    color: #b45309;
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  @media (max-width: ${(props) => props.theme.screenMedias.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    .header-left h1 {
      font-size: 1.65rem;
    }
  }
`

/* Grid Principal em 2 Colunas */
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  min-width: 0;
`

export const RightContent = styled.div`
  min-width: 0;

  &.sticky-checkout {
    position: sticky;
    top: 2rem;
    z-index: 10;
  }

  @media (max-width: 1024px) {
    &.sticky-checkout {
      position: static;
    }
  }
`

/* Card Base de Conteúdo */
export const Card = styled.div`
  background: ${(props) => props.theme.colors.bgCard};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);

  @media (max-width: ${(props) => props.theme.screenMedias.sl}) {
    padding: 1.25rem;
  }
`

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: ${(props) => props.theme.colors.borderColor};
  margin: 1.75rem 0;
`

/* Skeleton Loading */
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

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 2.5rem;

  .gallery-skeleton {
    ${skeletonBlock};
    height: 350px;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .card-skeleton {
    ${skeletonBlock};
    height: 480px;
    border-radius: 12px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export const SuccessNotice = styled.div`
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #15803d;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  line-height: 1.5;

  strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
`

export const EmptyState = styled.div`
  background: ${(props) => props.theme.colors.bgCard};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 1.1rem;

  a {
    display: inline-block;
    margin-top: 1rem;
    color: ${(props) => props.theme.colors.accentWarm};
    font-weight: 600;
  }
`
