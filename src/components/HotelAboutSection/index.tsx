import { Container, Title, Content } from './styles.ts'

interface HotelAboutSectionProps {
  about?: string | null
}

export const HotelAboutSection: React.FC<HotelAboutSectionProps> = ({ about }) => {
  if (!about || !about.trim()) return null

  return (
    <Container>
      <Title>Mais informações sobre o hotel</Title>
      <Content>{about}</Content>
    </Container>
  )
}
