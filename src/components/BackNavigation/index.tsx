import { useNavigate, Link } from 'react-router-dom'
import { FaArrowLeft, FaHome } from 'react-icons/fa'
import { Container } from './styles'

interface BackNavigationProps {
  homeLabel?: string
}

export function BackNavigation({ homeLabel = 'Página Inicial' }: BackNavigationProps) {
  const navigate = useNavigate()

  return (
    <Container>
      <button type="button" onClick={() => navigate(-1)} className="btn-back">
        <FaArrowLeft />
        Voltar
      </button>
      <span className="separator">/</span>
      <Link to="/" className="link-home">
        <FaHome />
        {homeLabel}
      </Link>
    </Container>
  )
}
