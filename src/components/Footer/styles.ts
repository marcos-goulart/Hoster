import styled from 'styled-components'
export const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.primaryDark};
  color: #E8E2DB;
  width: 100% !important;
  text-align: left;
  margin-top: 4rem;

  .container {
    padding-top: 3.5rem !important;
    padding-bottom: 2rem !important;
    max-width: 1200px;
    margin: 0 auto;
  }

  .copy {
    color: #8C8078;
    background-color: transparent;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    display: flex !important;
    padding: 1.5rem 0;
    font-size: 0.8rem;
  }

  @media (min-width: ${(props) => props.theme.screenMedias.sl}) {
    .container {
      max-width: 540px;
    }
  }
  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    .container {
      max-width: 720px;
      width: 100%;
      padding-right: 1.5rem;
      padding-left: 1.5rem;
      margin-right: auto;
      margin-left: auto;

      .row {
        display: flex;
        flex-wrap: wrap;
        margin-top: calc(${(props) => props.theme.Gutters.gutterY} * -1);
        margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
        margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);
      }
    }
  }
  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
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
