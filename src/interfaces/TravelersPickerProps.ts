export interface TravelersPickerProps {
  adultos: number
  criancas: number
  quartos: number
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onChangeAdultos: (val: number) => void
  onChangeCriancas: (val: number) => void
  onChangeQuartos: (val: number) => void
}
