import React from 'react'
import {animated, useTransition} from 'react-spring'

import {TD, TBody, TextButton} from './Visuals'

function RowSet ({children, columnMap, columns, datum, i}) {
  const [show, set] = React.useState(false)
  const toggle = React.useCallback(() => set(!show), [show])
  
  const transitions = useTransition(show, null, {
    from: {opacity: 0, height: 0},
    enter: {height: 'auto', opacity: 1},
    leave: {display: 'none', height: 0, opacity: 0}
  })

  return (
    <TBody>
      <tr>
        {columns.map(key => {
          return (
            <TD key={`${key}-${i}-td`}>
              <TextButton onClick={toggle}>{columnMap[key].value(datum, show)}</TextButton>
            </TD>
          )
        })}
      </tr>
      {children && typeof children === 'function' && transitions.map(({ item, key, props }) => item &&
        <animated.tr key={key} style={props}>
          <td colSpan={columns.length}>
            {children({datum})}
          </td>
        </animated.tr>
      )}
    </TBody>
  )
}

const Body = React.memo(function (props) {
  const {children, columnMap, columns, data, rowKeyGetter} = props
  return (
    <React.Fragment>
      {data.map((datum, i) => <RowSet  key={`${rowKeyGetter(datum)}-rowSet`} {...{columnMap, columns, datum, i}}>{children}</RowSet>)}
    </React.Fragment>
  )
})

export default Body
