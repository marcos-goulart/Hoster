import type { PeriodSelectProps } from "../../../../interfaces/PeriodSelectProps";

export function PeriodSelect({ value, onChange }: PeriodSelectProps) {
  return (
    <div className='field periodField'>
      <label htmlFor='periodo'>Periodo</label>
      <select
        id='periodo'
        name='periodo'
        aria-label='Selecione o periodo'
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value=''>Selecione</option>
        <option value='madrugada'>Madrugada</option>
        <option value='manha'>Manha</option>
        <option value='tarde'>Tarde</option>
        <option value='noite'>Noite</option>
      </select>
    </div>
  )
}
