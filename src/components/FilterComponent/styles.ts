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
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid
    ${(props) => (props.$isOpen ? props.theme.colors.orange : props.theme.colors.gray300)};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.gray900};
  font-family: inherit;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  cursor: pointer;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
  margin-bottom: 1rem;

  .headerLeft {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .filterIcon {
    color: ${(props) => props.theme.colors.orange};
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
    background-color: ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.white};
    font-size: 0.75rem;
    font-weight: 700;
  }

  .chevronIcon {
    color: ${(props) => props.theme.colors.gray600};
    transition: transform 0.2s ease-in-out;
    transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.orange};
  }

  @media (min-width: ${(props) => props.theme.screenMedias.lg}) {
    display: none;
  }
`

export const FilterContent = styled.aside<{ $isMobileOpen: boolean }>`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray300};
  padding: 1.25rem;
  border-radius: 0.25rem;
  display: block;

  @media (max-width: 991px) {
    display: ${(props) => (props.$isMobileOpen ? 'block' : 'none')};
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08);
  }

  .filterBlock {
    padding: 1.25rem 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};

    &:first-child {
      padding-top: 0;
    }
  }

  h3 {
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-bottom: 0.75rem;
    color: ${(props) => props.theme.colors.gray900};
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${(props) => props.theme.colors.orange};
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
    color: ${(props) => props.theme.colors.gray900};
    padding: 0;
    font-family: inherit;
    text-align: left;
    cursor: pointer;

    span {
      display: grid;
      gap: 0.25rem;
    }

    strong {
      font-size: ${(props) => props.theme.fontSize.lg};
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
    background-color: ${(props) => props.theme.colors.gray100};
    border: 1px solid ${(props) => props.theme.colors.gray300};

    label {
      display: grid;
      gap: 0.35rem;
      margin-bottom: 0;
    }

    input[type='number'] {
      width: 100%;
      border: 1px solid ${(props) => props.theme.colors.gray300};
      padding: 0.5rem;
      font-family: inherit;
    }
  }

  label {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    color: ${(props) => props.theme.colors.gray700};
    margin-bottom: 0.6rem;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSize.base};

    input[type='checkbox'] {
      width: 1.1rem;
      height: 1.1rem;
      accent-color: ${(props) => props.theme.colors.orange};
      cursor: pointer;
    }

    &:hover {
      color: ${(props) => props.theme.colors.gray900};
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
  border-top: 1px solid ${(props) => props.theme.colors.gray300};
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
  background-color: ${(props) =>
    props.$isDirty
      ? props.theme.colors.orange
      : props.theme.colors.orange2 || props.theme.colors.orange};
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: ${(props) => (props.$isDirty ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none')};
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.orange2};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
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
  color: ${(props) => props.theme.colors.gray700};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
    color: ${(props) => props.theme.colors.gray900};
    border-color: ${(props) => props.theme.colors.gray400};
  }
`
