import styled, { css } from 'styled-components'
import { themeValue } from 'theme'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const THead = styled.thead`
  &:after {
    content: '-';
    display: block;
    line-height: 0.5em;
    color: transparent;
  }
`
export const TH = styled.th`
  position: sticky;
  background-color: ${themeValue('colors.gray.400')};
  top: 0;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: default;
  font-size: inherit;
  padding: ${themeValue('space.base')};
`
export const TR = styled.tr`
  background: floralwhite;
  border-bottom: 1px solid ${themeValue('colors.gray.300')};
  &:first-child {
    border-top: 1px solid ${themeValue('colors.gray.400')};
  }
  &:hover {
    color: ${themeValue('colors.black')};
    background-color: ${themeValue('colors.gray.200')};
  }

  ${THead} & {
    border: none;
  }

  ${THead}:hover & {
    color: inherit;
    border: none;
    background-color: transparent;
  }

  /* If the tr has an onClick attached, add the cursor to
     signify to the user that an action can occur on click. */
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `};
`
export const TD = styled.td`
  padding: ${themeValue('space.base')};

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `};
`
