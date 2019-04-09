import styled from 'styled-components'

import { themeValue } from 'theme'

export const Heading = styled('h1')`
  color: ${themeValue('colors.gray.500')};
  margin-bottom: ${themeValue('space.base')};
`

export const P = styled('p')`
  color: ${themeValue('colors.gray.500')};
  margin-bottom: ${themeValue('space.base')};
`
