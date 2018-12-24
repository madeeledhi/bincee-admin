// libs
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
// src
import { NotificationSystemConnector } from './components'

// src
import MainDashboard from './components/MainDashboard'
import Login from './components/Login'
import theme from '../config/theme'
import * as styles from './app.less'

// Add appropriate types check for store, routerProps and Router
type Props = {
  userAgent: string,
  store: any,
  Router: any,
  routerProps: any,
}

class App extends React.Component {
  state = {
    width: window.innerWidth,
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { width } = this.state
    const { Router, routerProps, store } = this.props
    if (width < 1024) {
      console.log('store: ', store)
    }
    return (
      <Choose>
        <When condition={width < 1024}>
          <div className={styles.main}>
            <div className={styles.wrap}>
              <div className={styles.text}>
                <img src={'/images/blank.png'} />
                <div className={styles.texter}>
                  {'Application Portal is Not Supported on Small Screens'}
                </div>
              </div>
            </div>
          </div>
        </When>
        <Otherwise>
          <MuiThemeProvider theme={theme}>
            <Provider store={store}>
              <Router {...routerProps}>
                <div className={styles.root}>
                  <NotificationSystemConnector />
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/dashboard" component={MainDashboard} />
                    {/* <Route component={() => <div>404</div>} /> */}
                    <Redirect to="/dashboard" />
                  </Switch>
                </div>
              </Router>
            </Provider>
          </MuiThemeProvider>
        </Otherwise>
      </Choose>
    )
  }
}

export default App
