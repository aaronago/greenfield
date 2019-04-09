import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash-es/orderBy'
import isEqual from 'lodash-es/isEqual'
import { Table, THead, TR, TD } from 'Atoms'

import { ControlledHeaderCell } from './Cell'
import Controls from './Controls'

const Wrapper = styled.div`
  min-width: 1024px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`

const Body = React.memo(({ activeColumns, data, renderData, handleRowClick }) => {
  // Started experimenting with an add to cart type cell with an onclick, hence all the click handling stuff
  return (
    <tbody>
      {data.map(datum => (
        <TR key={datum.id} onClick={handleRowClick ? () => handleRowClick(datum) : null}>
          {activeColumns.map(col => {
            const handleClick = !renderData[col].onClick
              ? null
              : e => {
                  e.stopPropagation()
                  renderData[col].onClick(datum)
                }
            return (
              <TD key={col} onClick={handleClick}>
                {renderData[col].valueGetter(datum)}
              </TD>
            )
          })}
        </TR>
      ))}
    </tbody>
  )
}, compare)

function compare(prevProps, nextProps) {
  return isEqual(prevProps.activeColumns, nextProps.activeColumns) && isEqual(prevProps.data, nextProps.data)
}

const LedgerTable = ({ data, config, dispatch, sortBy, sort, ...props }) => {
  const activeColumns = React.useMemo(() => {
    return config.columnArray.filter(col => config.userData[col].enabled)
  }, [config.columnArray, config.userData])

  const sortedData = React.useMemo(() => {
    return sort.key && sort.dir ? orderBy(data, sort.key, sort.dir) : data
  }, [data, sort.dir, sort.key])

  return (
    <Wrapper>
      <Controls config={config} dispatch={dispatch} />
      <Table>
        <THead>
          <TR>
            {activeColumns.map(col => (
              <ControlledHeaderCell
                col={col}
                dispatch={dispatch}
                key={col}
                renderData={config.renderData[col]}
                userWidth={config.userData[col].width}
                sort={sort}
                sortBy={sortBy}
              />
            ))}
          </TR>
        </THead>
        <Body data={sortedData} activeColumns={activeColumns} renderData={config.renderData} {...props} />
      </Table>
    </Wrapper>
  )
}
export default LedgerTable
