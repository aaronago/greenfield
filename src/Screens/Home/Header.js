import React from 'react'
import Draggable from 'react-draggable'
import { DotsVerticalRounded } from 'styled-icons/boxicons-regular/DotsVerticalRounded'
import mapValues from 'lodash-es/mapValues'

import {DragSpan, TH} from './Visuals'

const THead = React.memo((props) => {
  const {columnMap, columns, setColumnPreferences, setWidth} = props
  return (
    <thead>
      <tr>
        {columns.map(key => {
          return (
            <TH key={`${key}-th`}>
              {columnMap[key].label}
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
  const {columnMap, columns, columnPreferences, setColumnPreferences} = props
  const [widths, setWidth] = React.useReducer(reducer, mapValues(columnPreferences, (o) => o.width))

  return (
    <React.Fragment>
      <colgroup>
        {columns.map(key => {
          return (
            <col key={`${key}-col`} style={{width: widths[key] + 'px'}} />
          )
        })}
      </colgroup>
      <THead columnMap={columnMap} columns={columns} setColumnPreferences={setColumnPreferences} setWidth={setWidth} />
    </React.Fragment>
  )
}

export default Header
