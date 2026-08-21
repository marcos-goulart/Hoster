import { useContext } from 'react'
import { PageLoadingContext } from '../context/PageLoadingContext'

export function usePageLoading() {
  return useContext(PageLoadingContext)
}
