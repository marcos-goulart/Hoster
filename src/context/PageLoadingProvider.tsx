import type { ReactNode } from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import bannerHome from '../img/banners/banner-home.jpeg'
import bannerResultado from '../img/banners/banner-resultado.jpeg'
import { PageLoadingContext } from './PageLoadingContext'

function getBannerForPath(pathname: string): string | null {
  if (pathname === '/' || pathname === '/login') {
    return bannerHome
  }
  if (pathname.startsWith('/resultado')) {
    return bannerHome
  }
  if (pathname.includes('/habitaciones')) {
    return bannerResultado
  }
  return null
}

function preloadBannerImage(bannerUrl: string | null): Promise<void> {
  if (!bannerUrl) return Promise.resolve()

  return new Promise((resolve) => {
    const img = new Image()
    img.src = bannerUrl
    if (img.complete) {
      resolve()
    } else {
      img.onload = () => resolve()
      img.onerror = () => resolve()
    }
  })
}

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const routeKey = `${location.pathname}${location.search}`
  const [isLoading, setIsloading] = useState(true)

  const stopLoading = useCallback(() => {
    setIsloading(false)
    requestAnimationFrame(() => {
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    })
  }, [])

  useEffect(() => {
    let isMounted = true

    // Timeout de segurança de 800ms para destravar caso a URL seja a mesma ou a promise demore
    const safetyTimeout = setTimeout(() => {
      if (isMounted) {
        stopLoading()
      }
    }, 800)

    const bannerUrl = getBannerForPath(location.pathname)
    preloadBannerImage(bannerUrl).then(() => {
      if (isMounted) {
        clearTimeout(safetyTimeout)
        stopLoading()
      }
    })

    return () => {
      isMounted = false
      clearTimeout(safetyTimeout)
    }
  }, [routeKey, location.pathname, stopLoading])

  const triggerLoading = (callback?: () => void) => {
    setIsloading(true)
    const targetBanner = bannerResultado

    preloadBannerImage(targetBanner).then(() => {
      callback?.()

      // Se a URL de destino for idêntica à URL atual, força o fechamento do loader após a execução do callback
      setTimeout(() => {
        stopLoading()
      }, 300)
    })
  }

  return (
    <PageLoadingContext.Provider value={{ isLoading, triggerLoading }}>
      {children}
    </PageLoadingContext.Provider>
  )
}
