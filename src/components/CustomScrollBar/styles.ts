import styled from 'styled-components'

export const Track = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 160px;
  bottom: 160px;
  right: 14px;
  width: 16px;
  height: calc(100vh - 320px);
  z-index: 99999;
  display: flex;
  justify-content: center;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.4s ease;
  pointer-events: auto;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;

  &:hover {
    opacity: 1 !important;
  }
`

export const Rail = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: ${(props) => props.theme.colors.bgBrown1};
  opacity: 0.35;
  border-radius: 99px;
  transition: opacity 0.2s ease;
  pointer-events: none;

  ${Track}:hover & {
    opacity: 0.6;
  }
`

export const Thumb = styled.div`
  width: 6px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.orange};
  border-radius: 99px;
  position: absolute;
  top: 0;
  cursor: grab;
  pointer-events: auto;
  will-change: transform;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  user-select: none;
  -webkit-user-select: none;
  transition: width 0.2s ease, background-color 0.2s ease;

  &:active {
    cursor: grabbing;
    width: 6px;
  }

  ${Track}:hover & {
    width: 6px;
  }
`
