//  libs
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

//  src
import DashboardInner from './DashboardInner'
import { hasPropChanged } from '../../utils'
import { loadUser, logOut, loadUserDetails } from '../../actions'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    const { user = {}, userDetails = {} } = props
    this.state = { isLoading: false, user, error: false, userDetails }
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (!user.username) {
      dispatch(loadUser())
    } else {
      const { id, token } = user
      dispatch(loadUserDetails({ id, token }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('user', this.props, nextProps)) {
      const { user, authenticated, dispatch } = nextProps
      this.setState(() => ({ user }))
      if (!authenticated) {
        dispatch(push('/'))
      } else {
        const { id, token } = user
        this.setState(() => ({ isLoading: true }))
        dispatch(loadUserDetails({ id, token }))
      }
    }
    if (hasPropChanged('userDetails', this.props, nextProps)) {
      const { userDetails } = nextProps
      this.setState(() => ({ userDetails, isLoading: false }))
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
    const { isLoading } = this.state
    const path = getOr('/dashboard', 'path')(match)
    console.log('dashboard: {isLoading}, {path} ', isLoading, path)
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
  const userDetails = getOr('', 'userDetails')(state)
  const authenticated = size(user.username) > 0
  return {
    user,
    userDetails,
    authenticated,
  }
}

export default connect(mapStateToProps)(Dashboard)
