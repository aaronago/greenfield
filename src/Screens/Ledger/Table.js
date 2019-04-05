import React from 'react'
import styled from 'styled-components'
import isEqual from 'lodash-es/isEqual'
import { Table, THead, TR, TD } from 'Atoms'

import { ControlledHeaderCell } from './Cell'
import Controls from './Controls'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const compare = (prevProps, nextProps) => {
  return isEqual(prevProps.activeColumns, nextProps.activeColumns) && isEqual(prevProps.data, nextProps.data)
}

const Body = React.memo(({ activeColumns, data, renderData }) => {
  return (
    <tbody>
      {data.map(datum => (
        <TR key={datum.id}>
          {activeColumns.map(col => (
            <TD key={col}>{renderData[col].valueGetter(datum)}</TD>
          ))}
        </TR>
      ))}
    </tbody>
  )
}, compare)

const LedgerTable = ({ data, config, dispatch, activeColumns, sortBy, sort }) => {
  return (
    <Wrapper>
      <Controls config={config} dispatch={dispatch} />
      <Table>
        <THead>
          <TR>
            {activeColumns.map(col => (
              <ControlledHeaderCell
                renderData={config.renderData}
                sort={sort}
                sortBy={sortBy}
                key={col}
                userWidth={`${config.userData[col].width}px`}
                label={config.renderData[col].displayName}
                col={col}
                dispatch={dispatch}
              />
            ))}
          </TR>
        </THead>
        <Body data={data} activeColumns={activeColumns} renderData={config.renderData} />
      </Table>
    </Wrapper>
  )
}
export default LedgerTable
