import { FaStar } from 'react-icons/fa'
import type { GuestReview } from '../../interfaces/Reservation'
import { ReviewsList, SectionTitle } from './styles'

export interface HotelReviewsProps {
  reviews: GuestReview[]
}

export function HotelReviews({ reviews }: HotelReviewsProps) {
  if (!reviews || reviews.length === 0) return null

  return (
    <section aria-labelledby="reviews-title">
      <SectionTitle id="reviews-title">Avaliações dos Hóspedes</SectionTitle>
      <ReviewsList>
        {reviews.map((review) => (
          <article key={review.id} className="review-card" data-testid={`review-card-${review.id}`}>
            <div className="review-header">
              <div className="reviewer-user">
                <div
                  className="avatar"
                  style={
                    review.avatarBgColor ? { backgroundColor: review.avatarBgColor } : undefined
                  }
                  aria-hidden="true"
                >
                  {review.avatarInitials}
                </div>
                <div className="reviewer-info">
                  <strong>{review.userName}</strong>
                  <span>{review.stayDate}</span>
                </div>
              </div>

              <div className="stars" aria-label={`Avaliação: ${review.rating} de 5 estrelas`}>
                {Array.from({ length: review.rating }).map((_, starIdx) => (
                  <FaStar key={`star-${review.id}-${starIdx}`} />
                ))}
              </div>
            </div>

            <p className="review-text">"{review.comment}"</p>
          </article>
        ))}
      </ReviewsList>
    </section>
  )
}
