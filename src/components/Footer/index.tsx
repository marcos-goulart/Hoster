import { useAuth } from '../../hooks/useAuth'

import { FooterContainer } from './styles'

import { AdditionalInformationFooter } from './AdditionalInformationFooter'
import { HotelFooter } from './HotelFooter'
import { MyAccountFooter } from './MyAccountFooter'

export function Footer() {
  const { isLogged } = useAuth()

  return (
    <FooterContainer>
      <div className="container">
        <div className="row">
          <HotelFooter />
          {isLogged && <MyAccountFooter />}
          <AdditionalInformationFooter />
        </div>
      </div>
      <div className="copy">
        <p>&copy; Todos os direitos reservados</p>
      </div>
    </FooterContainer>
  )
}
