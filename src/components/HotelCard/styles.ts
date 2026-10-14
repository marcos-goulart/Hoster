import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Div = styled.div<{ $isPromotion?: boolean }>`
  margin-bottom: 2rem !important;
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
  padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
  margin-top: ${(props) => props.theme.Gutters.gutterY};

  .card {
    border: 1px solid ${(props) => props.theme.colors.borderColor} !important;
    box-shadow: ${(props) => props.theme.shadows.soft};
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 0;
    word-wrap: break-word;
    background-color: ${(props) => props.theme.colors.bgCard};
    background-clip: border-box;
    border-radius: 12px;
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${(props) => props.theme.shadows.hover};
    }

    .imgDiv {
      position: relative !important;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;

      img.parallax-img {
        width: 100%;
        height: 120%;
        object-fit: cover;
        display: block;
        will-change: transform;
        transition: transform 0.5s ease;
      }

      .priceBadge {
        color: ${(props) => props.theme.colors.white};
        background: rgba(44, 30, 22, 0.9);
        backdrop-filter: blur(4px);
        right: 1rem !important;
        bottom: 1rem !important;
        padding: 0.4rem 0.85rem !important;
        position: absolute !important;
        z-index: 2;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        border-radius: 6px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

        .priceOld {
          color: ${(props) => props.theme.colors.gray300};
          text-decoration: line-through;
          font-size: 0.75rem;
          margin-right: 0.2rem;
          font-weight: 400;
          opacity: 0.9;
        }

        .priceNew {
          color: ${(props) => props.theme.colors.white};
          font-weight: 700;
          font-size: 0.9rem;
        }
      }

      .favorite-btn {
        position: absolute !important;
        top: 0.75rem !important;
        right: 0.75rem !important;
        z-index: 3 !important;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
        border: none;
        border-radius: 50%;
        width: 2.25rem;
        height: 2.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

        &:hover {
          transform: scale(1.1);
          background: #ffffff;
        }

        svg {
          font-size: 1.1rem;
          color: #4b5563;
          transition: color 0.2s ease;

          &.active {
            color: #ef4444;
          }
        }
      }
    }

    .cardBody {
      display: flex;
      flex-direction: column;
      padding: 1.5rem !important;
      flex: 1 1 auto;

      h5 {
        margin-bottom: 0.3rem !important;
        font-family: ${(props) => props.theme.fontFamily.heading};
        font-size: 1.3rem;
        font-weight: 600;
        line-height: 1.3;
        color: ${(props) => props.theme.colors.primaryDark};
      }

      .location {
        font-size: 0.85rem;
        color: ${(props) => props.theme.colors.textMuted} !important;
        margin-bottom: 0.8rem;
      }

      .description {
        font-size: 0.9rem;
        color: ${(props) => props.theme.colors.textMain} !important;
        margin-bottom: 0;
        flex: 1 1 auto;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    flex: 0 0 auto;
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
`

export const CardLink = styled(Link)``
