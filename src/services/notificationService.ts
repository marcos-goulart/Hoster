import api from './api'
import type { NotificationItem, NotificationListResponse } from '../types/notification'

export const notificationService = {
  async getNotifications(): Promise<NotificationListResponse> {
    const response = await api.get<{ success: boolean; data: NotificationListResponse }>(
      '/notifications',
    )
    return response.data.data
  },

  async markAsRead(id: string): Promise<NotificationItem> {
    const response = await api.patch<{ success: boolean; data: NotificationItem }>(
      `/notifications/${id}/read`,
    )
    return response.data.data
  },

  async markAllAsRead(): Promise<void> {
    await api.patch('/notifications/read-all')
  },

  async deleteNotification(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`)
  },

  async deleteAllNotifications(): Promise<void> {
    await api.delete('/notifications')
  },
}
