import React from 'react'
import styled from 'styled-components'
import {animated} from 'react-spring'
import {Sort} from 'styled-icons/fa-solid/Sort'
import {Edit as EditIcon} from 'styled-icons/material/Edit'

export const TextButton = styled('button')`
  cursor: pointer;
  color: inherit;
  font: inherit;

  padding: 0;
  background: none;
  border: none;
  outline: none;
  text-align: inherit;
`

export const TableWrapper = styled('div')`
  display: table;
`

export const Table = styled('table')`
  table-layout:fixed;
  border-collapse: collapse;
`

export const TBody = styled('tbody')`
  border-bottom: 1px solid #ddd;
`

export const TD = styled('td')`
  padding: 0.5rem;
`

export const TH = styled('th')`
  position: sticky;
  top: 0;
  text-align: left;
  padding: 0.5rem;
  background-color: #ddd;
`

export const ResizeHandle = styled(TextButton)`
  cursor: col-resize;
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  &:hover {
    color: #fff;
  }
`

export const SortClickable = styled('span')`
  display: flex;
  cursor: pointer;
  width: 100%;
  align-items: center;
`

export const ReorderDraggable = styled(animated.div)`
  position: absolute;
  height: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  pointer-events: auto;
  border-radius: 0.25rem;

  span {
    cursor: grab;
  }
`

export const CanSort = styled(Sort)`
  color: #999;
`

const EditWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;

  ${TextButton} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: #ddd;
  }
`

export function Edit ({handleClick, width}) {
  return (
    <EditWrapper width={width}>
      <TextButton onClick={handleClick}>
        <EditIcon size={16} />
      </TextButton>
    </EditWrapper>
  )
}
