import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { lenisInstance } from './useSmoothScroll'

export function useCustomScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [hasScrollableContent, setHasScrollableContent] = useState(false)

  const isVisibleRef = useRef(true)
  const hasScrollableContentRef = useRef(false)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const startScrollY = useRef(0)
  const hideTimeout = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    let cachedScrollableHeight = 0
    let cachedMaxMove = 0

    const updateDimensions = () => {
      if (!thumbRef.current || !trackRef.current) return
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      cachedScrollableHeight = Math.max(scrollHeight - clientHeight, 0)

      const trackHeight = trackRef.current.clientHeight
      const thumbHeight = thumbRef.current.clientHeight
      cachedMaxMove = Math.max(trackHeight - thumbHeight, 0)

      const canScroll = cachedScrollableHeight > 0
      if (hasScrollableContentRef.current !== canScroll) {
        hasScrollableContentRef.current = canScroll
        setHasScrollableContent(canScroll)
      }
    }

    const updateThumbPosition = () => {
      if (!thumbRef.current) return

      const currentScrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      )

      if (Math.abs(currentScrollable - cachedScrollableHeight) > 1) {
        updateDimensions()
      }

      if (cachedScrollableHeight <= 0 || cachedMaxMove <= 0) {
        gsap.set(thumbRef.current, { y: 0 })
        return
      }

      const currentScroll = window.scrollY
      const progress = Math.min(Math.max(currentScroll / cachedScrollableHeight, 0), 1)
      gsap.set(thumbRef.current, { y: progress * cachedMaxMove })
    }

    const handleScroll = () => {
      if (!hasScrollableContentRef.current) {
        updateDimensions()
      }

      if (cachedScrollableHeight <= 0) {
        return
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }

      if (hideTimeout.current) clearTimeout(hideTimeout.current)

      if (!isDragging.current) {
        hideTimeout.current = window.setTimeout(() => {
          isVisibleRef.current = false
          setIsVisible(false)
        }, 1200)
      }

      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(updateThumbPosition)
    }

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()

      updateDimensions()

      isDragging.current = true
      startY.current = e.clientY
      startScrollY.current = window.scrollY

      const thumbEl = thumbRef.current
      if (thumbEl && thumbEl.setPointerCapture) {
        try {
          thumbEl.setPointerCapture(e.pointerId)
        } catch {
          // Ignora se não suportado
        }
      }

      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return

      e.preventDefault()

      const deltaY = e.clientY - startY.current
      if (cachedMaxMove <= 0 || cachedScrollableHeight <= 0) return

      const scrollDelta = (deltaY / cachedMaxMove) * cachedScrollableHeight
      const targetScroll = Math.min(
        Math.max(startScrollY.current + scrollDelta, 0),
        cachedScrollableHeight,
      )

      if (lenisInstance) {
        lenisInstance.scrollTo(targetScroll, { immediate: true, force: true })
      } else {
        window.scrollTo(0, targetScroll)
      }

      updateThumbPosition()
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging.current) return
      isDragging.current = false

      const thumbEl = thumbRef.current
      if (thumbEl && thumbEl.releasePointerCapture) {
        try {
          thumbEl.releasePointerCapture(e.pointerId)
        } catch {
          // Ignora se manipulado pelo navegador
        }
      }

      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)

      hideTimeout.current = window.setTimeout(() => {
        isVisibleRef.current = false
        setIsVisible(false)
      }, 1200)
    }

    const onTrackClick = (e: MouseEvent) => {
      if (!trackRef.current || !thumbRef.current) return
      e.preventDefault()

      updateDimensions()

      if (cachedMaxMove <= 0 || cachedScrollableHeight <= 0) return

      const rect = trackRef.current.getBoundingClientRect()
      const clickY = e.clientY - rect.top
      const thumbHeight = thumbRef.current.clientHeight

      const targetProgress = Math.min(Math.max((clickY - thumbHeight / 2) / cachedMaxMove, 0), 1)
      const targetScroll = targetProgress * cachedScrollableHeight

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

    updateDimensions()
    updateThumbPosition()

    hideTimeout.current = window.setTimeout(() => {
      isVisibleRef.current = false
      setIsVisible(false)
    }, 1200)

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateDimensions()
        updateThumbPosition()
        if (lenisInstance) {
          lenisInstance.resize()
        }
      })
      resizeObserver.observe(document.documentElement)
      if (document.body) {
        resizeObserver.observe(document.body)
      }
    }

    const refreshIntervals = [100, 300, 600, 1000, 2000]
    const timeoutIds = refreshIntervals.map((ms) =>
      window.setTimeout(() => {
        updateDimensions()
        updateThumbPosition()
      }, ms),
    )

    const handleResize = () => {
      updateDimensions()
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)

    if (lenisInstance) {
      lenisInstance.on('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)

      if (lenisInstance) {
        lenisInstance.off('scroll', handleScroll)
      }

      if (resizeObserver) {
        resizeObserver.disconnect()
      }

      timeoutIds.forEach(clearTimeout)

      if (thumb) thumb.removeEventListener('pointerdown', onPointerDown)
      if (track) track.removeEventListener('click', onTrackClick)
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return { thumbRef, trackRef, isVisible, hasScrollableContent }
}
