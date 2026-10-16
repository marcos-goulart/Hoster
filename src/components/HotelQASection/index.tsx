import React, { useEffect, useState } from 'react'
import type { HotelQuestion } from '../../interfaces/Hotel'
import { useAuth } from '../../hooks/useAuth'
import {
  AnswerBox,
  AnswerText,
  AnswerTitle,
  Container,
  EmptyState,
  Form,
  QuestionCard,
  QuestionHeader,
  QuestionsList,
  QuestionText,
  StatusBadge,
  SubmitButton,
  TextArea,
  Title,
  UserInfo,
  UserName,
} from './styles'

interface HotelQASectionProps {
  hotelId: string
  questions?: HotelQuestion[]
  onQuestionSubmitted?: (newQuestion: HotelQuestion) => void
}

function getInitial(name?: string): string {
  if (!name) return 'H'
  const trimmed = name.trim()
  return trimmed ? trimmed[0].toUpperCase() : 'H'
}

function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export const HotelQASection: React.FC<HotelQASectionProps> = ({
  hotelId,
  questions = [],
  onQuestionSubmitted,
}) => {
  const { user } = useAuth()
  const [questionsList, setQuestionsList] = useState<HotelQuestion[]>(questions)
  const [questionText, setQuestionText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sincroniza a lista caso a prop questions mude quando o hotel recarregar
  useEffect(() => {
    setQuestionsList(questions)
  }, [questions])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!questionText.trim()) return

    try {
      setIsSubmitting(true)
      const token = await user?.getIdToken()

      const response = await fetch(`http://localhost:3001/api/hotels/${hotelId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: questionText.trim() }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Insere a nova pergunta vinda do backend no topo da lista local
        setQuestionsList((prev) => [result.data, ...prev])
        setQuestionText('')

        if (onQuestionSubmitted) {
          onQuestionSubmitted(result.data)
        }
      }
    } catch (error) {
      console.error('Erro ao enviar pergunta:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <Title>Perguntas ao Hotel / Anfitrião</Title>

      {user ? (
        <Form onSubmit={handleSubmit}>
          <TextArea
            placeholder="Possui alguma dúvida sobre a acomodação, check-in ou serviços? Pergunte ao anfitrião..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <SubmitButton type="submit" disabled={isSubmitting || !questionText.trim()}>
            {isSubmitting ? 'Enviando...' : 'Enviar Pergunta'}
          </SubmitButton>
        </Form>
      ) : (
        <EmptyState style={{ marginBottom: '1.5rem' }}>
          Faça login para enviar uma pergunta ao anfitrião.
        </EmptyState>
      )}

      <QuestionsList>
        {questionsList.length > 0 ? (
          questionsList.map((q) => {
            const isAnswered = Boolean(q.answer)
            const userName =
              q.user?.name || (q.userId === user?.uid ? user?.displayName : null) || 'Hóspede'
            const avatarUrl = q.user?.avatar || (q.userId === user?.uid ? user?.photoURL : null)
            const initial = getInitial(userName)
            const dateDisplay = formatDate(q.createdAt)

            return (
              <QuestionCard key={q.id}>
                <QuestionHeader>
                  <UserInfo style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Avatar do Usuário */}
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        backgroundColor: '#8b5cf6',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={userName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        initial
                      )}
                    </div>

                    {/* Nome e Data da Pergunta */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <UserName>{userName}</UserName>
                      {dateDisplay && (
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{dateDisplay}</span>
                      )}
                    </div>
                  </UserInfo>

                  {/* Badge de Status da Pergunta */}
                  <StatusBadge $isAnswered={isAnswered}>
                    {isAnswered ? '✓ Respondida' : '⏳ Aguardando resposta'}
                  </StatusBadge>
                </QuestionHeader>

                <QuestionText>{q.question}</QuestionText>

                {q.answer && (
                  <AnswerBox>
                    <AnswerTitle>Resposta do Hotel</AnswerTitle>
                    <AnswerText>{q.answer}</AnswerText>
                  </AnswerBox>
                )}
              </QuestionCard>
            )
          })
        ) : (
          <EmptyState>Nenhuma pergunta realizada ainda. Seja o primeiro a perguntar!</EmptyState>
        )}
      </QuestionsList>
    </Container>
  )
}
