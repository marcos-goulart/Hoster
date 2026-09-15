import styled from 'styled-components'

export const Main = styled.main`
  position: relative;
  width: 100% !important;
  min-height: calc(100vh - 72px) !important;
  padding: 4rem 1rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  .banner-bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    transform: translateZ(0);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(rgba(44, 30, 22, 0.45), rgba(44, 30, 22, 0.55));
      z-index: 2;
    }

    img {
      width: 100vw;
      height: 115%;
      object-fit: cover;
      object-position: center;
      will-change: transform;
      transform: translateZ(0);
    }
  }

  .container {
    position: relative;
    z-index: 100;
    width: 100%;
    max-width: 1320px;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
  }

  .hero-title {
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .hero-subtitle {
    color: #f0eae1;
    font-size: 1rem;
    margin-bottom: 2rem;
    font-weight: 300;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .card {
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
    border-radius: 12px;
    padding: 0.5rem !important;
    box-shadow: ${(props) => props.theme.shadows.soft} !important;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    overflow: visible !important;
  }

  .card-body {
    flex: 1 1 auto;
    padding: 0.8rem !important;
    background-color: transparent;
    word-wrap: break-word;
    text-align: left;
    overflow: visible !important;
  }

  @media (max-width: ${(props) => props.theme.screenMedias.md}) {
    min-height: calc(100vh - 60px) !important;

    .hero-title {
      font-size: 2rem;
    }
    .hero-subtitle {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
  }
`
