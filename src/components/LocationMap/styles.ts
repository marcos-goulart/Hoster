import styled from 'styled-components'

export const SectionTitle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.15rem;
  color: ${(props) => props.theme.colors.primaryDark};
`

export const MapContainer = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.borderColor};

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`
