import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 1.5rem !important;
  flex: 0 0 auto;
  width: 100%;

  h4 {
    color: ${(props) => props.theme.colors.accentGold} !important;
    font-family: ${(props) => props.theme.fontFamily.sans} !important;
    font-size: 0.95rem !important;
    text-transform: uppercase !important;
    letter-spacing: 1px;
    margin-bottom: 1rem !important;
    font-weight: 600;
  }

  p {
    margin-bottom: 0.6rem !important;
    margin-top: 0;
  }

  a {
    text-decoration: none !important;
    color: #b3a8a0;
    font-size: 0.88rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.colors.white};
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    width: 30%;
  }
`
