import styled from 'styled-components'

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
