// libs
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'

// src
import { hasPropChanged } from '../../utils'
import { loadUser, logOut } from '../../actions'
import { LoginButton } from '../shared/buttons/loginButton'

export default (options = {}) => WrappedComponent => {
  return @connect(state => {
    const user = getOr({}, 'user')(state)
    return { user }
  })
  class Dashboard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: false,
        user: { username: '', type: '' },
        error: false,
      }
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
        const { user } = nextProps
        this.setState(() => ({ user }))
      }
      const { user, dispatch } = nextProps
      if (!user.username) {
        dispatch(push('/login'))
      }
    }

    handleClick = () => {
      const { dispatch } = this.props
      dispatch(logOut())
    }

    render() {
      const { user } = this.state
      return (
        <div>
          Dashboard
          <LoginButton label="Logout" onClick={this.handleClick} />
          <WrappedComponent user={user} />
        </div>
      )
    }
  }
}
