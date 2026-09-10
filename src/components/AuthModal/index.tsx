import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { LoginForm } from '../../pages/Login/LoginForm'
import { RegisterForm } from '../../pages/Login/RegisterForm'
import { CloseButton, ModalContent, Overlay, TabHeader } from './styles'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  if (!isOpen) return null

  // Fecha o modal ao clicar no overlay escuro
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
