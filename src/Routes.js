import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Home, HeroTables } from 'Screens'

const history = createBrowserHistory()

export function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/heroes" component={HeroTables} />
      </Switch>
    </Router>
  )
}
