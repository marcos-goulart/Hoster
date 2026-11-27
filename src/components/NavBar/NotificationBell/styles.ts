import styled from 'styled-components'

export const BellContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .bell-trigger-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    font-size: 1.15rem;
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.colors.gray100 || '#FAFAF7'};
      color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
    }

    &:focus-visible {
      outline: 2px solid ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
      outline-offset: 2px;
    }
  }

  .unread-badge {
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    background-color: ${(props) => props.theme.colors.red || '#E03131'};
    color: #ffffff;
    font-size: 0.65rem;
    font-weight: 700;
    line-height: 1;
    min-width: 1.15rem;
    height: 1.15rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.25rem;
    box-shadow: 0 0 0 2px #ffffff;
    animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    @keyframes popIn {
      from {
        transform: scale(0);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
`

export const PopoverContainer = styled.div`
  position: absolute;
  top: calc(100% + 0.65rem);
  right: -1rem;
  width: 380px;
  max-width: calc(100vw - 2rem);
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.12),
    0 8px 10px -6px rgba(0, 0, 0, 0.08);
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  z-index: 10001;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: fadeInDown 0.18s ease-out;

  @media (max-width: 768px) {
    right: 50%;
    transform: translateX(50%);
    width: 340px;
    max-width: calc(100vw - 2rem);
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const PopoverHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  background-color: ${(props) => props.theme.colors.bgMain || '#FAFAF7'};
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};

  .header-title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    h3 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    }

    .counter-tag {
      font-size: 0.75rem;
      background-color: ${(props) => props.theme.colors.gray200 || '#E8E2DB'};
      color: ${(props) => props.theme.colors.textMuted || '#736964'};
      padding: 0.1rem 0.4rem;
      border-radius: 9999px;
      font-weight: 600;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      background: transparent;
      border: none;
      font-size: 0.75rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
      cursor: pointer;
      padding: 0.2rem 0.35rem;
      border-radius: 0.25rem;
      transition: all 0.15s ease-in-out;

      &:hover {
        background-color: rgba(140, 90, 60, 0.1);
      }

      &.btn-clear {
        color: ${(props) => props.theme.colors.textMuted || '#736964'};

        &:hover {
          color: ${(props) => props.theme.colors.red || '#E03131'};
          background-color: rgba(224, 49, 49, 0.1);
        }
      }
    }
  }
`

export const NotificationList = styled.div`
  max-height: 380px;
  overflow-y: auto;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
    border-radius: 4px;
  }
`

export const NotificationItemRow = styled.div<{ $isRead: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  background-color: ${(props) =>
    props.$isRead ? '#ffffff' : props.theme.colors.bgMain || '#FAFAF7'};
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) =>
      props.$isRead ? props.theme.colors.gray100 || '#FAFAF7' : '#F4F2EC'};

    .btn-delete {
      opacity: 1;
    }
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    flex-shrink: 0;
    font-size: 0.95rem;

    &.type-BOOKING_CONFIRMED {
      background-color: rgba(45, 125, 70, 0.12);
      color: #2d7d46;
    }
    &.type-BOOKING_CREATED {
      background-color: rgba(197, 160, 89, 0.15);
      color: #b08535;
    }
    &.type-BOOKING_CANCELLED {
      background-color: rgba(224, 49, 49, 0.12);
      color: #e03131;
    }
    &.type-CHECKIN_REMINDER {
      background-color: rgba(37, 190, 255, 0.15);
      color: #0284c7;
    }
    &.type-QUESTION_ANSWERED {
      background-color: rgba(126, 92, 239, 0.15);
      color: #7e5cef;
    }
    &.type-PROMOTION {
      background-color: rgba(140, 90, 60, 0.15);
      color: #8c5a3c;
    }
    &.type-SYSTEM_ANNOUNCEMENT {
      background-color: rgba(44, 30, 22, 0.1);
      color: #2c1e16;
    }
  }

  .content-wrapper {
    flex: 1;
    min-width: 0;

    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.2rem;

      strong {
        font-size: 0.85rem;
        font-weight: ${(props) => (props.$isRead ? '600' : '700')};
        color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .time-tag {
        font-size: 0.7rem;
        color: ${(props) => props.theme.colors.textMuted || '#736964'};
        white-space: nowrap;
        flex-shrink: 0;
      }
    }

    .message-text {
      margin: 0;
      font-size: 0.8rem;
      line-height: 1.35;
      color: ${(props) =>
        props.$isRead
          ? props.theme.colors.textMuted || '#736964'
          : props.theme.colors.textMain || '#332B27'};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .unread-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
    flex-shrink: 0;
    margin-top: 0.45rem;
  }

  .btn-delete {
    opacity: 0;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.textMuted || '#736964'};
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    transition: all 0.15s ease-in-out;
    flex-shrink: 0;
    margin-top: 0.2rem;

    @media (max-width: 768px) {
      opacity: 1;
    }

    &:hover {
      color: ${(props) => props.theme.colors.red || '#E03131'};
      background-color: rgba(224, 49, 49, 0.1);
    }
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.textMuted || '#736964'};

  .empty-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    color: ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
  }
`
