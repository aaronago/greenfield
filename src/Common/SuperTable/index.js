
import React from 'react'
import PropTypes from 'prop-types'

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

function SuperTable (props) {
  const {children, columnMap, data, handleSort, preferences, masterColumnArray, prefCallback, rowKeyGetter, sort} = props

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
      prefCallback(columnPreferences, prevColumnPreferences.current)
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
        <Body {...{columnMap, columns, data, rowKeyGetter}}>
          {children}
        </Body>
      </Table>
    </TableWrapper>
  )
}

SuperTable.propTypes = {
  children: PropTypes.func,
  columnMap: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.func.isRequired,
    fixed: PropTypes.bool
  })).isRequired,
  data: PropTypes.array.isRequired,
  handleSort:PropTypes.func.isRequired,
  masterColumnArray: PropTypes.array.isRequired,
  preferences: PropTypes.shape({
    order: PropTypes.array.isRequired,
    columns: PropTypes.objectOf(PropTypes.shape({
      width: PropTypes.number.isRequired,
      enabled: PropTypes.bool.isRequired
    })).isRequired
  }).isRequired,
  prefCallback: PropTypes.func,
  rowKeyGetter: PropTypes.func,
  sort: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['asc', 'desc']).isRequired
  }).isRequired
}

export default SuperTable
