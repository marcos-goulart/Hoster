import styled, { css, keyframes } from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
`

export const MainSection = styled.main`
  width: 100%;
  padding-bottom: 3rem;
  padding-top: 3rem;

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
    padding-top: 4rem;

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

export const SectionHeader = styled.header`
  margin-bottom: 2.5rem;
  text-align: center;

  h1 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 1.75rem;
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.primaryDark};
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;

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

  p {
    color: ${(props) => props.theme.colors.textMuted};
    max-width: 42rem;
    margin: 0.5rem auto 0;
    font-size: 0.95rem;
  }
`

export const HotelsGrid = styled.div`
  row-gap: ${(props) => props.theme.Gutters.gutterX};
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(${(props) => props.theme.Gutters.gutterY} * -1);
  margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  text-align: left;
`

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
`

const skeletonSurface = css`
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

export const SkeletonGrid = styled(HotelsGrid)``

export const SkeletonCard = styled.div`
  margin-bottom: 3rem !important;
  flex: 0 0 auto;
  width: 100%;
  padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
  padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
  margin-top: ${(props) => props.theme.Gutters.gutterY};

  .image {
    ${skeletonSurface};
    aspect-ratio: 4 / 3;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  .content {
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .line,
  .button {
    ${skeletonSurface};
    border-radius: 0.25rem;
  }

  .title {
    height: 1.4rem;
    width: 72%;
  }

  .subtitle {
    height: 1rem;
    width: 48%;
  }

  .body {
    height: 0.95rem;
    width: 100%;

    &.short {
      width: 82%;
    }
  }

  .button {
    height: 2.75rem;
    width: 100%;
    margin-top: 0.25rem;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    width: 33.3333333333%;
  }
`

export const EmptyState = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.gray700};
  text-align: center;
  padding: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08);
`
