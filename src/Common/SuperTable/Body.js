import React from 'react'

import {TD, TBody, TextButton, TR} from './Visuals'

function RowSet ({columnMap, columns, datum, i}) {
  const [open, setOpen] = React.useState(false)
  const toggle = React.useCallback(() => setOpen(!open), [open])

  return (
    <TBody>
      <TR>
        {columns.map(key => {
          return (
            <TD key={`${key}-${i}-td`}>
              <TextButton onClick={toggle}>{columnMap[key].value(datum)}</TextButton>
            </TD>
          )
        })}
      </TR>
      {open &&
        <TR>
          <TD colSpan={columns.length}>
            This is a wide TD.
          </TD>
        </TR>
      }
    </TBody>
  )
}

const Body = React.memo(function (props) {
  const {columnMap, columns, data} = props
  return (
    <React.Fragment>
      {data.map((datum, i) => <RowSet  key={`${i}-rowSet`} {...{columnMap, columns, datum, i}} />)}
    </React.Fragment>
  )
})

export default Body
