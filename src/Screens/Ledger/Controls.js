import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Edit } from 'styled-icons/material/Edit'
import { QuestionCircle } from 'styled-icons/fa-solid/QuestionCircle'
import { themeValue } from 'theme'

import useModal, { ModalContext } from 'Hooks/useModal'

const Wrapper = styled.div`
  display: flex;
  align-self: flex-end;
  background: ${themeValue('colors.gray.400')};
  padding: ${themeValue('space.small')};
  svg {
    cursor: pointer;
  }
`

const ModalWrapper = styled.div``
const Row = styled.div`
  display: flex;
  * {
    padding: 0 ${themeValue('space.small')};
  }
`
const P = styled.p`
  color: ${({ enabled }) => (enabled ? '' : themeValue('colors.gray.400'))};
`
const EditModal = ({ dispatch }) => {
  const { modalState } = useContext(ModalContext)
  const handleClick = key => {
    dispatch({ type: 'toggleColumn', payload: key })
  }
  const groupedColumns = modalState.columnArray.reduce(
    (acc, col) => {
      const { enabled } = modalState.userData[col]
      if (enabled) {
        acc.active.push(col)
      } else {
        acc.inactive.push(col)
      }
      return acc
    },
    { active: [], inactive: [] },
  )
  return (
    <ModalWrapper>
      <div>
        {!!groupedColumns.active.length && <h3>Active Columns</h3>}
        {groupedColumns.active.map(col => (
          <Row key={col}>
            <input type="checkbox" checked={modalState.userData[col].enabled} onChange={() => handleClick(col)} />
            <P enabled={modalState.userData[col].enabled}>{modalState.renderData[col].displayName}</P>
          </Row>
        ))}
        <hr />
        {!!groupedColumns.inactive.length && <h3>Inactive Columns</h3>}
        {groupedColumns.inactive.map(col => (
          <Row key={col}>
            <input type="checkbox" checked={modalState.userData[col].enabled} onChange={() => handleClick(col)} />
            <P enabled={modalState.userData[col].enabled}>{modalState.renderData[col].displayName}</P>
          </Row>
        ))}
      </div>
    </ModalWrapper>
  )
}
const Controls = ({ config, dispatch }) => {
  const { showModal, setModalState } = useModal()
  useEffect(() => {
    setModalState(config)
  }, [config, setModalState])

  return (
    <Wrapper>
      <Edit size={15} onClick={() => showModal(({ hideModal }) => <EditModal dispatch={dispatch} />)} />
      <QuestionCircle size={15} />
    </Wrapper>
  )
}

export default Controls
