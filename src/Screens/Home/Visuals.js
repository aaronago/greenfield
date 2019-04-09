
import styled from 'styled-components'

export const TH = styled('th')`
  position: relative;
`

export const DragSpan = styled('span')`
  cursor: col-resize;
  position: absolute;
  right: 0;
  width: 30px;

  &:hover {
    background-color: #eee;
  }
`
