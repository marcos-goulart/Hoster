import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;

  h1 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    color: ${(props) => props.theme.colors.primaryDark};
    margin-bottom: 1.5rem;
  }
`

export const ProfileCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};

  .avatar-img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .avatar-fallback {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .user-details {
    h2 {
      font-size: 1.25rem;
      color: ${(props) => props.theme.colors.primaryDark};
    }

    p {
      color: ${(props) => props.theme.colors.gray700 || '#6b7280'};
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .badges-wrapper {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.2rem 0.6rem;
        background-color: #f3f4f6;
        color: ${(props) => props.theme.colors.primaryDark};
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 0.25rem;

        &.verified {
          background-color: #f0fdf4;
          color: #15803d;
        }

        &.pending {
          background-color: #fffbeb;
          color: #b45309;
        }
      }
    }
  }
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`

export const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    border-color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
    transform: translateY(-2px);
  }

  .stat-icon {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
  }

  div {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 1.15rem;
      color: ${(props) => props.theme.colors.primaryDark};
    }

    span {
      font-size: 0.75rem;
      color: ${(props) => props.theme.colors.gray700 || '#6b7280'};
    }
  }
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.375rem;
    background-color: #f9fafb;
    border: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.accentWarm || '#f97316'};
  }

  label {
    display: block;
    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.gray700 || '#6b7280'};
    font-weight: 500;
  }

  p {
    font-size: 0.925rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.primaryDark};
  }
`

export const ActionsSection = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.borderColor || '#e5e7eb'};

  .btn-logout {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.25rem;
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
    border-radius: 0.375rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: #fee2e2;
    }
  }
`
