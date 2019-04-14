import React from 'react'
import {DotsVerticalRounded} from 'styled-icons/boxicons-regular/DotsVerticalRounded'
import {SortDown} from 'styled-icons/fa-solid/SortDown'
import {SortUp} from 'styled-icons/fa-solid/SortUp'
import mapValues from 'lodash-es/mapValues'
import {useGesture} from 'react-with-gesture'

import {CanSort, ResizeHandle, SortClickable, TH} from './Visuals'

const THead = React.memo((props) => {
  const {columnMap, columns, handleSort, setColumnPreferences, setWidth, sort} = props

  const bind = useGesture((event) => {
    const {args: [key], previous: [previousX], xy: [curX], down, delta: [lastX]} = event
    const deltaX = curX - previousX
    setWidth({key, deltaX})
    if (!down) {
      setColumnPreferences({resize: {key, lastX}})
    }
  })

  return (
    <thead>
      <tr>
        {columns.map(key => {
          if (columnMap[key].fixed) {
            return <TH key={`${key}-th`}>{columnMap[key].label}</TH>
          }

          return (
            <TH key={`${key}-th`}>
              <SortClickable onClick={() => handleSort(key)}>
                {sort.key !== key && <CanSort size={14} />}
                {sort.key === key && sort.direction === 'asc' && <SortDown size={14} />}
                {sort.key === key && sort.direction === 'desc' && <SortUp size={14} />}
                {columnMap[key].label}
              </SortClickable>
              <ResizeHandle {...bind(key)}>
                <DotsVerticalRounded size={16} />
              </ResizeHandle>
            </TH>
          )
        })}
      </tr>
    </thead>
  )
})

function initReducer (columns) {
  return mapValues(columns, c => c.width)
}

function reducer (state, action) {
  if (action.init) {
    return initReducer(action.init)
  }

  const {key, deltaX} = action
  return { ...state, [key]: state[key] + deltaX }
}

function Header (props) {
  const {columnMap, columns, columnPreferences, handleSort, setColumnPreferences, sort} = props
  const prefColumnMap = columnPreferences.columns
  const [widths, setWidth] = React.useReducer(reducer, prefColumnMap, initReducer)

  React.useEffect(() => {
    setWidth({init: prefColumnMap})
  }, [prefColumnMap])

  return (
    <React.Fragment>
      <colgroup>
        {columns.map(key => {
          return (
            <col key={`${key}-col`} style={{width: widths[key] + 'px'}} />
          )
        })}
      </colgroup>
      <THead
        columnMap={columnMap}
        columns={columns}
        handleSort={handleSort}
        setColumnPreferences={setColumnPreferences}
        setWidth={setWidth}
        sort={sort}
      />
    </React.Fragment>
  )
}

export default Header
