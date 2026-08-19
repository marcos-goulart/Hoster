import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface PageLoadingContextType {
  isLoading: boolean
  triggerLoading: (callback?: () => void, durationMs?: number) => void
}

const PageLoadingContext = createContext<PageLoadingContextType>({
  isLoading: false,
  triggerLoading: () => {},
})

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const routeKey = `${location.pathname}${location.search}`
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [routeKey])

  const triggerLoading = (callback?: () => void, durationMs = 1000) => {
    setIsLoading(true)
    setTimeout(() => {
      callback?.()
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }, durationMs)
  }

  return (
    <PageLoadingContext.Provider value={{ isLoading, triggerLoading }}>
      {children}
    </PageLoadingContext.Provider>
  )
}

export function usePageLoading() {
  return useContext(PageLoadingContext)
}
