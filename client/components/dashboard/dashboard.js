//  libs
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

//  src
import DashboardInner from './DashboardInner'
import { hasPropChanged } from '../../utils'
import { loadUser, logOut } from '../../actions'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    const { user } = props
    this.state = { isLoading: false, user, error: false }
  }

  componentDidMount() {
    const { user } = this.state
    const { dispatch } = this.props
    if (!user.username) {
      dispatch(loadUser())
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('user', this.props, nextProps)) {
      const { user, authenticated, dispatch } = nextProps
      console.log('props changes: ', user, authenticated)
      this.setState(() => ({ user }))
      if (!authenticated) {
        dispatch(push('/'))
      }
    }
  }

  handleSignOut = () => {
    const { dispatch } = this.props
    dispatch(logOut())
  }

  handleRouteChange = route => {
    const { dispatch } = this.props
    dispatch(push(route))
  }

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
        onRouteChange={this.handleRouteChange}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const user = getOr('', 'user')(state)
  const authenticated = size(user.username) > 0
  return {
    user,
    authenticated,
  }
}

export default connect(mapStateToProps)(Dashboard)
