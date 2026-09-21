import styled from 'styled-components'

export const GalleryWrapper = styled.div`
  position: relative;

  .image-counter-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    color: ${(props) => props.theme.colors.white};
    padding: 0.35rem 0.85rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 5;
    pointer-events: none;
  }

  .photo-grid-3 {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(2, 170px);
    gap: 0.5rem;
    border-radius: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      display: block;
      transition:
        opacity 0.2s ease,
        transform 0.3s ease;

      &:hover {
        opacity: 0.92;
        transform: scale(1.02);
      }
    }

    .main-photo {
      grid-row: span 2;
    }
  }

  @media (max-width: ${(props) => props.theme.screenMedias.sl}) {
    .photo-grid-3 {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 180px);

      .main-photo {
        grid-row: span 1;
      }
    }
  }
`
