import styled from 'styled-components'

import { themeValue } from 'theme'

export const Card = styled('div')`
  min-height: ${({ minHeight }) => (minHeight ? minHeight : '30rem')};
  padding: ${themeValue('space.medium')};
  grid-area: ${({ gridArea }) => (gridArea ? gridArea : null)};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  background-color: #fff;
`

export default Card
