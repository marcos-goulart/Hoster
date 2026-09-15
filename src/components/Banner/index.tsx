import { SearchForm } from './SearchForm'
import { Main } from './styles'

export function Banner() {
  return (
    <Main className="background-banner">
      <div className="banner-bg-wrapper">
        <img
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=80"
          alt="Banner principal"
          className="parallax-img"
        />
      </div>

      <div className="container">
        <h1 className="hero-title text-reveal">Sua próxima experiência inesquecível</h1>
        <p className="hero-subtitle text-reveal">
          Encontre hotéis acolhedores e pousadas exclusivas para o seu descanso
        </p>
        <div className="card card-reveal">
          <div className="card-body">
            <SearchForm />
          </div>
        </div>
      </div>
    </Main>
  )
}
