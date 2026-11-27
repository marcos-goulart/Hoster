import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'
import { notificationService } from '../services/notificationService'
import type { NotificationItem } from '../types/notification'

export function useNotifications() {
  const { user, isLogged } = useAuth()
  const location = useLocation()
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const isMountedRef = useRef(true)

  const fetchNotifications = useCallback(async () => {
    if (!isLogged || !user) {
      if (isMountedRef.current) {
        setNotifications([])
        setUnreadCount(0)
        setLoading(false)
      }
      return
    }

    try {
      setLoading(true)
      const data = await notificationService.getNotifications()
      if (isMountedRef.current) {
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount ?? 0)
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [isLogged, user])

  // Carrega ao montar, ao trocar de rota ou ao alterar autenticação
  useEffect(() => {
    isMountedRef.current = true
    void fetchNotifications()

    return () => {
      isMountedRef.current = false
    }
  }, [fetchNotifications, location.pathname])

  // Revalida quando a janela ganha foco (window.focus)
  useEffect(() => {
    function handleFocus() {
      if (isLogged && user) {
        void fetchNotifications()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [fetchNotifications, isLogged, user])

  // Update otimista: marcar uma como lida
  const markAsRead = useCallback(
    async (id: string) => {
      const prevNotifications = [...notifications]
      const prevUnreadCount = unreadCount

      const target = notifications.find((n) => n.id === id)
      if (!target || target.isRead) return

      // Aplicação otimista
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))

      try {
        await notificationService.markAsRead(id)
      } catch (err) {
        console.error('Falha ao marcar notificação como lida:', err)
        // Rollback
        setNotifications(prevNotifications)
        setUnreadCount(prevUnreadCount)
      }
    },
    [notifications, unreadCount],
  )

  // Update otimista: marcar todas como lidas
  const markAllAsRead = useCallback(async () => {
    if (unreadCount === 0) return

    const prevNotifications = [...notifications]
    const prevUnreadCount = unreadCount

    // Aplicação otimista
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })))
    setUnreadCount(0)

    try {
      await notificationService.markAllAsRead()
    } catch (err) {
      console.error('Falha ao marcar todas como lidas:', err)
      // Rollback
      setNotifications(prevNotifications)
      setUnreadCount(prevUnreadCount)
    }
  }, [notifications, unreadCount])

  // Update otimista: excluir notificação individual
  const deleteNotification = useCallback(
    async (id: string) => {
      const prevNotifications = [...notifications]
      const prevUnreadCount = unreadCount

      const target = notifications.find((n) => n.id === id)
      if (!target) return

      // Aplicação otimista
      setNotifications((prev) => prev.filter((item) => item.id !== id))
      if (!target.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }

      try {
        await notificationService.deleteNotification(id)
      } catch (err) {
        console.error('Falha ao excluir notificação:', err)
        // Rollback
        setNotifications(prevNotifications)
        setUnreadCount(prevUnreadCount)
      }
    },
    [notifications, unreadCount],
  )

  // Update otimista: excluir todas as notificações
  const deleteAllNotifications = useCallback(async () => {
    if (notifications.length === 0) return

    const prevNotifications = [...notifications]
    const prevUnreadCount = unreadCount

    // Aplicação otimista
    setNotifications([])
    setUnreadCount(0)

    try {
      await notificationService.deleteAllNotifications()
    } catch (err) {
      console.error('Falha ao excluir todas as notificações:', err)
      // Rollback
      setNotifications(prevNotifications)
      setUnreadCount(prevUnreadCount)
    }
  }, [notifications, unreadCount])

  return {
    notifications,
    unreadCount,
    loading,
    refreshNotifications: fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  }
}
