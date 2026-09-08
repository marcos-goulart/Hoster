import { createContext } from 'react'
import type { AuthContextType } from '../interfaces/AuthContextType'

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  login: () => {},
  logout: () => {},
})
