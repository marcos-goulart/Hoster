import { useCustomScrollbar } from "../../hooks/useCustomScrollbar";
import { Rail, Thumb, Track } from "./styles";

export function CustomScrollbar() {
  const { thumbRef, trackRef, isVisible } = useCustomScrollbar()

  return (
    <Track ref={trackRef} $visible={isVisible}>
      <Rail />
      <Thumb ref={thumbRef} />
    </Track>
  )
}
