import { createContext } from 'react'
import type { AuthContextType } from '../interfaces/AuthContextType'

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogged: false,
  loading: true,
  signInWithGoogle: async () => {},
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  logout: async () => {},
})
