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
    min-height: 2.75rem;
    height: 100%;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.orange};
    border: 2px solid ${(props) => props.theme.colors.orange};
    border-radius: 0.375rem;
    outline: none;
    font-size: 1rem;
    font-family: inherit;
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    padding: 0.5rem 1.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.colors.orange2};
      border-color: ${(props) => props.theme.colors.orange2};
    }
  }
`

