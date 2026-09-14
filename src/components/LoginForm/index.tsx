import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GoogleIcon } from './googleIcon'
import { loginSchema, type LoginFormData } from '../../schemas/authSchemas'
import { translateFirebaseError } from '../../utils/firebaseErrors'
import { Divider, FormWrapper, PasswordInputWrapper, SocialButton, SubmitButton } from './styles'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { signInWithGoogle, loginWithEmail } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [firebaseError, setFirebaseError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      await signInWithGoogle()
      if (onSuccess) onSuccess()
    } catch (err) {
      setFirebaseError(translateFirebaseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    setFirebaseError('')
    setIsLoading(true)

    try {
      await loginWithEmail(data.email, data.password)
      if (onSuccess) onSuccess()
    } catch (err) {
      setFirebaseError(translateFirebaseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <SocialButton type="button" onClick={handleGoogleLogin} disabled={isLoading}>
        <GoogleIcon />
        Continuar com o Google
      </SocialButton>

      <Divider>
        <span>ou entre com e-mail</span>
      </Divider>

      {firebaseError && <p className="firebase-error">{firebaseError}</p>}

      <div className="inputGroup">
        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          type="email"
          placeholder="seu@email.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && <span className="field-error">{errors.email.message}</span>}
      </div>

      <div className="inputGroup">
        <label htmlFor="login-password">Senha</label>
        <PasswordInputWrapper>
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </PasswordInputWrapper>
        {errors.password && <span className="field-error">{errors.password.message}</span>}
      </div>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </SubmitButton>
    </FormWrapper>
  )
}
