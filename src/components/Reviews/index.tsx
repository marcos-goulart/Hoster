import { reviewList } from '../../mocks/reviews'
import { Main } from './styles'

const starPath =
  'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'

export function Reviews() {
  return (
    <Main>
      <div className='container'>
        <div className='title'>
          <h1 className='text-reveal'>Avaliacoes dos nossos clientes</h1>
          <div className='lineOrange card-reveal' />
        </div>

        <div className='row'>
          {reviewList.map((review) => (
            <div key={review.id} className='col card-reveal'>
              <div className='card'>
                <div className='cardBody text-reveal'>
                  <div className='header'>
                    <h4 className='text-reveal'>{review.name}</h4>
                    <div className='stars stars-reveal' aria-label={`${review.rating} estrelas`}>
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <span key={index} className='star text-reveal' aria-hidden='true'>
                          <svg viewBox='0 0 24 24' role='img' focusable='false'>
                            <path d={starPath} />
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className='text-reveal'>{review.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  )
}
