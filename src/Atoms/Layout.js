import styled from 'styled-components'
import { themeValue } from 'theme'

// GLOBAL WRAPPER
export const Application = styled('main')`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: ${themeValue('space.base')} auto;
  align-items: center;
  justify-content: center;
`

// PRIMARY CONTENT AREA
export const Section = styled('section')`
  max-width: 95%;
`
