import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { AuthCard, LoginContainer, TabHeader } from './styles'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  return (
    <LoginContainer>
      <main>
        <AuthCard>
          <TabHeader>
            <button
              type="button"
              className={activeTab === 'login' ? 'active' : ''}
              onClick={() => setActiveTab('login')}
            >
              Entrar
            </button>
            <button
              type="button"
              className={activeTab === 'register' ? 'active' : ''}
              onClick={() => setActiveTab('register')}
            >
              Criar Conta
            </button>
          </TabHeader>

          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </AuthCard>
      </main>
    </LoginContainer>
  )
}
