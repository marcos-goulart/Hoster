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
  const { signInWithGoogle, loginWithEmail, resendVerification } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [firebaseError, setFirebaseError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
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

  // Verifica se o texto de erro atual é a mensagem de sucesso
  const isSuccessMessage =
    firebaseError === 'E-mail reenviado com sucesso! Verifique sua caixa de entrada.'

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <SocialButton type="button" onClick={handleGoogleLogin} disabled={isLoading}>
        <GoogleIcon />
        Continuar com o Google
      </SocialButton>

      <Divider>
        <span>ou entre com e-mail</span>
      </Divider>

      {firebaseError && (
        <div
          // Alterna a classe (e consequentemente as cores) baseado no estado da mensagem
          className={isSuccessMessage ? 'success-message' : 'firebase-error'}
          style={{ textAlign: 'center' }}
        >
          {isSuccessMessage ? (
            <span>{firebaseError}</span>
          ) : (
            <>
              <span>{firebaseError} </span>
              {firebaseError.includes('não foi verificado') && (
                <button
                  type="button"
                  onClick={async () => {
                    const { email, password } = getValues()
                    if (!email || !password) return

                    setIsLoading(true)
                    try {
                      await resendVerification(email, password)
                      setFirebaseError(
                        'E-mail reenviado com sucesso! Verifique sua caixa de entrada.',
                      )
                    } catch (err) {
                      setFirebaseError(translateFirebaseError(err))
                    } finally {
                      setIsLoading(false)
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#b91c1c', // Vermelho um pouco mais escuro para destaque sem fugir da paleta
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: 'inherit', // Herda o mesmo tamanho da fonte do texto ao lado
                    fontFamily: 'inherit', // Herda a fonte
                    padding: 0,
                    fontWeight: 600,
                    display: 'inline',
                  }}
                  disabled={isLoading}
                >
                  Reenviar e-mail de verificação
                </button>
              )}
            </>
          )}
        </div>
      )}

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
