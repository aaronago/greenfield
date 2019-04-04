import React from 'react'
import styled from 'styled-components'
import { Table, THead, TH, TR, TD } from 'Atoms'

import Controls from './Controls'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const LedgerTable = ({ data, config, dispatch }) => {
  return (
    <Wrapper>
      <Controls config={config} dispatch={dispatch} />
      <Table>
        <THead>
          <TR>
            {config.columnArray
              .filter(col => config.userData[col].enabled)
              .map(col => (
                <TH key={col} width={`${config.userData[col].width}%`}>
                  {config.renderData[col].displayName}
                </TH>
              ))}
          </TR>
        </THead>
        <tbody>
          {data.map(datum => (
            <TR key={datum.id}>
              {config.columnArray
                .filter(col => config.userData[col].enabled)
                .map(col => (
                  <TD key={col}>{config.renderData[col].valueGetter(datum)}</TD>
                ))}
            </TR>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  )
}
export default LedgerTable
