import { FaStar } from 'react-icons/fa'
import type { GuestReview } from '../../interfaces/Reservation'
import { ReviewsList, SectionTitle } from './styles'

export interface HotelReviewsProps {
  reviews?: GuestReview[]
}

function getInitials(name?: string): string {
  if (!name) return 'H'
  const trimmed = name.trim()
  return trimmed ? trimmed[0].toUpperCase() : 'H'
}

export function HotelReviews({ reviews }: HotelReviewsProps) {
  const hasReviews = Boolean(reviews && reviews.length > 0)

  return (
    <section aria-labelledby="reviews-title">
      <SectionTitle id="reviews-title">Avaliações dos Hóspedes</SectionTitle>

      {hasReviews ? (
        <ReviewsList>
          {reviews!.map((review) => {
            const initials = review.avatarInitials || getInitials(review.userName)
            const avatarUrl = review.avatarUrl

            return (
              <article
                key={review.id}
                className="review-card"
                data-testid={`review-card-${review.id}`}
              >
                <div className="review-header">
                  <div className="reviewer-user">
                    <div
                      className="avatar"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        color: '#ffffff',
                        backgroundColor: review.avatarBgColor || '#8b5cf6',
                        borderRadius: '50%',
                        width: '2.5rem',
                        height: '2.5rem',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={review.userName}
                          referrerPolicy="no-referrer"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        initials
                      )}
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
            )
          })}
        </ReviewsList>
      ) : (
        <p
          style={{
            fontSize: '0.9rem',
            color: '#6b7280',
            fontStyle: 'italic',
            marginTop: '0.75rem',
          }}
        >
          Ainda não há nenhuma avaliação para esta acomodação.
        </p>
      )}
    </section>
  )
}
