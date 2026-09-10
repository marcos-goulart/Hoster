import type { User } from 'firebase/auth'
export interface AuthContextType {
  user: User | null
  isLogged: boolean
  loading: boolean
  signInWithGoogle: () => Promise<void>
  loginWithEmail: (email: string, password: string) => Promise<void>
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
