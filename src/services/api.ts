import type { AxiosError } from 'axios'
import axios, { type InternalAxiosRequestConfig } from 'axios'
import { auth } from './firebase'
import { toast } from 'sonner'

export const NETWORK_ERROR_TOAST_ID = 'server-connection-error'
export const NETWORK_ERROR_COOLDOWN_MS = 4000
export const NETWORK_ERROR_MESSAGE =
  'Erro de conexão com o servidor. Verifique sua internet ou tente novamente'

let lastNetworkToastAt = 0

export function isConnectionError(error: unknown): boolean {
  if (!error) return false
  const err = error as AxiosError
  return (
    !err.response ||
    err.code === 'ERR_NETWORK' ||
    err.code === 'ECONNABORTED' ||
    err.message === 'Network Error'
  )
}

export function notifyConnectionError(message?: string): void {
  const now = Date.now()
  if (now - lastNetworkToastAt < NETWORK_ERROR_COOLDOWN_MS) {
    return
  }
  lastNetworkToastAt = now

  toast.error(message || NETWORK_ERROR_MESSAGE, {
    id: NETWORK_ERROR_TOAST_ID,
  })
}

export function resetNetworkToastCooldown(): void {
  lastNetworkToastAt = 0
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const currentUser = auth.currentUser

    if (currentUser) {
      try {
        const token = await currentUser.getIdToken()
        config.headers.Authorization = `Bearer ${token}`
      } catch (error) {
        console.error('Erro ao obter ID Token do Firebase:', error)
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string; message?: string }>) => {
    if (isConnectionError(error)) {
      notifyConnectionError()
      return Promise.reject(error)
    }

    const { status, data } = error.response!
    const errorMessage = data?.error || data?.message || 'Ocorreu um erro inesperado'

    switch (status) {
      case 401:
        // Sessão expirada ou não autorizada
        toast.error('Sessão expirada. Faça login novamente.', {
          id: 'auth-session-expired',
        })
        break
      case 403:
        // Evita piscar o toast de erro 403 na tela de cadastro
        if (errorMessage.includes('ainda não foi verificada')) {
          break
        }
        toast.error('Você não tem permissão para realizar esta ação.', {
          id: 'auth-forbidden',
        })
        break
      case 404:
        toast.error('O recurso solicitado não foi encontrado.')
        break
      case 400:
        toast.error(errorMessage)
        break
      case 500:
        toast.error('Erro interno no servidor. Tente novamente mais tarde.', {
          id: 'server-internal-error',
        })
        break
      default:
        toast.error(errorMessage)
    }

    return Promise.reject(error)
  },
)

export default api
