import styled from 'styled-components'

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
