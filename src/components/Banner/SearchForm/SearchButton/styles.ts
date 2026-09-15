import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3rem;
    min-height: 3rem;
    max-height: 3rem;
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.accentWarm};
    border: 1px solid ${(props) => props.theme.colors.accentWarm};
    border-radius: 6px;
    outline: none;
    font-size: 0.95rem;
    font-family: inherit;
    font-weight: 600;
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    padding: 0.85rem 2rem;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colors.accentHover};
      border-color: ${(props) => props.theme.colors.accentHover};
    }
  }
`
