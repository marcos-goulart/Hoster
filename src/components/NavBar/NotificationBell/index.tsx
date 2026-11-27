import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaBell,
  FaRegBell,
  FaBellSlash,
  FaCheckCircle,
  FaCalendarCheck,
  FaTimesCircle,
  FaSuitcase,
  FaCommentDots,
  FaTag,
  FaBullhorn,
  FaTimes,
} from 'react-icons/fa'
import { useNotifications } from '../../../hooks/useNotifications'
import { formatRelativeTime } from '../../../utils/dateUtils'
import type { NotificationItem, NotificationType } from '../../../types/notification'
import {
  BellContainer,
  EmptyState,
  NotificationItemRow,
  NotificationList,
  PopoverContainer,
  PopoverHeader,
} from './styles'

interface NotificationBellProps {
  onCloseMobileMenu?: () => void
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case 'BOOKING_CONFIRMED':
      return <FaCheckCircle aria-hidden="true" />
    case 'BOOKING_CREATED':
      return <FaCalendarCheck aria-hidden="true" />
    case 'BOOKING_CANCELLED':
      return <FaTimesCircle aria-hidden="true" />
    case 'CHECKIN_REMINDER':
      return <FaSuitcase aria-hidden="true" />
    case 'QUESTION_ANSWERED':
      return <FaCommentDots aria-hidden="true" />
    case 'PROMOTION':
      return <FaTag aria-hidden="true" />
    case 'SYSTEM_ANNOUNCEMENT':
    default:
      return <FaBullhorn aria-hidden="true" />
  }
}

export function NotificationBell({ onCloseMobileMenu }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  } = useNotifications()

  // Fecha o popover ao clicar fora ou pressionar ESC
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleItemClick = (notification: NotificationItem) => {
    if (!notification.isRead) {
      void markAsRead(notification.id)
    }
    setIsOpen(false)
    if (onCloseMobileMenu) {
      onCloseMobileMenu()
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl)
    }
  }

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    void deleteNotification(id)
  }

  const displayBadge = unreadCount > 9 ? '9+' : unreadCount > 0 ? String(unreadCount) : null

  return (
    <BellContainer ref={containerRef} data-testid="notification-bell-container">
      <button
        type="button"
        className="bell-trigger-btn"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={
          unreadCount > 0
            ? `Notificações (${unreadCount} não ${unreadCount === 1 ? 'lida' : 'lidas'})`
            : 'Notificações'
        }
        data-testid="notification-bell-trigger"
      >
        {isOpen ? (
          <FaBell aria-hidden="true" data-testid="notification-bell-icon-filled" />
        ) : (
          <FaRegBell aria-hidden="true" data-testid="notification-bell-icon-outline" />
        )}
        {displayBadge && (
          <span className="unread-badge" data-testid="notification-unread-badge">
            {displayBadge}
          </span>
        )}
      </button>

      {isOpen && (
        <PopoverContainer
          role="dialog"
          aria-label="Central de Notificações"
          data-testid="notification-popover"
        >
          <PopoverHeader>
            <div className="header-title-group">
              <h3>Notificações</h3>
              {notifications.length > 0 && (
                <span className="counter-tag">{notifications.length}</span>
              )}
            </div>

            <div className="header-actions">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => void markAllAsRead()}
                  data-testid="mark-all-read-btn"
                >
                  Marcar lidas
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  type="button"
                  className="btn-clear"
                  onClick={() => void deleteAllNotifications()}
                  data-testid="clear-all-notifications-btn"
                >
                  Limpar tudo
                </button>
              )}
            </div>
          </PopoverHeader>

          <NotificationList data-testid="notification-items-list">
            {notifications.length === 0 ? (
              <EmptyState data-testid="empty-notifications-state">
                <FaBellSlash className="empty-icon" aria-hidden="true" />
                <p>Nenhuma notificação por aqui.</p>
              </EmptyState>
            ) : (
              notifications.map((item) => (
                <NotificationItemRow
                  key={item.id}
                  $isRead={item.isRead}
                  onClick={() => handleItemClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleItemClick(item)
                    }
                  }}
                  data-testid={`notification-item-${item.id}`}
                >
                  <div className={`icon-wrapper type-${item.type}`}>
                    {getNotificationIcon(item.type)}
                  </div>

                  <div className="content-wrapper">
                    <div className="title-row">
                      <strong>{item.title}</strong>
                      <span className="time-tag">{formatRelativeTime(item.createdAt)}</span>
                    </div>
                    <p className="message-text">{item.message}</p>
                  </div>

                  {!item.isRead && (
                    <span className="unread-dot" aria-label="Não lida" title="Não lida" />
                  )}

                  <button
                    type="button"
                    className="btn-delete"
                    onClick={(e) => handleDeleteItem(e, item.id)}
                    aria-label={`Excluir notificação ${item.title}`}
                    data-testid={`delete-notification-${item.id}`}
                  >
                    <FaTimes aria-hidden="true" />
                  </button>
                </NotificationItemRow>
              ))
            )}
          </NotificationList>
        </PopoverContainer>
      )}
    </BellContainer>
  )
}
