import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { lenisInstance } from './useSmoothScroll'

export function useCustomScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  const isDragging = useRef(false)
  const startY = useRef(0)
  const startScrollY = useRef(0)
  const hideTimeout = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true)

      if (hideTimeout.current) clearTimeout(hideTimeout.current)

      if (!isDragging.current) {
        hideTimeout.current = window.setTimeout(() => {
          setIsVisible(false)
        }, 1200)
      }

      if (!thumbRef.current || !trackRef.current) return
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollableHeight <= 0) return

      const progress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)
      const trackHeight = trackRef.current.clientHeight
      const thumbHeight = thumbRef.current.clientHeight
      const maxMove = trackHeight - thumbHeight

      gsap.set(thumbRef.current, { y: progress * maxMove })
    }

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()

      isDragging.current = true
      startY.current = e.clientY
      startScrollY.current = window.scrollY

      if (lenisInstance) {
        lenisInstance.stop()
      }

      const target = e.currentTarget as HTMLElement
      if (target.setPointerCapture) {
        target.setPointerCapture(e.pointerId)
      }

      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !trackRef.current || !thumbRef.current) return

      e.preventDefault()

      const deltaY = e.clientY - startY.current
      const trackHeight = trackRef.current.clientHeight
      const thumbHeight = thumbRef.current.clientHeight
      const maxMove = trackHeight - thumbHeight
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

      const scrollDelta = (deltaY / maxMove) * scrollableHeight
      const targetScroll = Math.min(Math.max(startScrollY.current + scrollDelta, 0), scrollableHeight)

      window.scrollTo(0, targetScroll)
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging.current) return
      isDragging.current = false

      const target = e.currentTarget as HTMLElement
      if (target && target.releasePointerCapture) {
        try {
          target.releasePointerCapture(e.pointerId)
        } catch {
          // Ignora liberação se manipulada pelo navegador
        }
      }

      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)

      const finalScroll = window.scrollY

      if (lenisInstance) {
        lenisInstance.scrollTo(finalScroll, { immediate: true, force: true })

        requestAnimationFrame(() => {
          if (lenisInstance) {
            lenisInstance.start()
          }
        })
      }

      hideTimeout.current = window.setTimeout(() => setIsVisible(false), 1200)
    }

    const onTrackClick = (e: MouseEvent) => {
      if (!trackRef.current || !thumbRef.current) return
      e.preventDefault()

      const rect = trackRef.current.getBoundingClientRect()
      const clickY = e.clientY - rect.top
      const trackHeight = trackRef.current.clientHeight
      const thumbHeight = thumbRef.current.clientHeight
      const maxMove = trackHeight - thumbHeight

      const targetProgress = Math.min(Math.max((clickY - thumbHeight / 2) / maxMove, 0), 1)
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const targetScroll = targetProgress * scrollableHeight

      if (lenisInstance) {
        lenisInstance.scrollTo(targetScroll, { duration: 0.8, force: true })
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' })
      }
    }

    const thumb = thumbRef.current
    const track = trackRef.current

    if (thumb) thumb.addEventListener('pointerdown', onPointerDown)
    if (track) track.addEventListener('click', onTrackClick)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (thumb) thumb.removeEventListener('pointerdown', onPointerDown)
      if (track) track.removeEventListener('click', onTrackClick)
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [])

  return { thumbRef, trackRef, isVisible }
}
