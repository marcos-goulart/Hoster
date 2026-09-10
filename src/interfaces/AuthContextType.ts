import type { User } from 'firebase/auth'
export interface AuthContextType {
  user: User | null
  isLogged: boolean
  loading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}
