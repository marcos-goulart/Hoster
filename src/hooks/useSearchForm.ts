import { useState, useEffect, type FormEvent} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePageLoading } from './usePageLoading'
import { getSearchSuggestions } from '../services/searchSuggestions'
import type { SearchSuggestion } from '../interfaces/SearchSuggestion'
import { buildSearchUrl } from '../utils/buildSearchUrl'

type ActivePanel = 'destination' | 'dates' | 'travelers' | null

export function useSearchForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [localizacao, setLocalizacao] = useState(searchParams.get('localizacao') ?? '')
  const [entrada, setEntrada] = useState(searchParams.get('entrada') ?? '')
  const [saida, setSaida] = useState(searchParams.get('saida') ?? '')
  const [flexibilidade, setFlexibilidade] = useState(Number(searchParams.get('flexibilidade') ?? 0))
  const [duracaoFlexivel, setDuracaoFlexivel] = useState(searchParams.get('duracaoFlexivel') ?? '1')
  const [incluirFimDeSemana, setIncluirFimDeSemana] = useState(searchParams.get('incluirFimDeSemana') === 'true')
  const [mesesFlexiveis, setMesesFlexiveis] = useState<string[]>(
    searchParams.get('mesesFlexiveis') ? searchParams.get('mesesFlexiveis')!.split(',') : [],
  )
  const [periodo, setPeriodo] = useState(searchParams.get('periodo') ?? '')
  const [adultos, setAdultos] = useState(searchParams.get('adultos') ? Number(searchParams.get('adultos')) : 0)
  const [criancas, setCriancas] = useState(Number(searchParams.get('criancas') ?? 0))
  const [quartos, setQuartos] = useState(Number(searchParams.get('quartos') ?? 1))
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])

  const { triggerLoading } = usePageLoading()

  useEffect(() => {
    let isMounted = true
    async function loadSuggestions() {
      const suggestionList = await getSearchSuggestions(localizacao)
      if (isMounted) setSuggestions(suggestionList)
    }
    void loadSuggestions()
    return () => { isMounted = false }
  }, [localizacao])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const formElement = document.querySelector('form.search-form-container')
      if (formElement && !formElement.contains(target)) {
        setActivePanel(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setActivePanel(null)
    triggerLoading(() => {
      navigate(
        buildSearchUrl({
          localizacao, entrada, saida, periodo, flexibilidade,
          duracaoFlexivel, incluirFimDeSemana, mesesFlexiveis,
          adultos, criancas, quartos,
        })
      )
    })
  }

  return {
    state: {
      localizacao, entrada, saida, flexibilidade, duracaoFlexivel,
      incluirFimDeSemana, mesesFlexiveis, periodo, adultos, criancas,
      quartos, activePanel, suggestions
    },
    actions: {
      setLocalizacao, setEntrada, setSaida, setFlexibilidade,
      setDuracaoFlexivel, setIncluirFimDeSemana, setMesesFlexiveis,
      setPeriodo, setAdultos, setCriancas, setQuartos, setActivePanel,
      handleSubmit
    }
  }
}
