import type { ReactNode } from 'react'
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AuthModal } from '../AuthModal'

interface ProtectedRouteProps {
  children: ReactNode
  /**
   * Se true, o usuário permanece na página atual e o modal de login abre.
   * Se false (padrão), o usuário é redirecionado para a Home e o modal abre.
   */
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
  const [isModalOpen, setIsModalOpen] = useState(true)

  if (loading) {
    return null
  }

  // Caso 1: Usuário não logado em rotas com redirecionamento (ex: /perfil, /minhas-viagens)
  if (!user && !keepOnPage) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          openAuthModal: true,
          authMessage: message,
          redirectTo: location.pathname,
        }}
      />
    )
  }

  // Caso 2: Usuário não logado em rota com permanência na página (ex: /pre-reserva/:hotelId)
  if (!user && keepOnPage) {
    return (
      <>
        {children}
        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          customMessage={message}
        />
      </>
    )
  }

  return <>{children}</>
}
