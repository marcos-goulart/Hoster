import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { GoogleIcon } from './googleIcon'
import { Divider, FormWrapper, PasswordInputWrapper, SocialButton, SubmitButton } from './styles'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { signInWithGoogle, loginWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Falha no login com Google:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await loginWithEmail(email, password)
      if (onSuccess) onSuccess()
    } catch {
      setError('E-mail ou senha inválidos.')
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <SocialButton type="button" onClick={handleGoogleLogin}>
        <GoogleIcon />
        Continuar com o Google
      </SocialButton>

      <Divider>
        <span>ou entre com e-mail</span>
      </Divider>

      {error && <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>{error}</p>}

      <div className="inputGroup">
        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="inputGroup">
        <label htmlFor="login-password">Senha</label>
        <PasswordInputWrapper>
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </PasswordInputWrapper>
      </div>

      <SubmitButton type="submit">Entrar</SubmitButton>
    </FormWrapper>
  )
}
