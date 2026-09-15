import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 1.5rem !important;
  flex: 0 0 auto;
  width: 100%;
  padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
  padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
  margin-top: ${(props) => props.theme.Gutters.gutterY};

  h4 {
    color: ${(props) => props.theme.colors.white} !important;
    font-family: ${(props) => props.theme.fontFamily.heading} !important;
    font-size: 1.6rem !important;
    text-transform: none !important;
    font-weight: 600 !important;
    margin-bottom: 0.8rem !important;
  }

  p {
    color: #b3a8a0 !important;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    max-width: 360px;

    a {
      text-decoration: none !important;
      color: #b3a8a0 !important;
      margin-right: 0.75rem !important;
      transition: color 0.3s ease;

      &:hover {
        color: ${(props) => props.theme.colors.white} !important;
      }

      i {
        display: inline-block;
        text-rendering: auto;

        svg {
          width: 1.2rem;
          height: 1.2rem;
          transition:
            transform 0.3s ease,
            color 0.3s ease;
        }

        &:hover {
          color: ${(props) => props.theme.colors.white} !important;
          svg {
            transform: scale(1.2);
          }
        }
      }
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    width: 40%;
  }
`
