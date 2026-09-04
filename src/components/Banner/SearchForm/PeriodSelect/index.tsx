interface PeriodSelectProps {
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  onClick?: () => void
}

export function PeriodSelect({ value, onChange, onFocus, onClick }: PeriodSelectProps) {
  return (
    <div className='field periodField'>
      <label htmlFor='periodo'>Periodo</label>
      <select
        id='periodo'
        name='periodo'
        aria-label='Selecione o periodo'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onClick={onClick}
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
