import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { Main } from './styles'

import quarto1 from '../../img/quartos/quarto-1.jpeg'
import quarto2 from '../../img/quartos/quarto-2.jpeg'
import quarto3 from '../../img/quartos/quarto-3.jpeg'
import quarto4 from '../../img/quartos/quarto-4.jpeg'

const images = [quarto1, quarto2, quarto3, quarto4]

export function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pointerIdRef = useRef<number | null>(null)
  const dragStartXRef = useRef(0)
  const navigationLockedRef = useRef(false)

  const [width, setWidth] = useState(0)
  const [index, setIndex] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  const total = images.length
  const slides = [images[total - 1], ...images, images[0]]
  const currentIndicator = index === 0 ? total - 1 : index === total + 1 ? 0 : index - 1
  const getRealSlideIndex = (slideIndex: number) => {
    if (slideIndex === 0) return total - 1
    if (slideIndex === total + 1) return 0
    return slideIndex - 1
  }

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return
      setWidth(containerRef.current.offsetWidth)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useLayoutEffect(() => {
    if (!trackRef.current || width === 0) return

    trackRef.current.style.transition = isTransitioning
      ? 'transform 700ms cubic-bezier(0.22,1,0.36,1)'
      : 'none'

    trackRef.current.style.transform = `translate3d(${-(index * width) + dragOffset}px, 0, 0)`
  }, [index, width, isTransitioning, dragOffset])

  function handleTransitionEnd() {
    navigationLockedRef.current = false

    if (index === 0) {
      setIsTransitioning(false)
      setIndex(total)
    }

    if (index === total + 1) {
      setIsTransitioning(false)
      setIndex(1)
    }
  }

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true)
      })
    }
  }, [isTransitioning])

  const moveSlide = useCallback((direction: number) => {
    if (navigationLockedRef.current || width === 0) return

    navigationLockedRef.current = true
    setIsTransitioning(true)
    setDragOffset(0)
    setIndex((prev) => prev + direction)
  }, [width])

  useEffect(() => {
    if (isHovered || isDragging) return

    const interval = setInterval(() => {
      moveSlide(1)
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered, isDragging, moveSlide])

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (width === 0) return
    if (event.pointerType === 'mouse' && event.button !== 0) return

    pointerIdRef.current = event.pointerId
    dragStartXRef.current = event.clientX

    setIsDragging(true)
    setIsHovered(true)
    setIsTransitioning(false)
    setDragOffset(0)

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging || pointerIdRef.current !== event.pointerId) return
    setDragOffset(event.clientX - dragStartXRef.current)
  }

  function finishDrag(clientX: number) {
    if (!isDragging || width === 0) return

    const delta = clientX - dragStartXRef.current
    const threshold = Math.max(60, width * 0.18)

    setIsDragging(false)
    setIsTransitioning(true)
    setDragOffset(0)

    if (Math.abs(delta) < threshold) return
    moveSlide(delta > 0 ? -1 : 1)
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return
    finishDrag(event.clientX)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    pointerIdRef.current = null
    setIsHovered(false)
  }

  function handlePointerCancel(event: PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return
    finishDrag(event.clientX)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    pointerIdRef.current = null
    setIsHovered(false)
  }

  return (
    <Main>
      <div className='container'>
        <div className='title'>
          <h1>Conheca nossos quartos aconchegantes</h1>
        </div>

        <div
          ref={containerRef}
          className={`carousel ${isDragging ? 'dragging' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='carouselViewport'>
            <div
              ref={trackRef}
              className='carouselTrack'
              onTransitionEnd={handleTransitionEnd}
              style={{ width: `${slides.length * 100}%` }}
            >
              {slides.map((img, i) => {
                const parallaxX = (i - index) * -18 + dragOffset * 0.12
                const isActiveSlide = getRealSlideIndex(i) === currentIndicator

                return (
                  <div
                    key={i}
                    className={`carouselItem ${isActiveSlide ? 'active' : ''}`}
                    style={{ width: `${width}px` }}
                  >
                    <div
                      className='imageMotion'
                      style={{
                        transform: `translate3d(${parallaxX}px, 0, 0)`,
                        transition:
                          isDragging || !isTransitioning
                            ? 'none'
                            : 'transform 700ms cubic-bezier(0.22,1,0.36,1)',
                      }}
                    >
                      <img src={img} alt='Quarto do hotel' draggable={false} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className='gestureLayer'
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            />
          </div>

          <div
            className='navArea left'
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => moveSlide(-1)}
          >
            {'<'}
          </div>

          <div
            className='navArea right'
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => moveSlide(1)}
          >
            {'>'}
          </div>

          <div className='indicators' onPointerDown={(event) => event.stopPropagation()}>
            {images.map((_, i) => (
              <button
                key={i}
                type='button'
                className={currentIndicator === i ? 'active' : ''}
                onClick={() => {
                  if (navigationLockedRef.current || width === 0) return
                  navigationLockedRef.current = true
                  setIsTransitioning(true)
                  setIndex(i + 1)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Main>
  )
}
