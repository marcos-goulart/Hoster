import { FaUser } from "react-icons/fa"
import { Container } from "./styles"
import { formatTravelers } from "../../../../utils/formatTravelers"
import type { TravelersPickerProps } from "../../../../interfaces/TravelersPickerProps"

export function TravelersPicker({
  adultos,
  criancas,
  quartos,
  isOpen,
  onToggle,
  onClose,
  onChangeAdultos,
  onChangeCriancas,
  onChangeQuartos
}: TravelersPickerProps) {
  const updateCounter = (setter: (v: number) => void, val: number, min: number) => {
    setter(Math.max(min, val))
  }

  return (
    <Container className="field travelersField">
      <label>Viajantes</label>
      <button type="button" className="fieldButton" onClick={onToggle}>
        <FaUser aria-hidden="true"/>
        {formatTravelers(adultos, criancas, quartos)}
      </button>
      {isOpen && (
        <div className='floatingPanel travelersPanel'>
          <strong>Quarto 1</strong>
          <div className='counterRow'>
            <span>Adultos</span>
            <div>
              <button type='button' onClick={() => updateCounter(onChangeAdultos, adultos - 1, 0)}>
                -
              </button>
              <strong>{adultos}</strong>
              <button type='button' onClick={() => updateCounter(onChangeAdultos, adultos + 1, 1)}>
                +
              </button>
            </div>
          </div>
          <div className='counterRow'>
            <span>Criancas</span>
            <div>
              <button type='button' onClick={() => updateCounter(onChangeCriancas, criancas - 1, 0)}>
                -
              </button>
              <strong>{criancas}</strong>
              <button type='button' onClick={() => updateCounter(onChangeCriancas, criancas + 1, 0)}>
                +
              </button>
            </div>
          </div>
          <button type='button' className='addRoomButton' onClick={() => onChangeQuartos(quartos + 1)}>
            Adicionar outro quarto
          </button>
          <button type='button' className='confirmButton' onClick={onClose}>
            OK
          </button>
        </div>
      )}
    </Container>
  )
}
