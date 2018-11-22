//  libs
import React, { Component } from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'

//  src
import DashboardInner from './DashboardInner'
import { history } from '../../utils/configureRouter'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { authenticated } = nextProps
    if (!authenticated) {
      history.replace('/')
    }
  }

  handleSignOut = () => {}
  render() {
    const { match, user, authenticated } = this.props
    const path = getOr('/dashboard', 'path')(match)
    console.log('path', path)

    return (
      <DashboardInner
        path={path}
        onClickSignout={this.handleSignOut}
        user={user}
        authenticated={authenticated}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const user = getOr('', 'user')(state)
  const authenticated = true
  return {
    user,
    authenticated,
  }
}

export default connect(mapStateToProps)(Dashboard)
