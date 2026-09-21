import styled from 'styled-components'

export const SectionTitle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.15rem;
  color: ${(props) => props.theme.colors.primaryDark};
`

export const RoomOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`

export const RoomOptionLabel = styled.label<{ $selected: boolean }>`
  border: 1px solid
    ${(props) => (props.$selected ? props.theme.colors.accentWarm : props.theme.colors.borderColor)};
  background-color: ${(props) => (props.$selected ? '#fdfaf7' : props.theme.colors.bgCard)};
  border-radius: 8px;
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.accentWarm};
  }

  .room-info {
    display: flex;
    align-items: center;
    gap: 0.85rem;

    input[type='radio'] {
      accent-color: ${(props) => props.theme.colors.accentWarm};
      width: 1.15rem;
      height: 1.15rem;
      cursor: pointer;
    }

    .room-details {
      strong {
        display: block;
        font-size: 0.95rem;
        color: ${(props) => props.theme.colors.primaryDark};
      }

      p {
        font-size: 0.8rem;
        color: ${(props) => props.theme.colors.textMuted};
        margin-top: 0.2rem;
      }

      .room-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.4rem;

        .tag {
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          background-color: ${(props) => props.theme.colors.gray200};
          border-radius: 4px;
          color: ${(props) => props.theme.colors.primaryDark};
          font-weight: 600;
        }
      }
    }
  }

  .room-price {
    font-weight: 700;
    font-size: 1.05rem;
    color: ${(props) => props.theme.colors.accentWarm};
    text-align: right;
    white-space: nowrap;

    small {
      display: block;
      font-size: 0.75rem;
      color: ${(props) => props.theme.colors.textMuted};
      font-weight: 400;
    }
  }

  @media (max-width: ${(props) => props.theme.screenMedias.sl}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    .room-price {
      text-align: left;
      align-self: flex-end;
    }
  }
`
