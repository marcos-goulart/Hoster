import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FaSuitcase,
  FaHeart,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
} from 'react-icons/fa'
import { getUserInitials } from '../../../utils/userUtils'
import { DropdownContainer, DropdownMenu } from './styles'

interface UserDropdownMenuProps {
  user: {
    displayName?: string | null
    email?: string | null
    photoURL?: string | null
  } | null
  onLogout: () => void
  onCloseMobileMenu?: () => void
}

export function UserDropdownMenu({ user, onLogout, onCloseMobileMenu }: UserDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
    if (onCloseMobileMenu) onCloseMobileMenu()
  }

  const initials = getUserInitials(user?.displayName)

  return (
    <DropdownContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        className="user-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {user?.photoURL ? (
          <img src={user.photoURL} alt={user.displayName || 'Avatar'} className="avatar-img" />
        ) : (
          <div className="avatar-fallback">{initials}</div>
        )}
        <span className="user-name">{user?.displayName || 'Minha Conta'}</span>
        {isOpen ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
      </button>

      {isOpen && (
        <DropdownMenu>
          <div className="user-header">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Avatar'}
                className="header-avatar"
              />
            ) : (
              <div className="header-fallback">{initials}</div>
            )}
            <div className="header-info">
              <strong className="header-name">{user?.displayName || 'Usuário'}</strong>
              <span className="header-email">{user?.email || ''}</span>
            </div>
          </div>

          <nav className="menu-nav">
            <Link to="/minhas-viagens" onClick={handleLinkClick}>
              <FaSuitcase />
              Minhas Viagens
            </Link>
            <Link to="/favoritos" onClick={handleLinkClick}>
              <FaHeart />
              Favoritos
            </Link>
            <Link to="/perfil" onClick={handleLinkClick}>
              <FaUser />
              Minha Conta
            </Link>
          </nav>

          <div className="menu-footer">
            <button
              type="button"
              className="logout-btn"
              onClick={() => {
                handleLinkClick()
                onLogout()
              }}
            >
              <FaSignOutAlt />
              Sair
            </button>
          </div>
        </DropdownMenu>
      )}
    </DropdownContainer>
  )
}
