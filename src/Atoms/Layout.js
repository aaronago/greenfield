import styled from 'styled-components'
import { themeValue } from 'theme'

// GLOBAL WRAPPER
export const Application = styled('main')`
  padding: ${themeValue('space.large')};
`

// PRIMARY CONTENT AREA
export const Section = styled('section')`
  max-width: 95%;
`
