import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BrandLink, Button, NavContainer, NavLinkItem, UserMenu } from './styles'
import { useAuth } from '../../hooks/useAuth'
import { AuthModal } from '../AuthModal/index'

export function Navbar() {
  const { isLogged, logout, user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleCloseMenu = () => {
    setMenuOpen(false)
  }

  const handleOpenAuthModal = () => {
    handleCloseMenu()
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <NavContainer $isMenuOpen={menuOpen}>
        <div className="container">
          <BrandLink className="text-words-reveal" onClick={handleCloseMenu} to="/">
            Hoster
          </BrandLink>

          <button type="button" className="menu-toggle" onClick={handleToggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>

          <div className="navbar-collapse">
            <ul>
              {!isHomePage ? (
                <li className="nav-item mobile-home-button">
                  <NavLinkItem className="nav-home-link" onClick={handleCloseMenu} to="/">
                    Home
                  </NavLinkItem>
                </li>
              ) : null}

              <li className="nav-item login-button-item">
                {!isLogged ? (
                  <Button
                    as="button"
                    className="btn-orange"
                    onClick={handleOpenAuthModal}
                    type="button"
                  >
                    Login
                  </Button>
                ) : (
                  <UserMenu>
                    <span>{user?.displayName || 'Minha Conta'}</span>
                    <button type="button" onClick={logout} className="btn-logout">
                      Sair
                    </button>
                  </UserMenu>
                )}
              </li>
            </ul>
          </div>
        </div>
      </NavContainer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
