
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

const defaultColumnPreferences = {
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

function preferencesReducer (state, action) {
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
  // @TODO Let's combine our heroes and sort state into a single reducer as sorting in this instance
  // is JS based, not API based.
  const [heroes, setHeroes] = React.useState(null)
  const [sort, setSort] = React.useState({key: 'name', direction: 'asc'})
  // @TODO defaultColumnPreferences would actually be merged with the results of the getPreference API call.
  const [columnPreferences, setColumnPreferences] = React.useReducer(preferencesReducer, defaultColumnPreferences)
  const prevColumnPreferences = React.useRef(null)

  React.useEffect(() => {
    if (prevColumnPreferences.current && !isEqual(prevColumnPreferences, columnPreferences)) {
      console.log('Update columnPreferences via API')
    }
  }, [columnPreferences])

  // BEGIN SORT & DATA FETCH
  const performSort = React.useCallback((data, key, direction) => {
    setHeroes(orderBy(data, columnMap[key].value, direction))
  }, [])

  React.useEffect(() => {
    async function fetchData () {
      try {
        const { data } = await getAllHeroes()
        // Don't assume results are ordered correctly.
        performSort(data, 'name', 'asc')
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [performSort])

  const sortOptions = React.useCallback((key) => {
    if (key === sort.key) {
      return sort.direction === 'asc'
        ? {key: key, direction: 'desc'}
        : {key: key, direction: 'asc'}
    } else {
      return {key: key, direction: 'asc'}
    }
  }, [sort])

  const handleSort = React.useCallback(key => {
    const options = sortOptions(key)
    performSort(heroes, key, options.direction)
    setSort(options)
  }, [heroes, performSort, sortOptions])
  // END SORT

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
      <H2>{heroes.length} results <button onClick={showModal}>manage columns</button></H2>
      <Table>
        <Header
          columnMap={columnMap}
          columnPreferences={columnPreferences}
          columns={columns}
          handleSort={handleSort}
          setColumnPreferences={setColumnPreferences}
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
