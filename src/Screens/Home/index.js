
import React from 'react'
import isEqual from 'lodash-es/isEqual'

import useModal from 'Hooks/useModal'
import {getAllHeroes} from 'api'

import Header from './Header'
import Modal from './Modal'

const masterColumnArray = [
  'name',
  'gender',
  'race'
]

const columnMap = {
  name: {
    label: 'Hero Name',
    value: (h) => h.name
  },
  gender: {
    label: 'Gender',
    value: (h) => h.appearance.gender
  },
  race: {
    label: 'Race',
    value: (h) => h.appearance.race
  }
}

const defaultColumnPreferences = {
  name: {
    width: 500,
    enabled: true
  },
  gender: {
    width: 300,
    enabled: true
  },
  race: {
    width: 200,
    enabled: true
  }
}

function reducer (state, action) {
  if (action.resize) {
    const {key, lastX} = action.resize
    return {
      ...state,
      [key]: {
        ...state[key],
        width: state[key].width + lastX
      }
    }
  }

  if (action.showHide) {
    const {key, value} = action.showHide
    return {
      ...state,
      [key]: {
        ...state[key],
        enabled: value
      }
    }
  }

  return state
}

export function Home () {
  const [heroes, setHeroes] = React.useState(null)
  const [columnPreferences, setColumnPreferences] = React.useReducer(reducer, defaultColumnPreferences)
  const prevColumnPreferences = React.useRef(null)

  React.useEffect(() => {
    if (prevColumnPreferences.current && !isEqual(prevColumnPreferences, columnPreferences)) {
      console.log('Update columnPreferences via API')
    }
  }, [columnPreferences])

  React.useEffect(() => {
    async function fetchData () {
      try {
        const { data } = await getAllHeroes()
        setHeroes(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  const columns = React.useMemo(() => {
    return Object.keys(columnPreferences).filter(k => columnPreferences[k].enabled)
  }, [columnPreferences])

  const memoModal = React.useCallback(() => {
    return (
      <Modal
        columnMap={columnMap}
        columns={columns}
        masterColumnArray={masterColumnArray}
        setColumnPreferences={setColumnPreferences}
      />
    )
  }, [columns])

  const [showModal] = useModal(memoModal)

  React.useEffect(() => {
    prevColumnPreferences.current = columnPreferences
  }, [columnPreferences])

  if (!heroes) {
    return null
  }

  return (
    <React.Fragment>
      <h2>{heroes.length} results</h2>
      <p>
        <button onClick={() => showModal()}>
          manage columns
        </button>
      </p>
      <table>
        <Header
          columnMap={columnMap}
          columnPreferences={columnPreferences}
          columns={columns}
          setColumnPreferences={setColumnPreferences}
        />
        <tbody>
          {heroes.map(hero => {
            return (
              <tr key={hero.slug}>
                {columns.map(key => {
                  return (
                    <td key={`${key}-${hero.slug}`}>
                      {columnMap[key].value(hero)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}
