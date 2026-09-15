import styled from 'styled-components'

export const Main = styled.main`
  width: 100% !important;
  padding-top: 4.5rem !important;
  padding-bottom: 4.5rem !important;

  .container {
    max-width: 1200px;
    width: 100%;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    margin-right: auto;
    margin-left: auto;
  }

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

  .lineOrange {
    display: none;
  }

  .row {
    row-gap: ${(props) => props.theme.Gutters.gutterX};
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin-top: calc(${(props) => props.theme.Gutters.gutterY} * -1);
    margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
    margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);
    padding-top: 1rem;
  }

  .col {
    flex: 0 0 auto;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(${(props) => props.theme.Gutters.gutterX} / 2);
    padding-left: calc(${(props) => props.theme.Gutters.gutterX} / 2);
    margin-top: ${(props) => props.theme.Gutters.gutterY};
    margin-bottom: 1.5rem !important;
    display: flex;
  }

  .card {
    border: 1px solid ${(props) => props.theme.colors.borderColor} !important;
    box-shadow: ${(props) => props.theme.shadows.soft} !important;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: ${(props) => props.theme.colors.bgCard};
    background-clip: border-box;
    border-radius: 12px;
    padding: 1.5rem !important;
    width: 100%;
    height: 100%;
  }

  .cardBody {
    flex: 1 1 auto;
    padding: 0;
    text-align: left;
    display: flex;
    flex-direction: column;

    h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.primaryDark};
      line-height: 1.3;
    }

    p {
      margin-top: 0.8rem;
      margin-bottom: 0;
      color: ${(props) => props.theme.colors.textMuted};
      font-size: 0.88rem;
      font-style: italic;
    }
  }

  .header {
    margin-bottom: 0.5rem !important;
  }

  .stars {
    display: flex;
    gap: 0.2rem;
    margin-top: 0.3rem;
  }

  .star {
    display: inline-flex;
    width: 18px;
    height: 18px;
    color: ${(props) => props.theme.colors.accentGold};
  }

  .star svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    display: block;
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
    .container {
      max-width: 960px;
    }

    .col {
      width: 33.3333333333%;
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
