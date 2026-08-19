import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_FAKE_LOADING_TIME = 650

export function useFakePageLoading(duration = DEFAULT_FAKE_LOADING_TIME) {
  const location = useLocation()
  const routeKey = `${location.pathname}${location.search}`
  const [loadingState, setLoadingState] = useState({
    routeKey,
    isFinished: false,
  })

  const isLoading = loadingState.routeKey !== routeKey || !loadingState.isFinished

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoadingState({
        routeKey,
        isFinished: true,
      })
    }, duration)

    return () => window.clearTimeout(timeoutId)
  }, [duration, routeKey])

  return isLoading
}
