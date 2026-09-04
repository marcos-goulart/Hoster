import { FaBuilding, FaPlane, FaTimes } from "react-icons/fa";
import { Container } from "./styles";
import type { KeyboardEvent } from "react";

interface DestinationInputProps{
  value: string
  onChange: (value:string)=>void
  isOpen: boolean
  onFocus: () => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>)=>void
  suggestions: SearchSuggestion[]
  onSelectSuggestion: (suggestion: SearchSuggestion) => void
  hasError?: boolean
}

interface SearchSuggestion {
  id: string
  title: string
  subtitle: string
  type: 'city' | 'district' | 'airport'
  value: string
}

const suggestionIcons = {
  city: <FaBuilding aria-hidden="true" />,
  district: <FaBuilding aria-hidden="true" />,
  airport: <FaPlane aria-hidden="true" />
}

export function DestinationInput({value, onChange, isOpen, onFocus, onKeyDown, suggestions, onSelectSuggestion, hasError}: DestinationInputProps){
  return (
    <Container className="field destinationField" $hasError={hasError}>
      <label htmlFor="destination">Digite o destino</label>
      <div className="inputShell">
        <input type="text" id="destination" name="destino" value={value} onChange={(e)=>onChange(e.target.value)} onFocus={onFocus} onKeyDown={onKeyDown} placeholder={hasError ? "Por favor, insira um destino" : "Digite o destino"} />
        {value && (
          <button type="button" className="clearButton" onClick={()=>onChange('')} aria-label="Limpar destino">
            <FaTimes aria-hidden="true"/>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="floatingPanel destinationPanel">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => onSelectSuggestion(suggestion)}
              className="suggestionItem"
            >
              {suggestionIcons[suggestion.type]}
              <span>
                <strong>{suggestion.title}</strong>
                <small>{suggestion.subtitle}</small>
              </span>
            </button>
          ))}
        </div>
      )}
    </Container>
  )
}
