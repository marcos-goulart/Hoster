import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  type User,
} from 'firebase/auth'

import { auth, googleProvider } from '../services/firebase'
import { AuthContext } from './AuthContextInstance'

auth.useDeviceLanguage()

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Verifica se é uma conta de e-mail/senha que ainda não foi verificada
        const isPasswordAccount = currentUser.providerData.some((p) => p.providerId === 'password')

        if (isPasswordAccount && !currentUser.emailVerified) {
          // Mantém o usuário como deslogado para a aplicação não disparar requisições privadas
          setUser(null)
          setLoading(false)
          return
        }
      }

      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error('Erro ao realizar login com o google: ', error)
      throw error
    }
  }

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // Verifica se o e-mail foi validado antes de permitir o acesso
      if (!userCredential.user.emailVerified) {
        await signOut(auth)
        // Lança um erro customizado para o nosso tratador capturar
        throw { code: 'auth/email-not-verified' }
      }
    } catch (error) {
      console.error('Erro ao realizar login com o e-mail/senha: ', error)
      throw error
    }
  }

  const registerWithEmail = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Atualiza o nome de exibição no perfil do Firebase
      await updateProfile(userCredential.user, { displayName: name })

      // Envia o e-mail de verificação
      await sendEmailVerification(userCredential.user)

      // Força o logout imediato para que ele não acesse rotas privadas sem verificar
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Erro ao criar conta: ', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error ao encerrar sessão: ', error)
      throw error
    }
  }

  // Função para reenviar o e-mail caso o usuário precise
  const resendVerification = async (email: string, password: string) => {
    try {
      // O Firebase exige autenticação temporária para disparar o e-mail novamente
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(userCredential.user)
      await signOut(auth)
    } catch (error) {
      console.error('Erro ao reenviar verificação: ', error)
      throw error
    }
  }

  const isLogged = Boolean(user)

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        loading,
        signInWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        resendVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
