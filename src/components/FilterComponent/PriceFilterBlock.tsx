import { FaChevronDown } from 'react-icons/fa'

interface PriceFilterBlockProps {
  minPrice: string
  maxPrice: string
  isOpen: boolean
  onToggle: () => void
  onChangeMinPrice: (val: string) => void
  onChangeMaxPrice: (val: string) => void
}

export function PriceFilterBlock({
  minPrice,
  maxPrice,
  isOpen,
  onToggle,
  onChangeMinPrice,
  onChangeMaxPrice,
}: PriceFilterBlockProps) {
  return (
    <div className="filterBlock">
      <button type="button" className={`filterToggle ${isOpen ? 'open' : ''}`} onClick={onToggle}>
        <span>
          <strong>Preço</strong>
          R$ {minPrice},00 a R$ {maxPrice},00
        </span>
        <FaChevronDown aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="priceDropdown">
          <label>
            Mínimo
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => onChangeMinPrice(e.target.value)}
            />
          </label>
          <label>
            Máximo
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => onChangeMaxPrice(e.target.value)}
            />
          </label>
        </div>
      )}
    </div>
  )
}
