import { createContext } from 'react'

export interface PageLoadingContextType {
  isLoading: boolean
  triggerLoading: (callback?: () => void) => void
}

export const PageLoadingContext = createContext<PageLoadingContextType>({
  isLoading: false,
  triggerLoading: () => {},
})
