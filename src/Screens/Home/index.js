
import React from 'react'
import styled from 'styled-components'
import isEqual from 'lodash-es/isEqual'
import orderBy from 'lodash-es/orderBy'
import {MoneyBill} from 'styled-icons/fa-solid/MoneyBill'

import {getAllHeroes} from 'api'

import SuperTable from 'Common/SuperTable'

const H2 = styled('h2')`
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
`

// SuperTable Requirements
const masterColumnArray = [
  'name',
  'gender',
  'race',
  'publisher',
  'pay'
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
  },
  pay: {
    label: 'Pay',
    value: h => <MoneyBill size={24} />,
    fixed: true
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
    },
    pay: {
      width: 30,
      enabled: true
    }
  }
}

// Home Data Requirements
const initialData = {
  sort: {
    key: 'name',
    direction: 'asc'
  },
  heroes: null,
  preferences: null
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
            ...state,
            sort: {
              key: sortKey,
              direction: 'desc'
            },
            heroes: orderBy(state.heroes, columnMap[sortKey].value, 'desc')
          }
        : {
            ...state,
            sort: {
              key: sortKey,
              direction: 'asc'
            },
            heroes: orderBy(state.heroes, columnMap[sortKey].value, 'asc')
          }
    } else {
      return {
        ...state,
        sort: {
          key: sortKey,
          direction: 'asc'
        },
        heroes: orderBy(state.heroes, columnMap[sortKey].value, 'asc')
      }
    }
  }

  if (action.setPreferences) {
    return {
      ...state,
      preferences: action.setPreferences
    }
  }

  return state
}

function rowKeyGetter (datum) {
  return datum.slug
}

export function Home () {
  const [data, dispatch] = React.useReducer(dataReducer, initialData)
  const {heroes, preferences, sort} = data

  const prefCallback = React.useCallback((pref, prev) => {
    // Update our preferences on change.
    if (prev && !isEqual(prev, pref)) {
      localStorage.setItem('super-hero-preferences', JSON.stringify(pref))
    }
  }, [])

  React.useEffect(() => {
    // Hydrate preferences with stored
    if (localStorage.getItem('super-hero-preferences')) {
      dispatch({setPreferences: JSON.parse(localStorage.getItem('super-hero-preferences'))})
    } else {
      dispatch({setPreferences: initialPreferences})
    }

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

  if (!heroes || !preferences) {
    return null
  }

  return (
    <React.Fragment>
      <H2>{heroes.length} results </H2>
      <SuperTable {...{columnMap, handleSort, preferences, masterColumnArray, prefCallback, rowKeyGetter, sort, data: heroes}}>
        {({datum}) => {
          return (
            <React.Fragment>
              <h1>{datum.biography.fullName}</h1>
              <p><img src={datum.images.sm} alt={datum.name} /></p>
            </React.Fragment>
          )
        }}
      </SuperTable>
    </React.Fragment>
  )
}
