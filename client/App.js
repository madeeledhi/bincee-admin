// libs
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect, Provider } from 'react-redux'

// src
import { history } from './utils/configureRouter'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import styles from './App.less'
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
        <Router {...routerProps} history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route component={() => <div>404</div>} /> */}
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
