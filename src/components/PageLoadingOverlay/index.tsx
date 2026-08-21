import { usePageLoading } from '../../hooks/usePageLoading'
import { Overlay } from './styles'

export function PageLoadingOverlay() {
  const { isLoading } = usePageLoading()

  return (
    <Overlay $isVisible={isLoading} aria-hidden={!isLoading}>
      <div className="loadingWindow">
        <div className="spinner" />
        <h3 className="loadingTitle">Carregando...</h3>
        <p className="loadingSubtext">Buscando as melhores opções para você</p>
      </div>
    </Overlay>
  )
}
