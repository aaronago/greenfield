import { css, createGlobalStyle } from 'styled-components'
import get from 'lodash-es/get'
import isEmpty from 'lodash-es/isEmpty'

// Reusable definitions for colors, spacings, etc.
export const theme = {
  baseIconHeight: 1.4 * 1.5,
  colors: {
    black: '#000',
    gray: {
      100: '#fafafa',
      200: '#f4f5f8',
      300: '#dbdde6',
      400: '#bfc1ca',
      500: '#222',
    },
    primary: {
      base: '#80deea',
      contrast: '#b4ffff',
      interaction: '#4bacb8',
    },
    secondary: {
      base: '#ff5722',
      contrast: '#ff8a50',
      interaction: '#c41c00',
    },
  },
  space: {
    small: '0.5rem',
    base: '1rem',
    medium: '2rem',
    large: '4rem',
  },
}

// Inject some global styles that are most likely to be coupled to theme variables.
export const GlobalStyle = createGlobalStyle`
  html {
    /* 1rem = 10px @ base browser settings */
    font-size: 62.5%;
  }
  body {
    font-weight: normal;
    font-family: sans-serif;
    font-size: 1.6rem;
    background-color: ${theme.colors.gray['100']};
    box-sizing: border-box;
  }
`

// Retrieve Theme Value
// Usage: ${themeValue`colors.primary.base`}
export const themeValue = path => props => {
  const themeValues = isEmpty(props.theme) ? theme : props.theme

  const value = get(themeValues, path)

  if (value) {
    return value
  }
  throw new Error(`The provided path - ${path} - was not found in the theme.`)
}

// Media Queries & Breakpoints
// Usage: ${media.desktop`display: block;`}
const breakpoints = {
  tabletPortrait: 600,
  tabletLandscape: 900,
  desktop: 1200,
  desktopLarge: 1800,
}

// Iterate through the sizes and create a media template
export const media = Object.keys(breakpoints).reduce((acc, label) => {
  return Object.assign({}, acc, {
    [label]: (...args) => css`
      @media (min-width: ${breakpoints[label] / 16}em) {
        ${css(...args)}
      }
    `,
  })
}, {})
