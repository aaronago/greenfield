import styled, { css } from 'styled-components'
import { themeValue } from 'theme'

export const TextButton = styled('button')`
  cursor: pointer;
  color: inherit;
  font: inherit;

  padding: 0;
  background: none;
  border: none;
  outline: none;

  ${props =>
    props.primary &&
    css`
      color: ${themeValue('colors.primary.base')};
    `};
`

TextButton.displayName = 'TextButton'
