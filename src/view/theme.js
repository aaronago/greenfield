
import {css, injectGlobal} from 'styled-components'

const gray = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121'
}

const primary = {
  base: '#80deea',
  light: '#b4ffff',
  dark: '#4bacb8'
}

const secondary = {
  base: '#ff5722',
  light: '#ff8a50',
  dark: '#c41c00'
}

const space = {}

// Simple Lens to allow easy access to nested theme values.
const get = (obj, path, fallback) => path.split('.')
  .reduce((a, b) => (a && a[b]) ? a[b] : null, obj) || fallback
export const themeValue = (keys, fallback) => props => get(props.theme, keys, fallback)

// Reusable definitions for colors, spacings, etc.
export const theme = {
  primary,
  secondary,
  gray,
  space
}

// Inject some global styles that are most likely to be coupled to theme variables.
injectGlobal`
  html {
    /* 1rem = 16px */
    font-size: 16px;
  }
  body {
    font-weight: normal;
    font-family: sans-serif;
    background-color: ${gray['50']};
  }
`

// Media Queries & Breakpoints
// Usage: ${media.desktop`display: block;`}
const breakpoints = {
  tabletPortrait: 600,
  tabletLandscape: 900,
  desktop: 1200,
  desktopLarge: 1800
}

// Iterate through the sizes and create a media template
export const media = Object.keys(breakpoints).reduce((acc, label) => {
  return Object.assign({}, acc, {
    [label]: (...args) => css`
      @media (max-width: ${breakpoints[label] / 16}em) {
        ${css(...args)}
      }
    `
  })
}, {})
