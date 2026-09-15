import styled from 'styled-components'

export const Main = styled.main`
  width: 100% !important;
  padding-top: 3.5rem !important;
  padding-bottom: 3.5rem !important;

  .container {
    max-width: 1320px;
    width: 100%;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    margin-right: auto;
    margin-left: auto;

    .title {
      margin-bottom: 2.5rem !important;
      width: 100% !important;

      h1 {
        text-align: center !important;
        font-family: ${(props) => props.theme.fontFamily.heading};
        font-weight: ${(props) => props.theme.fontWeight.semibold} !important;
        font-size: 1.75rem !important;
        color: ${(props) => props.theme.colors.primaryDark};
        margin-bottom: 0.5rem !important;
        margin-top: 0;
        line-height: 1.3;
        position: relative;
        display: block;

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
            background-color: ${(props) => props.theme.colors.bgCard};
            background-clip: border-box;
            border: 1px solid ${(props) => props.theme.colors.borderColor};
            border-radius: 12px;
            box-shadow: ${(props) => props.theme.shadows.soft};
            overflow: hidden;

            .imgWrapper {
              position: relative;
              width: 100%;
              aspect-ratio: 16 / 9;
              overflow: hidden;

              img.parallax-img {
                width: 100%;
                height: 120%;
                object-fit: cover;
                display: block;
                will-change: transform;
              }
            }

            .cardBody {
              display: flex;
              flex-direction: column;
              flex: 1 1 auto;
              padding: 1.2rem 1.5rem 1.5rem;

              div {
                margin-bottom: 0.5rem;
                font-family: ${(props) => props.theme.fontFamily.heading};
                font-size: 1.1rem;
                font-weight: 600;
                color: ${(props) => props.theme.colors.primaryDark};
              }

              p {
                color: ${(props) => props.theme.colors.textMuted} !important;
                font-size: 0.88rem;
                margin-top: 0;
                margin-bottom: 0.5rem;
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
    }

    .beforeCard {
      flex: 0 0 auto;
      width: 33.3333333333%;
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    .container {
      max-width: 960px;
    }

    .beforeCard {
      flex: 0 0 auto;
      width: 33.3333333333% !important;
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.xl}) {
    .container {
      max-width: 1320px;
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.xxl}) {
    .container {
      max-width: 1320px;
    }
  }
`
