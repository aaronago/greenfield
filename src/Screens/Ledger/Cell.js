import React from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import { DotsVerticalRounded } from 'styled-icons/boxicons-regular/DotsVerticalRounded'
import { Sort } from 'styled-icons/fa-solid/Sort'
import { SortUp } from 'styled-icons/fa-solid/SortUp'
import { SortDown } from 'styled-icons/fa-solid/SortDown'
import { themeValue } from 'theme'
import { TH } from 'Atoms'

export const HeaderCell = styled(TH)`
  width: ${({ userWidth }) => userWidth};
  max-width: ${({ userWidth }) => userWidth};
  padding-right: ${themeValue('space.medium')}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:last-child .DragHandle {
    display: none;
  }

  .DragHandle {
    position: absolute;
    right: 0;
    top: 0;
    width: 16px;
    height: 100%;
    z-index: 2;
    cursor: col-resize;
    display: flex;
    align-items: center;
  }

  .DragHandle:hover {
    color: ${themeValue('colors.gray.400')};
    background-color: ${themeValue('colors.gray.300')};
  }

  .DragHandleActive,
  .DragHandleActive:hover {
    z-index: 99;
  }
`
export const ControlledHeaderCell = ({ col, renderData, sort, sortBy, dispatch, ...props }) => {
  const handleDrag = (e, { deltaX }) =>
    dispatch({
      type: 'columnResize',
      payload: { col, deltaX },
    })
  const handleClick = () => {
    sortBy({ key: renderData[col].sortPath })
  }

  const SortIcon = sort.key !== renderData[col].sortPath ? Sort : sort.dir === 'asc' ? SortUp : SortDown
  return (
    <HeaderCell {...props}>
      <SortIcon size={12} onClick={handleClick} />
      {props.label}
      <Draggable
        axis="x"
        defaultClassName="DragHandle"
        defaultClassNameDragging="DragHandleActive"
        onDrag={handleDrag}
        zIndex={999}
        position={{ x: 0 }}>
        <span>
          <DotsVerticalRounded size={16} />
        </span>
      </Draggable>
    </HeaderCell>
  )
}
