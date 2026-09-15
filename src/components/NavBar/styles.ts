import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface ContainerProps {
  $isMenuOpen: boolean
}

interface ButtonProps {
  to?: string
}

export const NavContainer = styled.nav<ContainerProps>`
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  z-index: 9999;
  background-color: rgba(250, 250, 247, 0.95) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 5% !important;
    margin-right: auto;
    margin-left: auto;

    .brandLink {
      flex: 0 0 auto;
      padding-top: 0.3125rem;
      padding-bottom: 0.3125rem;
      margin-right: 1rem;
      font-family: ${(props) => props.theme.fontFamily.heading};
      font-size: 1.5rem;
      font-weight: ${(props) => props.theme.fontWeight.semibold};
      color: ${(props) => props.theme.colors.primaryDark};
      text-decoration: none;
      white-space: nowrap;
      letter-spacing: 1px;
    }

    .menu-toggle {
      flex: 0 0 auto;
      padding: 0.25rem 0.75rem;
      font-size: ${(props) => props.theme.fontSize.xl};
      line-height: 1;
      background-color: transparent;
      border: transparent;
      border-radius: 0.25rem;
      border-style: none;

      color: ${(props) => props.theme.colors.primaryDark};
      cursor: pointer;

      transition: box-shadow 0.15s ease-in-out;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .navbar-collapse {
    display: ${({ $isMenuOpen }) => ($isMenuOpen ? 'block' : 'none')};
    width: 100%;
    margin-top: 0.75rem;

    ul {
      display: flex;
      flex-direction: column;
      padding-left: 0;
      margin-top: 0;
      list-style: none;
      gap: 1rem;

      .nav-item {
        padding: 0.25rem 0;

        a {
          color: ${(props) => props.theme.colors.textMain};
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: ${(props) => props.theme.fontWeight.medium};
          transition: color 0.2s ease-in-out;

          &:hover {
            color: ${(props) => props.theme.colors.accentWarm};
          }
        }
      }

      .mobile-home-button {
        .nav-home-link {
          background-color: ${(props) => props.theme.colors.gray200};
          border: 1px solid ${(props) => props.theme.colors.borderColor};
          color: ${(props) => props.theme.colors.primaryDark};
          width: 100%;
          display: inline-block;
          text-align: center;
          padding: 0.375rem 0.75rem;

          &:hover {
            background-color: ${(props) => props.theme.colors.borderColor};
            color: ${(props) => props.theme.colors.primaryDark};
          }
        }
      }

      .login-button-item {
        padding: 0.25rem 0;
      }

      .btn-orange {
        color: ${(props) => props.theme.colors.white} !important;
        background-color: ${(props) => props.theme.colors.primaryDark};
        font-size: 0.95rem;
        font-weight: ${(props) => props.theme.fontWeight.semibold} !important;

        cursor: pointer;
        outline: none;
        box-shadow: none;
        border-radius: 6px !important;
        width: 100% !important;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.6rem 1.6rem;

        transition: all 0.3s ease;

        &:hover {
          background-color: ${(props) => props.theme.colors.accentWarm};
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
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    flex-flow: nowrap;
    justify-content: flex-start;

    .container {
      max-width: 1320px;

      .menu-toggle {
        display: none;
      }

      .brandLink {
        display: inline-flex;
        margin-right: 0;
      }

      .navbar-collapse {
        display: flex !important;
        flex-basis: auto;
        justify-content: flex-end !important;
        width: auto;
        margin-top: 0;

        ul {
          flex-direction: row;
          align-items: center;
          gap: 2rem;

          .nav-item {
            display: flex;
            align-items: center;
            padding: 0;
            margin-right: 0;
          }

          .login-button-item {
            margin-right: 0;

            a,
            button {
              padding-left: 1.6rem;
              padding-right: 1.6rem;
            }
          }

          .mobile-home-button {
            .nav-home-link {
              width: auto;
              display: inline;
              padding: 0;
              background-color: transparent;
              border: 0;
              color: ${(props) => props.theme.colors.textMain};

              &:hover {
                background-color: transparent;
                color: ${(props) => props.theme.colors.accentWarm};
              }
            }
          }
        }
      }
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

export const BrandLink = styled(Link).attrs({
  className: 'brandLink',
})``

export const NavLinkItem = styled(Link)``

export const Button = styled(Link)<ButtonProps>``

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    font-size: ${(props) => props.theme.fontSize.base};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.black2};
  }

  .btn-logout {
    background: transparent;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    border-radius: 0.375rem;
    padding: 0.375rem 0.85rem;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.gray700};
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.colors.gray200};
      color: ${(props) => props.theme.colors.black1};
    }
  }
`
