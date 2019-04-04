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
`
const EditModal = ({ config, dispatch }) => {
  const handleClick = key => {
    dispatch({ type: 'toggleColumn', payload: key })
  }
  return (
    <div>
      {config.columnArray.map(col => {
        return (
          <p key={col} onClick={() => handleClick(col)}>
            {config.renderData[col].displayName}
          </p>
        )
      })}
    </div>
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
