import styled from 'styled-components'
import banner from '../../img/banners/banner-home.jpeg'

export const Main = styled.main`
  width: 100% !important;
  height: 100%;
  min-height: 100vh !important;
  display: flex !important;
  align-items: center !important;
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .container {
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
  }

  .card {
    background-color: #fff;
    border: 0 !important;
    border-width: none;
    border-radius: 0.5rem;
    padding: 0.25rem !important;
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
  }

  .card-body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
    background-color: transparent;
    word-wrap: break-word;
    text-align: left;
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
    .card {
      padding-bottom: 0 !important;
    }
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    .container {
      max-width: 960px;
    }
    .card {
      padding: 1.5rem !important;
      padding-bottom: 0 !important;
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
