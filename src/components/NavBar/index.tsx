import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BrandLink, Button, NavContainer, NavLinkItem } from './styles'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleCloseMenu = () => {
    setMenuOpen(false)
  }

  return (
    <NavContainer $isMenuOpen={menuOpen}>
      <div className='container'>
        <BrandLink to='/' onClick={handleCloseMenu}>
          Hoster
        </BrandLink>
        <button type='button' className='menu-toggle' onClick={handleToggleMenu}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.5em'
            height='1.5em'
            fill='currentColor'
            className='bi bi-list'
            viewBox='0 0 16 16'
          >
            {/* Horizontal lines for the list icon */}
            <path
              fillRule='evenodd'
              d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
            />
          </svg>
        </button>
        <div className='navbar-collapse'>
          <ul>
            {!isHomePage ? (
              <li className='nav-item mobile-home-button'>
                <NavLinkItem to='/' className='nav-home-link' onClick={handleCloseMenu}>
                  Home
                </NavLinkItem>
              </li>
            ) : null}
            <li className='nav-item login-button-item'>
              <Button to='/login' className='btn-orange' onClick={handleCloseMenu}>
                Login
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </NavContainer>
  )
}
