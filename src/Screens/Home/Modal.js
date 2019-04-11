
import React from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import {useGesture} from 'react-with-gesture'
import {useSprings, interpolate} from 'react-spring'

import {ReorderDraggable} from './Visuals'

const rowHeight = 25
function styles (order, down, originalIndex, curIndex, y) {
  return function (index) {
    return down && index === originalIndex
      ? { backgroundColor: '#eee', y: curIndex * rowHeight + y, scale: 1.1, zIndex: '1', immediate: n => n === 'y' || n === 'zIndex' }
      : { backgroundColor: '#fff', y: order.indexOf(index) * rowHeight, scale: 1, zIndex: '0', immediate: false }
  }
}

function Modal (props) {
  const {columnMap, columnPreferences, columns, masterColumnArray, setColumnPreferences} = props

  const enabledColumns = masterColumnArray.filter(k => !columnMap[k].fixed)

  const order = React.useRef(columnPreferences.order)
  const [springs, setSprings] = useSprings(masterColumnArray.length, styles(order.current))

  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * rowHeight + y) / rowHeight), 0, masterColumnArray.length - 1)
    // If the current row would be a fixed column in the UI we just maintain status quo,
    // otherwise we swap the originalIndexes.
    if (!columnMap[masterColumnArray[curRow]].fixed) {
      const newOrder = swap(order.current, curIndex, curRow)
      setSprings(styles(newOrder, down, originalIndex, curIndex, y))
      if (!down) {
        order.current = newOrder
        setColumnPreferences({changeOrder: newOrder})
      }
    } else {
      setSprings(styles(order.current, down, originalIndex, curIndex, y))
    }
  })

  return (
    <React.Fragment>
      <h2>Manage Columns</h2>
      <div style={{ position: 'relative', height: enabledColumns.length * 25 + 'px' }}>
        {springs.map((props, i) => {
          const {backgroundColor, scale, y, zIndex} = props
          const key = masterColumnArray[i]

          // Don't render fixed columns in the management.
          if (columnMap[key].fixed) {
            return null
          }

          return (
            <ReorderDraggable
              key={key}
              style={{
                backgroundColor,
                zIndex,
                transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`)
              }}
            >
              <input
                type='checkbox'
                onChange={e => setColumnPreferences({showHide: {key, value: e.target.checked}})}
                checked={columns.includes(key)}
              />
              {/* Bind the actual click/drag functionality just to the text. */}
              <span {...bind(i)}>{columnMap[key].label}</span>
            </ReorderDraggable>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default Modal
