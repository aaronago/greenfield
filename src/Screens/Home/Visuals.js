
import styled, {css} from 'styled-components'
import {animated} from 'react-spring'

export const H2 = styled('h2')`
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
`

export const Table = styled('table')`
  border-collapse: collapse;
`

export const TR = styled('tr')`
  ${({contrast}) => contrast && css`background-color: #eee;`}
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

export const DragSpan = styled('span')`
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
