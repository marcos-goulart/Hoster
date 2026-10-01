import type { AxiosError } from 'axios'
import axios, { type InternalAxiosRequestConfig } from 'axios'
import { auth } from './firebase'
import { toast } from 'sonner'

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
    if (!error.response) {
      toast.error('Erro de conexão com o servidor. Verifique sua internet ou tente novamente')
      return Promise.reject(error)
    }

    const { status, data } = error.response
    const errorMessage = data?.error || data?.message || 'Ocorreu um erro inesperado'

    switch (status) {
      case 401:
        // Sessão expirada ou não autorizada
        toast.error('Sessão expirada. Faça login novamente.')
        break
      case 403:
        toast.error('Você não tem permissão para realizar esta ação.')
        break
      case 404:
        toast.error('O recurso solicitado não foi encontrado.')
        break
      case 400:
        toast.error(errorMessage)
        break
      case 500:
        toast.error('Erro interno no servidor. Tente novamente mais tarde.')
        break
      default:
        toast.error(errorMessage)
    }

    return Promise.reject(error)
  },
)

export default api
