export type NotificationType =
  | 'BOOKING_CREATED'
  | 'BOOKING_CONFIRMED'
  | 'BOOKING_CANCELLED'
  | 'CHECKIN_REMINDER'
  | 'QUESTION_ANSWERED'
  | 'PROMOTION'
  | 'SYSTEM_ANNOUNCEMENT'

export interface NotificationItem {
  id: string
  userId?: string | null
  isGlobal?: boolean
  type: NotificationType
  title: string
  message: string
  actionUrl?: string | null
  metadata?: Record<string, unknown> | null
  isRead: boolean
  createdAt: string
}

export interface NotificationListResponse {
  notifications: NotificationItem[]
  unreadCount: number
}
