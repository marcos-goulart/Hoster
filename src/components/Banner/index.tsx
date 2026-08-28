import banner from '../../img/banners/banner-home.jpeg'
import { SearchForm } from './SearchForm'
import { Main } from './styles'

export function Banner() {
  return (
    <Main className="background-banner">
      <div className="banner-bg-wrapper">
        <img src={banner} alt="Banner principal" className="parallax-img" />
      </div>

      <div className="container">
        <div className="card card-reveal">
          <div className="card-body">
            <SearchForm />
          </div>
        </div>
      </div>
    </Main>
  )
}
