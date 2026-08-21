import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

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

  return  new Promise((resolve) => {
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

  useEffect(() => {
    let isMounted = true

    const bannerUrl = getBannerForPath(location.pathname)
    preloadBannerImage(bannerUrl).then(() => {
      if (isMounted) {
        setIsloading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [routeKey, location.pathname])

  const triggerLoading = (callback?: () => void) => {
    setIsloading(true)
    const targetBanner = bannerResultado
    preloadBannerImage(targetBanner).then(() => {
      callback?.()
    })
  }

  return (
    <PageLoadingContext.Provider value={{ isLoading, triggerLoading }}>
      {children}
    </PageLoadingContext.Provider>
  )
}
