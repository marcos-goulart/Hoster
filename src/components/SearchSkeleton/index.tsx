import { SkeletonResultCard } from './styles'

export function SearchSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonResultCard key={`search-result-skeleton-${index}`}>
          <div className="image" />
          <div className="content">
            <div className="line title" />
            <div className="line location" />
            <div className="stars">
              {Array.from({ length: 5 }).map((__, starIndex) => (
                <div key={`search-result-skeleton-${index}-${starIndex}`} className="star" />
              ))}
            </div>
            <div className="line description" />
            <div className="line description short" />
            <div className="services">
              <div className="service" />
              <div className="service" />
              <div className="service" />
            </div>
          </div>
        </SkeletonResultCard>
      ))}
    </>
  )
}
