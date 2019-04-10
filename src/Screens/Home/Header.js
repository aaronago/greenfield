import React from 'react'
import Draggable from 'react-draggable'
import {DotsVerticalRounded} from 'styled-icons/boxicons-regular/DotsVerticalRounded'
import {SortDown} from 'styled-icons/fa-solid/SortDown'
import {SortUp} from 'styled-icons/fa-solid/SortUp'
import mapValues from 'lodash-es/mapValues'

import {CanSort, DragSpan, SortClickable, TH} from './Visuals'

const THead = React.memo((props) => {
  const {columnMap, columns, handleSort, setColumnPreferences, setWidth, sort} = props
  return (
    <thead>
      <tr>
        {columns.map(key => {
          return (
            <TH key={`${key}-th`}>
              <SortClickable onClick={() => handleSort(key)}>
                {sort.key !== key && <CanSort size={14} />}
                {sort.key === key && sort.direction === 'asc' && <SortDown size={14} />}
                {sort.key === key && sort.direction === 'desc' && <SortUp size={14} />}
                {columnMap[key].label}
              </SortClickable>
              <Draggable
                axis="x"
                onDrag={(e, {deltaX}) => setWidth({key, deltaX})}
                onStop={(e, {lastX}) => setColumnPreferences({resize: {key, lastX}})}
                position={{x: 0}}
                zIndex={999}
              >
                <DragSpan>
                  <DotsVerticalRounded size={16} />
                </DragSpan>
              </Draggable>
            </TH>
          )
        })}
      </tr>
    </thead>
  )
})

function reducer (state, {key, deltaX}) {
  return { ...state, [key]: state[key] + deltaX }
}

function Header (props) {
  const {columnMap, columns, columnPreferences, handleSort, setColumnPreferences, sort} = props
  const [widths, setWidth] = React.useReducer(reducer, mapValues(columnPreferences.columns, (o) => o.width))

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
