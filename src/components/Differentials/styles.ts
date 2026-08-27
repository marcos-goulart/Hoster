import styled from 'styled-components'

export const Main = styled.main`
  width: 100% !important;

  .container {
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;

    .title {
      margin-bottom: 3rem !important;
      width: 100% !important;

      h1 {
        text-align: center !important;
        font-weight: 700 !important;
        font-size: calc(1.275rem + 0.3vw) !important;
        margin-bottom: 0.5rem !important;
        margin-top: 0;
        line-height: 1.2;
      }
    }

    .row {
      row-gap: ${(props) => props.theme.Gutters.gutterX};
      display: flex;
      flex-wrap: wrap;
      margin-top: calc(${(props) => props.theme.Gutters.gutterY} * -1);
      margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
      margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);

      .inRow {
        flex: 0 0 auto;
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
        padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
        margin-top: ${(props) => props.theme.Gutters.gutterY};

        .beforeCard {
          margin-bottom: 1.5rem !important;
          display: flex;
          flex: 0 0 auto;
          width: 100%;
          flex-shrink: 0;
          max-width: 100%;
          padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
          padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
          margin-top: ${(props) => props.theme.Gutters.gutterY};
          text-align: left;

          .card {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            min-width: 0;
            word-wrap: break-word;
            background-color: ${(props) => props.theme.colors.white};
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.6rem;

            img {
              border-top-left-radius: calc(0.6rem - 1px);
              border-top-right-radius: calc(0.6rem - 1px);
              width: 100%;
              aspect-ratio: 16 / 9;
              object-fit: cover;
            }

            .cardBody {
              display: flex;
              flex-direction: column;
              flex: 1 1 auto;
              padding: 1rem 1rem;

              div {
                margin-bottom: 0.5rem;
              }

              p {
                color: ${(props) => props.theme.colors.phColor} !important;
                margin-top: 0;
                margin-bottom: 1rem;
              }

              p:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.sl}) {
    .container {
      max-width: 540px;
    }
  }
  @media (min-width: ${(props) => props.theme.screenMedias.md}) {
    .container {
      max-width: 720px;

      .title {
        margin-bottom: 3rem !important;

        h1 {
          text-align: left !important;
        }
      }
    }

    .beforeCard {
      flex: 0 0 auto;
      width: 33.3333333333%;
    }
  }
  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    .container {
      max-width: 960px;

      .title {
        padding-bottom: 0 !important;
        padding-top: 1.5rem !important;
        margin-bottom: 3rem !important;

        h1 {
          text-align: left !important;
        }
      }
    }

    .beforeCard {
      flex: 0 0 auto;
      width: 33.3333333333% !important;
    }
  }
  @media (min-width: ${(props) => props.theme.screenMedias.xl}) {
    .container {
      max-width: 1140px;

      .title {
        h1 {
          font-size: 1.5rem !important;
        }
      }
    }
  }
  @media (min-width: ${(props) => props.theme.screenMedias.xxl}) {
    .container {
      max-width: 1320px;
    }
  }
`
