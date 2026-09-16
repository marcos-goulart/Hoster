import styled from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  .user-trigger-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.35rem 0.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.colors.gray100 || '#f3f4f6'};
    }

    .avatar-img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-fallback {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .user-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.primaryDark};
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chevron {
      font-size: 0.75rem;
      color: ${(props) => props.theme.colors.gray700 || '#4b5563'};
    }
  }
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 260px;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  padding: 0.75rem 0;
  z-index: 10000;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .user-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem 0.75rem 1rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};

    .header-avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
    }

    .header-fallback {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 700;
    }

    .header-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .header-name {
        font-size: 0.875rem;
        color: ${(props) => props.theme.colors.primaryDark};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-email {
        font-size: 0.75rem;
        color: ${(props) => props.theme.colors.gray700 || '#6b7280'};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .menu-nav {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;

    a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 1rem;
      font-size: 0.875rem;
      color: ${(props) => props.theme.colors.textMain || '#374151'};
      text-decoration: none;
      transition: background-color 0.15s ease-in-out;

      svg {
        font-size: 0.9rem;
        color: ${(props) => props.theme.colors.gray700 || '#6b7280'};
      }

      &:hover {
        background-color: ${(props) => props.theme.colors.gray100 || '#f3f4f6'};
        color: ${(props) => props.theme.colors.accentWarm || '#f97316'};

        svg {
          color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
        }
      }
    }
  }

  .menu-footer {
    padding-top: 0.5rem;
    border-top: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 1rem;
      background: transparent;
      border: none;
      font-size: 0.875rem;
      font-weight: 600;
      color: #dc2626;
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;

      svg {
        font-size: 0.9rem;
      }

      &:hover {
        background-color: #fef2f2;
      }
    }
  }
`
