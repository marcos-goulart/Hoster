import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`

export const PageHeader = styled.header`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  padding-bottom: 1rem;

  h1 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 2rem;
    color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
  }

  p {
    font-size: ${(props) => props.theme.fontSize.base || '1rem'};
    color: ${(props) => props.theme.colors.textMuted || '#736964'};
    margin-top: 0.5rem;
  }
`

export const FilterTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.75rem;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const MobileFilterContainer = styled.div`
  display: none;
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    display: block;
  }
`

export const MobileFilterTrigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  border-radius: 0.5rem;
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.textMain || '#332B27'};
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  box-shadow: 0 1px 3px rgba(44, 30, 22, 0.05);

  &:hover {
    border-color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
  }

  .trigger-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .label-prefix {
      color: ${(props) => props.theme.colors.textMuted || '#736964'};
      font-size: 0.85rem;
    }

    strong {
      color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    }
  }

  .chevron {
    color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
    font-size: 0.85rem;
    transition: transform 0.2s ease;
  }
`

export const MobileDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.35rem);
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(44, 30, 22, 0.12);
  z-index: 50;
  overflow: hidden;
  animation: dropFade 0.15s ease-out;

  @keyframes dropFade {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const MobileDropdownItem = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: ${(props) =>
    props.$active ? props.theme.colors.bgMain || '#FAFAF7' : '#ffffff'};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$active ? '700' : '500')};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.accentWarm || '#8C5A3C'
      : props.theme.colors.textMain || '#332B27'};
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.bgMain || '#FAFAF7'};
  }

  .badge-count {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: ${(props) =>
      props.$active
        ? props.theme.colors.accentWarm || '#8C5A3C'
        : props.theme.colors.gray200 || '#E8E2DB'};
    color: ${(props) => (props.$active ? '#ffffff' : props.theme.colors.textMain || '#332B27')};
  }
`

export const TabButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? props.theme.colors.accentWarm || '#8C5A3C' : '#ffffff'};
  color: ${(props) => (props.$active ? '#ffffff' : props.theme.colors.textMuted || '#736964')};
  border: 1px solid
    ${(props) =>
      props.$active
        ? props.theme.colors.accentWarm || '#8C5A3C'
        : props.theme.colors.borderColor || '#E8E2DB'};
  border-radius: 2rem;
  padding: 0.45rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.15s ease-in-out;

  &:hover {
    border-color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
    color: ${(props) => (props.$active ? '#ffffff' : props.theme.colors.primaryDark || '#2C1E16')};
  }

  .badge-count {
    display: inline-block;
    padding: 0.1rem 0.45rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    background-color: ${(props) => (props.$active ? 'rgba(255,255,255,0.25)' : '#f3f4f6')};
    color: ${(props) => (props.$active ? '#ffffff' : props.theme.colors.textMain || '#332B27')};
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  text-align: center;

  .icon {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.gray300 || '#d1d5db'};
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${(props) => props.theme.colors.textMuted || '#736964'};
    font-size: 0.95rem;
    max-width: 420px;
    margin-bottom: 1.5rem;
  }

  .btn-explore {
    padding: 0.75rem 1.5rem;
    background-color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
    color: #ffffff;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.colors.accentHover || '#72462C'};
    }
  }
`

export const BookingsList = styled.div`
  display: grid;
  gap: 1.5rem;
`

export const BookingCard = styled.article`
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  border-radius: 0.75rem;
  padding: 1.5rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 2px 6px rgba(44, 30, 22, 0.04);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(44, 30, 22, 0.08);
  }
`

export const CardMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`

export const BookingInfo = styled.div`
  h3 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    margin-bottom: 0.4rem;
  }

  .location {
    color: ${(props) => props.theme.colors.textMuted || '#736964'};
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .dates {
    color: ${(props) => props.theme.colors.textMain || '#332B27'};
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .room-name {
    margin-top: 0.35rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.accentWarm || '#8C5A3C'};
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
`

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.4rem;

  ${(props) => {
    switch (props.$status) {
      case 'CONFIRMED':
        return `
          background-color: #dcfce7;
          color: #15803d;
        `
      case 'PENDING_PAYMENT':
      case 'PENDING':
        return `
          background-color: #fef9c3;
          color: #a16207;
        `
      case 'COMPLETED':
        return `
          background-color: #e0e7ff;
          color: #3730a3;
        `
      case 'CANCELLED':
        return `
          background-color: #fee2e2;
          color: #b91c1c;
        `
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
        `
    }
  }}
`

export const BookingStatusGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;

  .price {
    font-size: 1.15rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    order: 2;
  }

  ${StatusBadge} {
    order: 1;
    margin-bottom: 0.4rem;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px dashed ${(props) => props.theme.colors.borderColor || '#E8E2DB'};

    .price {
      order: 1;
    }

    ${StatusBadge} {
      order: 2;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
    }
  }
`

export const ExpirationWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
  flex-wrap: wrap;

  .message-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #92400e;
    font-weight: 500;

    .icon {
      font-size: 1.1rem;
      color: #b45309;
      flex-shrink: 0;
    }
  }

  .btn-pay-quick {
    background-color: #b45309;
    color: #ffffff;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 0.4rem 0.85rem;
    border-radius: 0.375rem;
    text-decoration: none;
    transition: background-color 0.15s ease-in-out;
    white-space: nowrap;

    &:hover {
      background-color: #92400e;
    }
  }
`

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  border-top: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
  padding-top: 1rem;
  flex-wrap: wrap;

  .notice-lock {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.textMuted || '#736964'};
    margin-right: auto;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &.btn-voucher {
      background-color: #ffffff;
      border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
      color: ${(props) => props.theme.colors.textMain || '#332B27'};

      &:hover {
        background-color: ${(props) => props.theme.colors.bgMain || '#FAFAF7'};
        border-color: ${(props) => props.theme.colors.textMuted || '#736964'};
      }
    }

    &.btn-cancel {
      background-color: #ffffff;
      border: 1px solid #fca5a5;
      color: #dc2626;

      &:hover:not(:disabled) {
        background-color: #fef2f2;
        border-color: #ef4444;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(44, 30, 22, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

export const ConfirmModal = styled.div`
  background: #ffffff;
  border-radius: 0.75rem;
  max-width: 440px;
  width: 100%;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  h3 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.primaryDark || '#2C1E16'};
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.95rem;
    color: ${(props) => props.theme.colors.textMuted || '#736964'};
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;

    button {
      padding: 0.55rem 1.1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;

      &.btn-abort {
        background: #ffffff;
        border: 1px solid ${(props) => props.theme.colors.borderColor || '#E8E2DB'};
        color: ${(props) => props.theme.colors.textMain || '#332B27'};
      }

      &.btn-confirm-cancel {
        background: #dc2626;
        border: 1px solid transparent;
        color: #ffffff;

        &:hover:not(:disabled) {
          background: #b91c1c;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
`
