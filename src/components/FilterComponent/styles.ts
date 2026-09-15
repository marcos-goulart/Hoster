import styled from 'styled-components'

export const FilterWrapper = styled.div`
  width: 100%;
`

export const MobileAccordionHeader = styled.button<{ $isOpen: boolean; $activeCount: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.85rem 1.25rem;
  background-color: ${(props) => props.theme.colors.bgCard};
  border: 1px solid
    ${(props) => (props.$isOpen ? props.theme.colors.accentWarm : props.theme.colors.borderColor)};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.primaryDark};
  font-family: inherit;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadows.soft};
  transition: all 0.2s ease-in-out;
  margin-bottom: 1rem;

  .headerLeft {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .filterIcon {
    color: ${(props) => props.theme.colors.accentWarm};
    font-size: 1.1rem;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.35rem;
    height: 1.35rem;
    padding: 0 0.4rem;
    border-radius: 999px;
    background-color: ${(props) => props.theme.colors.accentWarm};
    color: ${(props) => props.theme.colors.white};
    font-size: 0.75rem;
    font-weight: 700;
  }

  .chevronIcon {
    color: ${(props) => props.theme.colors.textMuted};
    transition: transform 0.2s ease-in-out;
    transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.accentWarm};
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    display: none;
  }
`

export const FilterContent = styled.aside<{ $isMobileOpen: boolean }>`
  background-color: ${(props) => props.theme.colors.bgCard};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.soft};
  display: block;

  @media (max-width: 991px) {
    display: ${(props) => (props.$isMobileOpen ? 'block' : 'none')};
    margin-bottom: 1.5rem;
    border-radius: 12px;
  }

  .filterBlock {
    padding: 1.25rem 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};

    &:first-child {
      padding-top: 0;
    }
  }

  h3 {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    color: ${(props) => props.theme.colors.primaryDark};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    svg {
      color: ${(props) => props.theme.colors.accentWarm};
    }
  }

  .filterToggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    border: 0;
    background-color: transparent;
    color: ${(props) => props.theme.colors.primaryDark};
    padding: 0;
    font-family: inherit;
    text-align: left;
    cursor: pointer;

    span {
      display: grid;
      gap: 0.25rem;
    }

    strong {
      font-size: 0.95rem;
    }

    svg {
      transition: transform 0.15s ease-in-out;
    }

    &.open svg {
      transform: rotate(180deg);
    }
  }

  .priceDropdown {
    display: grid;
    gap: 0.75rem;
    margin-top: 1rem;
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.bgMain};
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 6px;

    label {
      display: grid;
      gap: 0.35rem;
      margin-bottom: 0;
    }

    input[type='number'] {
      width: 100%;
      border: 1px solid ${(props) => props.theme.colors.borderColor};
      border-radius: 4px;
      padding: 0.5rem;
      font-family: inherit;
      background: #ffffff;
      outline: none;

      &:focus {
        border-color: ${(props) => props.theme.colors.accentWarm};
      }
    }
  }

  label {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    color: ${(props) => props.theme.colors.textMain};
    margin-bottom: 0.6rem;
    cursor: pointer;
    font-size: 0.85rem;

    input[type='checkbox'] {
      width: 1.1rem;
      height: 1.1rem;
      accent-color: ${(props) => props.theme.colors.accentWarm};
      cursor: pointer;
    }

    &:hover {
      color: ${(props) => props.theme.colors.primaryDark};
    }
  }
`

export const ServicesList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;

  @media (min-width: 480px) and (max-width: 959px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ActionsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.borderColor};
`

export const ApplyFilterButton = styled.button<{ $isDirty?: boolean }>`
  width: 100%;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.accentWarm};
  border: 1px solid transparent;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${(props) => (props.$isDirty ? '0 4px 12px rgba(140, 90, 60, 0.3)' : 'none')};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.accentHover};
  }
`

export const ClearFilterButton = styled.button`
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colors.textMuted};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.bgMain};
    color: ${(props) => props.theme.colors.primaryDark};
    border-color: ${(props) => props.theme.colors.accentWarm};
  }
`
