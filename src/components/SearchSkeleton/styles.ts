import styled, { css, keyframes } from 'styled-components'

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
