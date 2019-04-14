import React from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'

import { Routes } from 'Routes'
import { ModalProvider } from 'Hooks/useModal'

import { theme, themeValue, GlobalStyle } from 'theme'

export const Application = styled('main')`
  padding: ${themeValue('space.large')};
`

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <Application>
            <Routes />
          </Application>
        </ModalProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
