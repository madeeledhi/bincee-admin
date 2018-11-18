// libs
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect, Provider } from 'react-redux'

// src
import HomePage from './components/HomePage'
import Login from './components/Login'
import theme from '../config/theme'

// Add appropriate types check for store, routerProps and Router
type Props = {
  userAgent: string,
  store: any,
  Router: any,
  routerProps: any,
}

const App = (props: Props) => {
  const { Router, routerProps, store } = props
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router {...routerProps}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/home" component={HomePage} exact />
            {/* <Route component={() => <div>404</div>} /> */}
            <Redirect to="/home" />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
