import campo from '../../img/utilidades/campo.jpeg'
import camera from '../../img/utilidades/camera.jpeg'
import piscina from '../../img/utilidades/piscina.jpeg'
import { Main } from './styles'

export function Differentials() {
  return (
    <Main>
      <div className="container">
        <div className="title">
          <h1 className="text-reveal">Vejam alguns dos nossos diferenciais</h1>
        </div>
        <div className="row">
          <div className="inRow">
            <div className="row">
              <div className="beforeCard card-reveal">
                <div className="card">
                  <div className="imgWrapper">
                    <img src={camera} alt="Camera" className="parallax-img" />
                  </div>
                  <div className="cardBody">
                    <div className="text-reveal">Camera de Seguranca</div>
                    <p className="text-reveal">Uma das coisas que nos preocupamos quando viajamos e a seguranca.</p>
                    <p className="text-reveal">
                      Por isso sempre estamos investindo pesado em seguranca, justamente para voce
                      ficar tranquilo enquanto estiver conosco.
                    </p>
                  </div>
                </div>
              </div>

              <div className="beforeCard card-reveal">
                <div className="card">
                  <div className="imgWrapper">
                    <img src={campo} alt="Campo de futebol" className="parallax-img" />
                  </div>
                  <div className="cardBody">
                    <div className="text-reveal">Campo de futebol</div>
                    <p className="text-reveal">Quem nao gosta de um bom futebol, nao e verdade?</p>
                    <p className="text-reveal">
                      Oferecemos campos de futebol com um dos melhores gramados, para voce jogar
                      aquele futebol com a sua familia e amigos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="beforeCard card-reveal">
                <div className="card">
                  <div className="imgWrapper">
                    <img src={piscina} alt="Piscina de natacao" className="parallax-img" />
                  </div>
                  <div className="cardBody">
                    <div className="text-reveal">Piscina de natacao</div>
                    <p className="text-reveal">No calor que tem feito nesses dias, voce nao pode ficar sem se refrescar.</p>
                    <p className="text-reveal">
                      Mesmo tendo praias e cachoeiras proximas dos nossos hoteis e pousadas,
                      pensando no seu bem-estar, oferecemos lindas piscinas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}
