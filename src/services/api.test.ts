import { beforeEach, describe, expect, it, vi } from 'vitest'
import { toast } from 'sonner'
import api, {
  isConnectionError,
  NETWORK_ERROR_COOLDOWN_MS,
  NETWORK_ERROR_MESSAGE,
  NETWORK_ERROR_TOAST_ID,
  notifyConnectionError,
  resetNetworkToastCooldown,
} from './api'

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

vi.mock('./firebase', () => ({
  auth: {
    currentUser: null,
  },
}))

describe('api client connection error deduplication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    resetNetworkToastCooldown()
  })

  describe('isConnectionError', () => {
    it('deve retornar true quando não houver response no erro (erro de rede/offline)', () => {
      const error = { message: 'Network Error' }
      expect(isConnectionError(error)).toBe(true)
    })

    it('deve retornar true quando error.code for ERR_NETWORK ou ECONNABORTED', () => {
      expect(isConnectionError({ code: 'ERR_NETWORK' })).toBe(true)
      expect(isConnectionError({ code: 'ECONNABORTED' })).toBe(true)
    })

    it('deve retornar false quando for um erro com resposta HTTP (400, 404, 500)', () => {
      const error400 = { response: { status: 400, data: { message: 'Bad request' } } }
      const error500 = { response: { status: 500, data: { message: 'Server error' } } }
      expect(isConnectionError(error400)).toBe(false)
      expect(isConnectionError(error500)).toBe(false)
    })

    it('deve retornar false quando o erro for nulo ou indefinido', () => {
      expect(isConnectionError(null)).toBe(false)
      expect(isConnectionError(undefined)).toBe(false)
    })
  })

  describe('notifyConnectionError', () => {
    it('deve disparar toast.error com o ID fixo de deduplicação e mensagem padrão', () => {
      notifyConnectionError()

      expect(toast.error).toHaveBeenCalledTimes(1)
      expect(toast.error).toHaveBeenCalledWith(NETWORK_ERROR_MESSAGE, {
        id: NETWORK_ERROR_TOAST_ID,
      })
    })

    it('deve ignorar chamadas consecutivas durante a janela de cooldown de 4000ms', () => {
      const now = 1000000
      vi.spyOn(Date, 'now').mockReturnValue(now)

      // Primeira chamada: deve disparar
      notifyConnectionError()
      expect(toast.error).toHaveBeenCalledTimes(1)

      // Segunda chamada após 500ms: deve ser silenciada pelo cooldown
      vi.spyOn(Date, 'now').mockReturnValue(now + 500)
      notifyConnectionError()
      expect(toast.error).toHaveBeenCalledTimes(1)

      // Terceira chamada após 2000ms: deve ser silenciada pelo cooldown
      vi.spyOn(Date, 'now').mockReturnValue(now + 2000)
      notifyConnectionError()
      expect(toast.error).toHaveBeenCalledTimes(1)

      // Quarta chamada após 4001ms (> 4000ms): deve disparar novamente
      vi.spyOn(Date, 'now').mockReturnValue(now + NETWORK_ERROR_COOLDOWN_MS + 1)
      notifyConnectionError()
      expect(toast.error).toHaveBeenCalledTimes(2)
    })
  })

  describe('api interceptor response handling', () => {
    it('deve deduplicar múltiplos erros de conexão paralelos no interceptor', async () => {
      // Obter o rejection handler registrado no response interceptor
      // @ts-expect-error acessando handlers internos do axios para teste unitário do interceptor
      const interceptor = api.interceptors.response.handlers[0]
      const handleRejection = interceptor.rejected!

      const networkError1 = {
        code: 'ERR_NETWORK',
        message: 'Network Error',
      }
      const networkError2 = {
        code: 'ERR_NETWORK',
        message: 'Network Error',
      }
      const networkError3 = {
        message: 'Network Error',
      }

      await expect(handleRejection(networkError1)).rejects.toEqual(networkError1)
      await expect(handleRejection(networkError2)).rejects.toEqual(networkError2)
      await expect(handleRejection(networkError3)).rejects.toEqual(networkError3)

      // Apenas 1 toast deve ter sido disparado graças ao cooldown e ID fixo
      expect(toast.error).toHaveBeenCalledTimes(1)
      expect(toast.error).toHaveBeenCalledWith(NETWORK_ERROR_MESSAGE, {
        id: NETWORK_ERROR_TOAST_ID,
      })
    })

    it('deve repassar mensagem de erro 400 e deduplicar erro 401 e 500 com IDs fixos', async () => {
      // @ts-expect-error acessando handlers internos do axios para teste unitário do interceptor
      const interceptor = api.interceptors.response.handlers[0]
      const handleRejection = interceptor.rejected!

      const error400 = {
        response: {
          status: 400,
          data: { error: 'Dados inválidos informados' },
        },
      }
      await expect(handleRejection(error400)).rejects.toEqual(error400)
      expect(toast.error).toHaveBeenCalledWith('Dados inválidos informados')

      const error401 = {
        response: {
          status: 401,
          data: {},
        },
      }
      await expect(handleRejection(error401)).rejects.toEqual(error401)
      expect(toast.error).toHaveBeenCalledWith('Sessão expirada. Faça login novamente.', {
        id: 'auth-session-expired',
      })

      const error500 = {
        response: {
          status: 500,
          data: {},
        },
      }
      await expect(handleRejection(error500)).rejects.toEqual(error500)
      expect(toast.error).toHaveBeenCalledWith(
        'Erro interno no servidor. Tente novamente mais tarde.',
        {
          id: 'server-internal-error',
        },
      )
    })
  })
})
