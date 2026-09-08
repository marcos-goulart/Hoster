import styled from 'styled-components'
import { SectionLinkButton } from '../SectionLinkButton'

export const Main = styled.main`
  padding-bottom: 3rem !important;
  width: 100% !important;

  .container {
    padding-bottom: 0.5rem !important;
    padding-top: 3rem !important;
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;

    h1 {
      text-align: center !important;
      font-weight: 700 !important;
      font-size: calc(1.275rem + 0.3vw) !important;
      margin-bottom: 3rem !important;
      margin-top: 0;
      line-height: 1.2;
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
    padding-bottom: 3rem !important;
    padding-top: 1.5rem !important;

    .container {
      padding-bottom: 0 !important;
      padding-top: 3rem !important;
      max-width: 960px;

      h1 {
        text-align: left !important;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.xl}) {
    .container {
      max-width: 1140px;

      h1 {
        font-size: 1.5rem !important;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.xxl}) {
    .container {
      max-width: 1320px;
    }
  }
`

export const HotelsContainer = styled.div`
  row-gap: ${(props) => props.theme.Gutters.gutterX};
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(${(props) => props.theme.Gutters.gutterY} * -1);
  margin-right: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  margin-left: calc(${(props) => props.theme.Gutters.gutterX} / -2);
  margin-bottom: 1.5rem !important;
  text-align: left;
`

export const ViewAllWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const ViewAllButton = styled(SectionLinkButton)`
  color: ${(props) => props.theme.colors.orange};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.orange};
  border-radius: 0.25rem;
  text-decoration: none;
  text-align: center;
  padding: 0.375rem 1.5rem;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.orange};
    border-color: ${(props) => props.theme.colors.orange};
  }
`
