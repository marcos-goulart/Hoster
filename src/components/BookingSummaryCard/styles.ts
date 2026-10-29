import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .hotel-photo-wrapper {
    position: relative;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .booking-tag {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(15, 23, 42, 0.85);
      color: #ffffff;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      backdrop-filter: blur(4px);
    }
  }

  .hotel-info {
    padding: 1.5rem;

    h2 {
      font-size: 1.35rem;
      color: #0f172a;
      margin-bottom: 0.35rem;
    }

    .address {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 1.25rem;
    }
  }

  .room-selected-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 0.85rem 1rem;
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;

    small {
      font-size: 0.65rem;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.5px;
      margin-bottom: 0.25rem;
    }

    .room-details-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      strong {
        font-size: 0.95rem;
        color: #0f172a;
      }

      .night-price {
        font-size: 0.85rem;
        font-weight: 600;
        color: #16a34a;
        background: #dcfce7;
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
      }
    }
  }

  .stay-dates {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f1f5f9;
    padding: 0.85rem 1rem;
    border-radius: 10px;
    margin-bottom: 1.25rem;

    div {
      display: flex;
      flex-direction: column;

      small {
        font-size: 0.65rem;
        color: #64748b;
        font-weight: 700;
      }

      strong {
        font-size: 0.9rem;
        color: #0f172a;
      }
    }

    .divider-line {
      width: 1px;
      height: 24px;
      background-color: #cbd5e1;
    }
  }

  .price-breakdown {
    border-top: 1px solid #e2e8f0;
    padding-top: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      color: #475569;

      strong {
        color: #0f172a;
      }
    }

    .price-summary-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1rem 1.15rem;
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .price-summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;

        .price-desc {
          color: #475569;
          font-weight: 500;
          text-align: left;
        }

        .price-val {
          color: #0f172a;
          font-weight: 600;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }

        &.total-row {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 0.1rem;

          .total-price {
            font-size: 1.35rem;
            color: #16a34a;
            font-weight: 700;
            text-align: right;
          }
        }
      }

      .price-divider {
        height: 1px;
        background-color: #e2e8f0;
        margin: 0.25rem 0;
      }
    }
  }
`

export const BadgeList = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.825rem;
    color: #334155;
    font-weight: 500;
  }
`
