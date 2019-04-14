
import React from 'react'

import useModal from 'Hooks/useModal'

import Header from './Header'
import Modal from './Modal'
import Body from './Body'
import {Edit, Table, TableWrapper} from './Visuals'

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

  if (action.init) {
    return action.init
  }

  return state
}

/**
 * WIP: SuperTable API
 * sort: {key, direction} required, direction must be enum 'asc' || 'desc'
 * preferences: {order, columns}
 * masterColumnArray: [] column keys
 * columnMap: {key: label, value, fixed}
 * data: []
 * handleSort: (key) => null
 * prefCallback: (pref, prev, init) => null // optional
 */
function SuperTable (props) {
  const {columnMap, handleSort, preferences, masterColumnArray, prefCallback, sort, data} = props

  const [columnPreferences, setColumnPreferences] = React.useReducer(preferencesReducer, preferences)
  const prevColumnPreferences = React.useRef(null)

  const tableRef = React.useRef()

  const columns = React.useMemo(() => {
    return columnPreferences.order.map(i => masterColumnArray[i]).filter(k => columnPreferences.columns[k].enabled)
  }, [columnPreferences, masterColumnArray])

  // Column modal creation.
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
  }, [columnPreferences, columnMap, columns, masterColumnArray, setColumnPreferences])

  const [showModal] = useModal(memoModal)

  // Trigger preference change callback in the parent.
  React.useEffect(() => {
    if (prefCallback && typeof prefCallback === 'function') {
      prefCallback(columnPreferences, prevColumnPreferences.current, (payload) => setColumnPreferences({init: payload}))
    }
  }, [columnPreferences, prefCallback])

  React.useEffect(() => {
    prevColumnPreferences.current = columnPreferences
  }, [columnPreferences])

  return (
    <TableWrapper>
      <Edit handleClick={showModal} />
      <Table ref={tableRef}>
        <Header
          columnMap={columnMap}
          columnPreferences={columnPreferences}
          columns={columns}
          handleSort={handleSort}
          setColumnPreferences={setColumnPreferences}
          sort={sort}
        />
        <Body {...{columnMap, columns, data}} />
      </Table>
    </TableWrapper>
  )
}

export default SuperTable
