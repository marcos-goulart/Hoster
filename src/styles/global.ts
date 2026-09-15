import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar{
    display: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  html, body, #root {
    line-height: 1.6;
    min-height: 100%;
  }

  body {
    font-family: ${(props) => props.theme.fontFamily.sans};
    font-size: ${(props) => props.theme.fontSize.base};
    background-color: ${(props) => props.theme.colors.bgMain};
    color: ${(props) => props.theme.colors.textMain};
    font-weight: ${(props) => props.theme.fontWeight.normal};
    width: 100%;
    height: 100%;
  }

  h1, h2, h3, h4 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.primaryDark};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }
`
