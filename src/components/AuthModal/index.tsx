import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { LoginForm } from '../LoginForm'
import { RegisterForm } from '../RegisterForm'
import { AuthNotice, CloseButton, ModalContent, Overlay, TabHeader } from './styles'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  customMessage?: string
}

export function AuthModal({ isOpen, onClose, customMessage }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const location = useLocation()
  const messageToShow =
    customMessage || (location.state as { authMessage?: string } | null)?.authMessage || null

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton type="button" onClick={onClose} aria-label="Fechar">
          <IoClose />
        </CloseButton>

        {messageToShow && (
          <AuthNotice>
            <p>{messageToShow}</p>
          </AuthNotice>
        )}

        <TabHeader>
          <button
            type="button"
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            Entrar
          </button>
          <button
            type="button"
            className={activeTab === 'register' ? 'active' : ''}
            onClick={() => setActiveTab('register')}
          >
            Criar Conta
          </button>
        </TabHeader>

        {activeTab === 'login' ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <RegisterForm onSuccess={onClose} />
        )}
      </ModalContent>
    </Overlay>
  )
}
