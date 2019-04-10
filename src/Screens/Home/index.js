
import React from 'react'
import isEqual from 'lodash-es/isEqual'
import orderBy from 'lodash-es/orderBy'

import useModal from 'Hooks/useModal'
import {getAllHeroes} from 'api'

import Header from './Header'
import Modal from './Modal'
import {H2, Table, TD, TR} from './Visuals'

const masterColumnArray = [
  'name',
  'gender',
  'race',
  'publisher'
]

const columnMap = {
  name: {
    label: 'Hero Name',
    value: h => h.name
  },
  gender: {
    label: 'Gender',
    value: h => h.appearance.gender
  },
  race: {
    label: 'Race',
    value: h => h.appearance.race
  },
  publisher: {
    label: 'Publisher',
    value: h => h.biography.publisher
  }
}

const initialPreferences = {
  order: masterColumnArray.map((_, index) => index),
  columns: {
    name: {
      width: 500,
      enabled: true
    },
    gender: {
      width: 100,
      enabled: true
    },
    race: {
      width: 200,
      enabled: true
    },
    publisher: {
      width: 200,
      enabled: true
    }
  }
}

function preferencesReducer (state, action) {
  if (action.resize) {
    const {key, lastX} = action.resize
    return {
      ...state,
      columns: {
        ...state.columns,
        [key]: {
          ...state.columns[key],
          width: state.columns[key].width + lastX
        }
      }
    }
  }

  if (action.showHide) {
    const {key, value} = action.showHide
    return {
      ...state,
      columns: {
        ...state.columns,
        [key]: {
          ...state.columns[key],
          enabled: value
        }
      }
    }
  }

  if (action.changeOrder) {
    return {
      ...state,
      order: action.changeOrder
    }
  }

  return state
}

const initialData = {
  sort: {
    key: 'name',
    direction: 'asc'
  },
  heroes: null
}

function dataReducer (state, action) {
  if (action.setHeroes) {
    const {key, direction} = state.sort
    return {
      ...state,
      heroes: orderBy(action.setHeroes, columnMap[key].value, direction)
    }
  }

  if (action.sortKey) {
    const {sortKey} = action
    const {sort} = state
    if (sortKey === sort.key) {
      return sort.direction === 'asc'
        ? {
            sort: {
              key: sortKey,
              direction: 'desc'
            },
            heroes: orderBy(state.heroes, columnMap[sortKey].value, 'desc')
          }
        : {
            sort: {
              key: sortKey,
              direction: 'asc'
            },
            heroes: orderBy(state.heroes, columnMap[sortKey].value, 'asc')
          }
    } else {
      return {
        sort: {
          key: sortKey,
          direction: 'asc'
        },
        heroes: orderBy(state.heroes, columnMap[sortKey].value, 'asc')
      }
    }
  }

  return state
}

export function Home () {
  const [data, dispatch] = React.useReducer(dataReducer, initialData)
  const {heroes, sort} = data

  const [columnPreferences, setColumnPreferences] = React.useReducer(preferencesReducer, initialPreferences)
  const prevColumnPreferences = React.useRef(null)

  React.useEffect(() => {
    if (prevColumnPreferences.current && !isEqual(prevColumnPreferences, columnPreferences)) {
      console.log('Update columnPreferences via API', columnPreferences)
    }
  }, [columnPreferences])

  React.useEffect(() => {
    async function fetchData () {
      try {
        const { data } = await getAllHeroes()
        dispatch({setHeroes: data})
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  const handleSort = React.useCallback((sortKey) => dispatch({sortKey}), [])

  const columns = React.useMemo(() => {
    return columnPreferences.order.map(i => masterColumnArray[i]).filter(k => columnPreferences.columns[k].enabled)
  }, [columnPreferences])

  const memoModal = React.useCallback(() => {
    return (
      <Modal
        columnMap={columnMap}
        columns={columns}
        columnPreferences={columnPreferences}
        masterColumnArray={masterColumnArray}
        setColumnPreferences={setColumnPreferences}
      />
    )
  }, [columnPreferences, columns])

  const [showModal] = useModal(memoModal)

  React.useEffect(() => {
    prevColumnPreferences.current = columnPreferences
  }, [columnPreferences])

  if (!heroes) {
    return null
  }

  return (
    <React.Fragment>
      <H2>{heroes.length} results <button onClick={showModal}>manage columns</button></H2>
      <Table>
        <Header
          columnMap={columnMap}
          columnPreferences={columnPreferences}
          columns={columns}
          handleSort={handleSort}
          setColumnPreferences={setColumnPreferences}
          sort={sort}
        />
        <tbody>
          {heroes.map((hero, i) => {
            return (
              <TR key={hero.slug} contrast={i % 2 === 0}>
                {columns.map(key => {
                  return (
                    <TD key={`${key}-${hero.slug}`}>
                      {columnMap[key].value(hero)}
                    </TD>
                  )
                })}
              </TR>
            )
          })}
        </tbody>
      </Table>
    </React.Fragment>
  )
}

/**
 * WIP: SuperTable API
 * sort: {key, direction} required, direction must be enum 'asc' || 'desc'
 */
