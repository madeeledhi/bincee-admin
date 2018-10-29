// libs
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch, } from 'react-router-dom'
import { connect, Provider } from 'react-redux'

// src
import app from './components/app'
import dashboard from './components/dashboard'
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
        <Router {...routerProps}>
          <div className={styles.root}>
            <Switch>
              <Route path="/" component={app} />
              <Route component={() => <div>404</div>} />
              <Route path="/dashboard" component={dashboard}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
