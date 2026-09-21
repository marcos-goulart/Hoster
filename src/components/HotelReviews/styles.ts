import styled from 'styled-components'

export const SectionTitle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.15rem;
  color: ${(props) => props.theme.colors.primaryDark};
`

export const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .review-card {
    background-color: #f9fafb;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 8px;
    padding: 1.1rem 1.25rem;

    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.65rem;

      .reviewer-user {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        .avatar {
          width: 2.35rem;
          height: 2.35rem;
          border-radius: 50%;
          background-color: ${(props) => props.theme.colors.accentWarm};
          color: ${(props) => props.theme.colors.white};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .reviewer-info {
          strong {
            display: block;
            font-size: 0.875rem;
            color: ${(props) => props.theme.colors.primaryDark};
          }

          span {
            font-size: 0.75rem;
            color: ${(props) => props.theme.colors.textMuted};
          }
        }
      }

      .stars {
        color: #f59e0b;
        font-size: 0.85rem;
        display: flex;
        gap: 0.15rem;
      }
    }

    .review-text {
      font-size: 0.875rem;
      color: ${(props) => props.theme.colors.textMain};
      line-height: 1.5;
    }
  }
`
