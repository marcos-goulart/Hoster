import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { FormWrapper, SubmitButton } from './styles'

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { registerWithEmail } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsLoading(true)

    try {
      await registerWithEmail(name, email, password)
      setSuccessMessage(
        'Conta criada! Enviamos um e-mail de verificação para a sua caixa de entrada.',
      )

      // Fecha o modal após 3 segundos para dar tempo do usuário ler o aviso
      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 3500)
    } catch {
      setError('Não foi possível criar a conta. Verifique se o e-mail já está em uso.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {error && <p style={{ color: '#DC2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>}

      {successMessage && (
        <div
          style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#15803D',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          {successMessage}
        </div>
      )}

      <div className="inputGroup">
        <label htmlFor="register-name">Nome Completo</label>
        <input
          id="register-name"
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="inputGroup">
        <label htmlFor="register-email">E-mail</label>
        <input
          id="register-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="inputGroup">
        <label htmlFor="register-password">Senha</label>
        <input
          id="register-password"
          type="password"
          placeholder="Crie uma senha forte"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Criando conta...' : 'Criar Conta'}
      </SubmitButton>
    </FormWrapper>
  )
}
