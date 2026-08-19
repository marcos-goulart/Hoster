import { useEffect, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { FaBuilding, FaCalendarAlt, FaPlane, FaTimes, FaUser } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { usePageLoading } from '../../../context/PageLoadingContext'
import type { SearchSuggestion } from '../../../interfaces/SearchSuggestion'
import { getSearchSuggestions } from '../../../services/searchSuggestions'
import { CalendarPicker } from './CalendarPicker'
import { SearchButton } from './SearchButton'
import { Form } from './styles'

type ActivePanel = 'destination' | 'dates' | 'travelers' | null

const suggestionIcons = {
  city: <FaBuilding aria-hidden='true' />,
  district: <FaBuilding aria-hidden='true' />,
  airport: <FaPlane aria-hidden='true' />,
}

function buildSearchUrl(values: {
  localizacao: string
  entrada: string
  saida: string
  periodo: string
  flexibilidade: number
  duracaoFlexivel: string
  incluirFimDeSemana: boolean
  mesesFlexiveis: string[]
  adultos: number
  criancas: number
  quartos: number
}) {
  const params = new URLSearchParams()

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      if (value) params.set(key, 'true')
      return
    }

    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(','))
      return
    }

    if (typeof value === 'number') {
      if (value > 0 || key === 'adultos' || key === 'quartos') {
        params.set(key, String(value))
      }
      return
    }

    if (typeof value === 'string' && value.trim()) {
      params.set(key, value.trim())
    }
  })

  return `/resultado?${params.toString()}`
}

function formatDateRange(
  entrada: string,
  saida: string,
  flexibilidade: number,
  duracaoFlexivel: string,
  mesesFlexiveis: string[],
) {
  if (entrada || saida) {
    let rangeText = entrada && saida ? `${entrada} - ${saida}` : entrada || saida
    if (flexibilidade > 0) {
      rangeText += ` (± ${flexibilidade}d)`
    }
    return rangeText
  }

  if (mesesFlexiveis.length > 0 && duracaoFlexivel) {
    const durLabel =
      duracaoFlexivel === '1'
        ? '1 diária'
        : duracaoFlexivel === '2-3'
          ? '2-3 diárias'
          : duracaoFlexivel === '4-5'
            ? '4-5 diárias'
            : '6-7 diárias'
    return `${durLabel} em ${mesesFlexiveis.join(', ')}`
  }

  return 'Escolha as datas'
}

function formatTravelers(adultos: number, criancas: number, quartos: number) {
  const totalTravelers = adultos + criancas
  const travelerLabel = totalTravelers === 1 ? 'viajante' : 'viajantes'
  const roomLabel = quartos === 1 ? 'quarto' : 'quartos'

  return `${totalTravelers} ${travelerLabel}, ${quartos} ${roomLabel}`
}

export function SearchForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [localizacao, setLocalizacao] = useState(searchParams.get('localizacao') ?? '')
  const [entrada, setEntrada] = useState(searchParams.get('entrada') ?? '')
  const [saida, setSaida] = useState(searchParams.get('saida') ?? '')
  const [flexibilidade, setFlexibilidade] = useState(Number(searchParams.get('flexibilidade') ?? 0))
  const [duracaoFlexivel, setDuracaoFlexivel] = useState(searchParams.get('duracaoFlexivel') ?? '1')
  const [incluirFimDeSemana, setIncluirFimDeSemana] = useState(
    searchParams.get('incluirFimDeSemana') === 'true',
  )
  const [mesesFlexiveis, setMesesFlexiveis] = useState<string[]>(
    searchParams.get('mesesFlexiveis')
      ? searchParams.get('mesesFlexiveis')!.split(',')
      : ['Agosto 2026'],
  )
  const [periodo, setPeriodo] = useState(searchParams.get('periodo') ?? '')
  const [adultos, setAdultos] = useState(Number(searchParams.get('adultos') ?? 2))
  const [criancas, setCriancas] = useState(Number(searchParams.get('criancas') ?? 0))
  const [quartos, setQuartos] = useState(Number(searchParams.get('quartos') ?? 1))
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])

  useEffect(() => {
    let isMounted = true

    async function loadSuggestions() {
      const suggestionList = await getSearchSuggestions(localizacao)

      if (isMounted) {
        setSuggestions(suggestionList)
      }
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const { triggerLoading } = usePageLoading()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setActivePanel(null)
    triggerLoading(() => {
      navigate(
        buildSearchUrl({
          localizacao,
          entrada,
          saida,
          periodo,
          flexibilidade,
          duracaoFlexivel,
          incluirFimDeSemana,
          mesesFlexiveis,
          adultos,
          criancas,
          quartos,
        }),
      )
    }, 1000)
  }

  const handleLocationKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !entrada) {
      event.preventDefault()
      setActivePanel('dates')
    }
  }

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setLocalizacao(suggestion.value)
    setActivePanel('dates')
  }

  const updateCounter = (setter: (value: number) => void, value: number, min: number) => {
    setter(Math.max(min, value))
  }

  return (
    <Form className='search-form-container' onSubmit={handleSubmit}>
      <div className='searchRow'>
        <div className='field destinationField'>
          <label htmlFor='localizacao'>Localizacao</label>
          <div className='inputShell'>
            <input
              type='text'
              id='localizacao'
              name='localizacao'
              placeholder='Digite a localizacao'
              value={localizacao}
              onChange={(event) => setLocalizacao(event.target.value)}
              onFocus={() => setActivePanel('destination')}
              onKeyDown={handleLocationKeyDown}
            />
            {localizacao ? (
              <button type='button' className='clearButton' onClick={() => setLocalizacao('')}>
                <FaTimes aria-hidden='true' />
              </button>
            ) : null}
          </div>

          {activePanel === 'destination' ? (
            <div className='floatingPanel destinationPanel'>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type='button'
                  className='suggestionItem'
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestionIcons[suggestion.type]}
                  <span>
                    <strong>{suggestion.title}</strong>
                    <small>{suggestion.subtitle}</small>
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className='field dateField'>
          <label>Datas</label>
          <button
            type='button'
            className='fieldButton'
            onClick={() => setActivePanel((prev) => (prev === 'dates' ? null : 'dates'))}
          >
            <FaCalendarAlt aria-hidden='true' />
            {formatDateRange(
              entrada,
              saida,
              flexibilidade,
              duracaoFlexivel,
              mesesFlexiveis,
            )}
          </button>

          {activePanel === 'dates' ? (
            <div className='floatingPanel datesPanel'>
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
                onChangeFlexibility={(flex) => setFlexibilidade(flex)}
                onChangeFlexibleSearch={(dur, inc, mes) => {
                  setDuracaoFlexivel(dur)
                  setIncluirFimDeSemana(inc)
                  setMesesFlexiveis(mes)
                }}
              />
            </div>
          ) : null}
        </div>

        <div className='field periodField'>
          <label htmlFor='periodo'>Periodo</label>
          <select
            id='periodo'
            name='periodo'
            aria-label='Selecione o periodo'
            value={periodo}
            onChange={(event) => setPeriodo(event.target.value)}
          >
            <option value=''>Selecione</option>
            <option value='madrugada'>Madrugada</option>
            <option value='manha'>Manha</option>
            <option value='tarde'>Tarde</option>
            <option value='noite'>Noite</option>
          </select>
        </div>

        <div className='field travelersField'>
          <label>Viajantes</label>
          <button
            type='button'
            className='fieldButton'
            onClick={() => setActivePanel((prev) => (prev === 'travelers' ? null : 'travelers'))}
          >
            <FaUser aria-hidden='true' />
            {formatTravelers(adultos, criancas, quartos)}
          </button>

          {activePanel === 'travelers' ? (
            <div className='floatingPanel travelersPanel'>
              <strong>Quarto 1</strong>
              <div className='counterRow'>
                <span>Adultos</span>
                <div>
                  <button type='button' onClick={() => updateCounter(setAdultos, adultos - 1, 1)}>
                    -
                  </button>
                  <strong>{adultos}</strong>
                  <button type='button' onClick={() => updateCounter(setAdultos, adultos + 1, 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className='counterRow'>
                <span>Criancas</span>
                <div>
                  <button type='button' onClick={() => updateCounter(setCriancas, criancas - 1, 0)}>
                    -
                  </button>
                  <strong>{criancas}</strong>
                  <button type='button' onClick={() => updateCounter(setCriancas, criancas + 1, 0)}>
                    +
                  </button>
                </div>
              </div>
              <button type='button' className='addRoomButton' onClick={() => setQuartos(quartos + 1)}>
                Adicionar outro quarto
              </button>
              <button type='button' className='confirmButton' onClick={() => setActivePanel(null)}>
                OK
              </button>
            </div>
          ) : null}
        </div>

        <SearchButton />
      </div>
    </Form>
  )
}

