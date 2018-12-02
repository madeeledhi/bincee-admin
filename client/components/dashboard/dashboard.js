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
    this.state = { isLoading: true, user, userDetails , selectedIndex:0 }
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
    if (hasPropChanged(['userDetails', 'user'], this.props, nextProps)) {
      const { user, authenticated, dispatch, userDetails } = nextProps
      this.setState(() => ({ user }))
      if (!authenticated) {
        dispatch(push('/'))
      }
      if (size(userDetails) < 1) {
        const { id, token } = user
        this.setState(() => ({ user, isLoading: true }))
        dispatch(loadUserDetails({ id, token }))
      } else {
        this.setState(() => ({ userDetails, isLoading: false }))
      }
    }
  }

  handleSignOut = () => {
    const { dispatch } = this.props
    dispatch(logOut())
  }

  handleRouteChange = (route, index) => {
    const { dispatch } = this.props
    dispatch(push(route))
    index !== undefined ? this.setState({ selectedIndex: index }): ''
  }

  render() {
    const { match, authenticated, error } = this.props
    const { isLoading, user, userDetails } = this.state
    const path = getOr('/dashboard', 'path')(match)
    console.log(
      'dashboard: {authenticated} {isLoading}, {path} ',
      authenticated,
      isLoading,
      path,
    )
    return (
      <DashboardInner
        path={path}
        onClickSignout={this.handleSignOut}
        user={user}
        userDetails={userDetails}
        error={error}
        isLoading={isLoading}
        authenticated={authenticated}
        onRouteChange={this.handleRouteChange}
        selectedIndex= {this.state.selectedIndex}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const user = getOr({}, 'user')(state)
  const userDetails = getOr({}, 'userDetails')(state)
  const error = getOr('', 'message')(userDetails)
  const authenticated = size(user.username) > 0
  return {
    error,
    user,
    userDetails,
    authenticated,
  }
}

export default connect(mapStateToProps)(Dashboard)
