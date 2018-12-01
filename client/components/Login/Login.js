// libs
import React from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'

// src
import { RenderTextField } from '../shared/form-fields'
import { LoginButton } from '../shared/buttons/loginButton'
import styles from './Login.less'
import { login, loadUser, logOut } from '../../actions'
import { hasPropChanged } from '../../utils'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      user: { username: '', type: '' },
      error: false,
    }
  }

  componentDidMount() {
    const { user, dispatch } = this.props
    if (!user.username) {
      dispatch(loadUser())
    } else {
      dispatch(push('/dashboard'))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('user', this.props, nextProps)) {
      const { user, dispatch } = nextProps
      const { type } = user
      this.setState(() => ({ user }))
      if (user.username && type === 2) {
        dispatch(push('/dashboard'))
      }
    }
  }

  handleClick = () => {
    const { dispatch, formValues } = this.props
    const { username, password } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(login({ username, password })).then(({ payload }) => {
      const { status, data } = payload
      const { type } = data
      const error = status !== 200 || type !== 2
      this.setState(() => ({ isLoading: false, error }))
      console.log('error:', error)
      if (error) {
        dispatch(logOut())
      }
    })
  }

  render() {
    const { user, isLoading, error } = this.state
    return (
      <div className={styles.header}>
        <div className={styles.loginFields}>
          <Field
            id="userName"
            name="username"
            component={RenderTextField}
            label="Username"
            disabled={false}
          />
          <Field
            id="password"
            name="password"
            component={RenderTextField}
            type="password"
            label="Password"
            disabled={false}
          />
          <LoginButton label="Login" onClick={this.handleClick} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = getOr({}, 'user')(state)
  return { formValues: getFormValues('login')(state), user }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'login',
    enableReinitialize: true,
    initialValues: {
      username: '',
      password: '',
    },
  })(Login),
)
