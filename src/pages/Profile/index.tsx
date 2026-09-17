import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getUserInitials } from '../../utils/userUtils'
import { BackNavigation } from '../../components/BackNavigation'
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaSignOutAlt,
  FaSuitcase,
  FaHeart,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa'
import {
  Container,
  ProfileCard,
  UserHeader,
  StatsGrid,
  StatCard,
  InfoGrid,
  InfoItem,
  ActionsSection,
} from './styles'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const initials = getUserInitials(user?.displayName)

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  const isGoogleProvider = user?.providerData[0]?.providerId === 'google.com'

  return (
    <Container>
      <BackNavigation />

      <h1>Minha Conta</h1>

      <ProfileCard>
        <UserHeader>
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || 'Avatar'} className="avatar-img" />
          ) : (
            <div className="avatar-fallback">{initials}</div>
          )}
          <div className="user-details">
            <h2>{user?.displayName || 'Usuário Hoster'}</h2>
            <p>{user?.email}</p>
            <div className="badges-wrapper">
              <span className="badge">Hóspede</span>
              {user?.emailVerified ? (
                <span className="badge verified">
                  <FaCheckCircle /> E-mail Verificado
                </span>
              ) : (
                <span className="badge pending">
                  <FaExclamationTriangle /> Verificação Pendente
                </span>
              )}
            </div>
          </div>
        </UserHeader>

        <StatsGrid>
          <StatCard onClick={() => navigate('/minhas-viagens')}>
            <FaSuitcase className="stat-icon" />
            <div>
              <strong>0</strong>
              <span>Viagens Realizadas</span>
            </div>
          </StatCard>

          <StatCard onClick={() => navigate('/favoritos')}>
            <FaHeart className="stat-icon" />
            <div>
              <strong>0</strong>
              <span>Acomodações Salvas</span>
            </div>
          </StatCard>

          <StatCard>
            <FaCalendarAlt className="stat-icon" />
            <div>
              <strong>2026</strong>
              <span>Membro desde</span>
            </div>
          </StatCard>
        </StatsGrid>

        <InfoGrid>
          <InfoItem>
            <div className="icon-wrapper">
              <FaUser />
            </div>
            <div>
              <label>Nome Completo</label>
              <p>{user?.displayName || 'Não informado'}</p>
            </div>
          </InfoItem>

          <InfoItem>
            <div className="icon-wrapper">
              <FaEnvelope />
            </div>
            <div>
              <label>Endereço de E-mail</label>
              <p>{user?.email}</p>
            </div>
          </InfoItem>

          <InfoItem>
            <div className="icon-wrapper">
              <FaShieldAlt />
            </div>
            <div>
              <label>Método de Autenticação</label>
              <p>{isGoogleProvider ? 'Google OAuth' : 'E-mail e Senha'}</p>
            </div>
          </InfoItem>
        </InfoGrid>

        <ActionsSection>
          <button type="button" onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt />
            Sair da Conta
          </button>
        </ActionsSection>
      </ProfileCard>
    </Container>
  )
}
