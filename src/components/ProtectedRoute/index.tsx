import type { ReactNode } from 'react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AuthModal } from '../AuthModal'

interface ProtectedRouteProps {
  children: ReactNode
  keepOnPage?: boolean
  message?: string
}

export function ProtectedRoute({
  children,
  keepOnPage = false,
  message = 'Você precisa estar logado para continuar.',
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(true)

  if (loading) {
    return null
  }

  // Se o usuário está autenticado, renderiza a página normalmente
  if (user) {
    return <>{children}</>
  }

  // Caso 1: Redireciona imediatamente para a Home
  if (!keepOnPage) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          openAuthModal: true,
          authMessage: message,
          redirectTo: location.pathname + location.search,
        }}
      />
    )
  }

  // Caso 2: Se fechar o modal no "X", redireciona para a Home em vez de deixar na tela privada
  const handleCloseModal = () => {
    setIsModalOpen(false)
    navigate('/', { replace: true })
  }

  return (
    <>
      <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} customMessage={message} />
    </>
  )
}
