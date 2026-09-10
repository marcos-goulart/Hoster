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
      await signInWithEmailAndPassword(auth, email, password)
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

      // Envia o e-mail de verificação para validar a posse da conta
      await sendEmailVerification(userCredential.user)

      setUser({ ...userCredential.user, displayName: name })
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
