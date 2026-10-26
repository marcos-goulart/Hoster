import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { FaCalendarAlt } from 'react-icons/fa'

import type { SearchSuggestion } from '../../../interfaces/SearchSuggestion'
import { getSearchSuggestions } from '../../../services/searchSuggestions'
import { CalendarPicker } from './CalendarPicker'
import { SearchButton } from './SearchButton'
import { DestinationInput } from './DestinationInput'
import { TravelersPicker } from './TravelersPicker'
import { Form } from './styles'
import { buildSearchUrl } from '../../../utils/buildSearchUrl'
import { formatDateRange } from '../../../utils/formatDateRange'
import { PeriodSelect } from './PeriodSelect'

type ActivePanel = 'destination' | 'dates' | 'travelers' | null

export function SearchForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [localizacao, setLocalizacao] = useState(searchParams.get('localizacao') ?? '')
  const [entrada, setEntrada] = useState(searchParams.get('entrada') ?? '')
  const [saida, setSaida] = useState(searchParams.get('saida') ?? '')
  const [flexibilidade, setFlexibilidade] = useState(Number(searchParams.get('flexibilidade') ?? 0))
  const [duracaoFlexivel, setDuracaoFlexivel] = useState(searchParams.get('duracaoFlexivel') ?? '1')
  const [incluirFimDeSemana, setIncluirFimDeSemana] = useState(
    searchParams.get('incluirFimDeSemana') === 'true',
  )
  const [mesesFlexiveis, setMesesFlexiveis] = useState<string[]>(
    searchParams.get('mesesFlexiveis') ? searchParams.get('mesesFlexiveis')!.split(',') : [],
  )
  const [periodo, setPeriodo] = useState(searchParams.get('periodo') ?? '')
  const [adultos, setAdultos] = useState(
    searchParams.get('adultos') ? Number(searchParams.get('adultos')) : 0,
  )
  const [criancas, setCriancas] = useState(Number(searchParams.get('criancas') ?? 0))
  const [quartos, setQuartos] = useState(Number(searchParams.get('quartos') ?? 1))

  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function loadSuggestions() {
      const suggestionList = await getSearchSuggestions(localizacao)
      if (isMounted) setSuggestions(suggestionList)
    }
    void loadSuggestions()
    return () => {
      isMounted = false
    }
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

  const executeSearch = (overrideDates?: { entrada?: string; saida?: string }) => {
    const finalEntrada = overrideDates?.entrada !== undefined ? overrideDates.entrada : entrada
    const finalSaida = overrideDates?.saida !== undefined ? overrideDates.saida : saida

    if (!localizacao.trim() && location.pathname !== '/resultado') {
      setError(true)
      return
    }
    setError(false)
    setActivePanel(null)

    const searchUrl = buildSearchUrl({
      localizacao,
      entrada: finalEntrada,
      saida: finalSaida,
      periodo,
      flexibilidade,
      duracaoFlexivel,
      incluirFimDeSemana,
      mesesFlexiveis,
      adultos,
      criancas,
      quartos,
    })

    const queryString = searchUrl.includes('?') ? searchUrl.split('?')[1] : ''
    const queryParams = new URLSearchParams(queryString)

    setSearchParams(queryParams)
    navigate(searchUrl)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    executeSearch()
  }

  return (
    <Form className="search-form-container" onSubmit={handleSubmit}>
      <div className="searchRow">
        <div className="destinationWrapper">
          <DestinationInput
            value={localizacao}
            hasError={error}
            onChange={(val) => {
              setLocalizacao(val)
              if (val) setError(false)
            }}
            isOpen={activePanel === 'destination'}
            onFocus={() => setActivePanel('destination')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !entrada) {
                e.preventDefault()
                setActivePanel('dates')
              }
            }}
            suggestions={suggestions}
            onSelectSuggestion={(suggestion) => {
              setLocalizacao(suggestion.value)
              setActivePanel('dates')
              setError(false)
            }}
          />
        </div>

        <div className="field dateField">
          <label>Datas</label>
          <button
            type="button"
            className="fieldButton"
            onClick={() => setActivePanel((prev) => (prev === 'dates' ? null : 'dates'))}
          >
            <FaCalendarAlt aria-hidden="true" />
            {formatDateRange(entrada, saida, flexibilidade, duracaoFlexivel, mesesFlexiveis)}
          </button>

          {activePanel === 'dates' && (
            <div className="floatingPanel datesPanel">
              <CalendarPicker
                entrada={entrada}
                saida={saida}
                flexibilidade={flexibilidade}
                duracaoFlexivel={duracaoFlexivel}
                incluirFimDeSemana={incluirFimDeSemana}
                mesesFlexiveis={mesesFlexiveis}
                onChangeDates={(ent, sai) => {
                  setEntrada(ent)
                  setSaida(sai)
                }}
                onChangeFlexibility={setFlexibilidade}
                onChangeFlexibleSearch={(dur, inc, mes) => {
                  setDuracaoFlexivel(dur)
                  setIncluirFimDeSemana(inc)
                  setMesesFlexiveis(mes)
                }}
                onApply={(ent, sai) => {
                  const entStr = ent !== undefined ? ent : entrada
                  const saiStr = sai !== undefined ? sai : saida
                  setEntrada(entStr)
                  setSaida(saiStr)
                  setActivePanel(null)

                  if (localizacao.trim() || location.pathname === '/resultado') {
                    executeSearch({ entrada: entStr, saida: saiStr })
                  }
                }}
              />
            </div>
          )}
        </div>

        <PeriodSelect
          value={periodo}
          onChange={setPeriodo}
          onFocus={() => setActivePanel(null)}
          onClick={() => setActivePanel(null)}
        />

        <TravelersPicker
          adultos={adultos}
          criancas={criancas}
          quartos={quartos}
          isOpen={activePanel === 'travelers'}
          onToggle={() => setActivePanel((prev) => (prev === 'travelers' ? null : 'travelers'))}
          onClose={() => setActivePanel(null)}
          onChangeAdultos={setAdultos}
          onChangeCriancas={setCriancas}
          onChangeQuartos={setQuartos}
        />

        <SearchButton />
      </div>
    </Form>
  )
}
