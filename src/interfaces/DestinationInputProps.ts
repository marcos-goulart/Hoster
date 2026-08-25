import type { KeyboardEvent } from "react";
import type { SearchSuggestion } from "./SearchSuggestion"

export interface DestinationInputProps{
  value: string
  onChange: (value:string)=>void
  isOpen: boolean
  onFocus: () => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>)=>void
  suggestions: SearchSuggestion[]
  onSelectSuggestion: (suggestion: SearchSuggestion) => void
  hasError?: boolean
}
