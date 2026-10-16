import styled from 'styled-components'

export const Container = styled.section``

export const Title = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.15rem;
  color: ${(props) => props.theme.colors.primaryDark};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accentGold};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.black3};
  }
`

export const SubmitButton = styled.button`
  align-self: flex-start;
  padding: 0.65rem 1.25rem;
  background-color: ${(props) => props.theme.colors.orange};
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.orange2};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const QuestionCard = styled.div`
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  padding: 1rem 1.25rem;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

export const UserName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: #334155;
`

export const QuestionText = styled.p`
  font-size: 0.95rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
`

export const AnswerBox = styled.div`
  margin-top: 0.75rem;
  padding-left: 1rem;
  border-left: 3px solid #8b5cf6;
`

export const AnswerTitle = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: #8b5cf6;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.25rem;
`

export const AnswerText = styled.p`
  font-size: 0.9rem;
  color: #475569;
`

export const EmptyState = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  font-style: italic;
`
export const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

export const StatusBadge = styled.span<{ $isAnswered: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 12px;
  background-color: ${(props) => (props.$isAnswered ? '#dcfce7' : '#fef3c7')};
  color: ${(props) => (props.$isAnswered ? '#15803d' : '#b45309')};
  border: 1px solid ${(props) => (props.$isAnswered ? '#bbf7d0' : '#fde68a')};
`
