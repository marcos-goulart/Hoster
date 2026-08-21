import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6'
import { Container } from './styles'

export function HotelFooter() {
  return (
    <Container>
      <h4>Hoster Hotelarias</h4>
      <p>
        Somos uma empresa que nasceu no ano de 1998, cuja a missão é entregar aos nossos clientes e
        parceiros os melhores lugares para ter um lazer e um descanso excelente e merecido.
      </p>
      <p>
        <a href='#' title='Facebook'>
          <i className='facebook'>
            <FaFacebookF />
          </i>
        </a>
        <a href='#' title='Twitter'>
          <i className='x'>
            <FaXTwitter />
          </i>
        </a>
        <a href='#' title='Instagram'>
          <i className='instagram'>
            <FaInstagram />
          </i>
        </a>
        <a href='#' title='Youtube'>
          <i className='youtube'>
            <FaYoutube />
          </i>
        </a>
      </p>
    </Container>
  )
}
