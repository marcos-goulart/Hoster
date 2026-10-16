import { useCustomScrollbar } from '../../hooks/useCustomScrollbar'
import { Rail, Thumb, Track } from './styles'

export function CustomScrollbar() {
  const { thumbRef, trackRef, isVisible, hasScrollableContent } = useCustomScrollbar()

  return (
    <Track ref={trackRef} $visible={isVisible && hasScrollableContent}>
      <Rail />
      <Thumb ref={thumbRef} />
    </Track>
  )
}
