import React from 'react'
import styled from 'styled-components'
import { Edit } from 'styled-icons/material/Edit'
import { QuestionCircle } from 'styled-icons/fa-solid/QuestionCircle'
import { themeValue } from 'theme'

import useModal from 'Hooks/useModal'

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
  color: ${({ enabledd }) => (enabledd ? '' : themeValue('colors.gray.400'))};
`
const EditModal = ({ config, dispatch }) => {
  const handleClick = key => {
    dispatch({ type: 'toggleColumn', payload: key })
  }
  return (
    <ModalWrapper>
      {config.columnArray.map(col => {
        const { enabled } = config.userData[col]
        return (
          <Row key={col}>
            <input type="checkbox" checked={enabled} onChange={() => handleClick(col)} />
            <P enabledd={enabled}>{config.renderData[col].displayName}</P>
          </Row>
        )
      })}
    </ModalWrapper>
  )
}
const Controls = props => {
  const [showModal] = useModal()

  return (
    <Wrapper>
      <Edit
        size={15}
        onClick={() => showModal(({ hideModal }) => <EditModal config={props.config} dispatch={props.dispatch} />)}
      />
      <QuestionCircle size={15} />
    </Wrapper>
  )
}

export default Controls
