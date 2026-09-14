import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerSchema, type RegisterFormData } from '../../schemas/authSchemas'
import { translateFirebaseError } from '../../utils/firebaseErrors'
import { FormWrapper, PasswordInputWrapper, SubmitButton } from './styles'

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { registerWithEmail } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firebaseError, setFirebaseError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setFirebaseError('')
    setSuccessMessage('')
    setIsLoading(true)

    try {
      await registerWithEmail(data.name, data.email, data.password)
      setSuccessMessage('Conta criada com sucesso! Enviamos um e-mail de verificação.')

      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 3000)
    } catch (err) {
      setFirebaseError(translateFirebaseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {firebaseError && <p className="firebase-error">{firebaseError}</p>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="inputGroup">
        <label htmlFor="register-name">Nome Completo</label>
        <input
          id="register-name"
          type="text"
          placeholder="Seu nome"
          {...register('name')}
          disabled={isLoading}
        />
        {errors.name && <span className="field-error">{errors.name.message}</span>}
      </div>

      <div className="inputGroup">
        <label htmlFor="register-email">E-mail</label>
        <input
          id="register-email"
          type="email"
          placeholder="seu@email.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && <span className="field-error">{errors.email.message}</span>}
      </div>

      <div className="inputGroup">
        <label htmlFor="register-password">Senha</label>
        <PasswordInputWrapper>
          <input
            id="register-password"
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

      <div className="inputGroup">
        <label htmlFor="register-confirm-password">Confirmar Senha</label>
        <PasswordInputWrapper>
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('confirmPassword')}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={
              showConfirmPassword ? 'Ocultar confirmação de senha' : 'Exibir confirmação de senha'
            }
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </PasswordInputWrapper>
        {errors.confirmPassword && (
          <span className="field-error">{errors.confirmPassword.message}</span>
        )}
      </div>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Criando conta...' : 'Criar Conta'}
      </SubmitButton>
    </FormWrapper>
  )
}
