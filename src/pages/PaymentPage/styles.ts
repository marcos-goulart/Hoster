import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8fafc;
`

export const MainContent = styled.main`
  flex: 1;
  padding: 3rem 1.5rem;

  .container {
    max-width: 1140px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`

export const HotelSummaryCard = styled.div`
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

export const PaymentCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .btn-submit-payment {
    width: 100%;
    padding: 1.1rem;
    margin-top: 1.5rem;
    background-color: #16a34a;
    color: #ffffff;
    font-weight: 700;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);

    &:hover {
      background-color: #15803d;
      transform: translateY(-1px);
    }

    &:disabled {
      background-color: #9ca3af;
      box-shadow: none;
      cursor: not-allowed;
    }
  }
`

export const MethodSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  button {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    span {
      font-weight: 600;
      font-size: 0.95rem;
      color: #334155;
    }

    small {
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 0.2rem;
    }

    &.active {
      border-color: #2563eb;
      background-color: #eff6ff;

      span {
        color: #1d4ed8;
      }
    }
  }
`

export const TimerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  color: #b45309;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;

  strong {
    font-weight: 700;
    color: #92400e;
  }
`

export const QRCodeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
  text-align: center;

  img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    background: #fff;
    padding: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  p {
    font-size: 0.875rem;
    color: #334155;
    margin: 1rem 0 1.25rem;
    max-width: 300px;
  }

  .btn-copy-pix {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background-color: #0f172a;
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #1e293b;
    }
  }
`

export const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .card-error-alert {
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #334155;
    }

    input,
    select {
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.95rem;

      &:focus {
        outline: none;
        border-color: #2563eb;
      }
    }
  }

  .row {
    display: flex;
    gap: 1rem;

    .input-group {
      flex: 1;
    }
  }
`

export const SuccessOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  .modal-content {
    background-color: #ffffff;
    padding: 2.5rem;
    border-radius: 20px;
    text-align: center;
    max-width: 420px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    .check-icon {
      width: 64px;
      height: 64px;
      background-color: #dcfce7;
      color: #16a34a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.25rem;
      font-weight: bold;
      margin: 0 auto 1.25rem;
    }

    h2 {
      font-size: 1.5rem;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }

    p {
      color: #475569;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
      line-height: 1.5;
    }

    span {
      font-size: 0.8rem;
      color: #94a3b8;
    }
  }
`

export const LgpdNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.25rem;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;

  svg {
    font-size: 1.25rem;
    color: #475569;
    flex-shrink: 0;
  }

  strong {
    color: #334155;
  }
`
