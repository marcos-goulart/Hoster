import styled from 'styled-components'
import { SectionLinkButton } from '../SectionLinkButton'

export const Main = styled.main`
  padding-bottom: 3.5rem !important;
  padding-top: 3.5rem !important;
  width: 100% !important;

  .container {
    max-width: 1320px;
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

export const PromotionsContainer = styled.div`
  row-gap: ${(props) => props.theme.Gutters.gutterX};
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(${(props) => props.theme.Gutters.gutterY} * -1);
  margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  margin-bottom: 2rem !important;
  text-align: left;
`

export const ViewAllWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

export const ViewAllButton = styled(SectionLinkButton)`
  color: ${(props) => props.theme.colors.accentWarm};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.accentWarm};
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  padding: 0.7rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.accentWarm};
    border-color: ${(props) => props.theme.colors.accentWarm};
  }
`
