// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import CircularProgress from '@material-ui/core/CircularProgress'

// src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import { LoginButton } from '../shared/buttons/loginButton'
import styles from './Login.less'
import { login, loadUser, logOut } from '../../actions'
import { hasPropChanged } from '../../utils'
import { isEmptyOrNil } from '../../utils/formValidation'
import ForgotPassword from '../ForgotPassword'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      user: { username: '', type: '' },
      error: false,
      disabled: false,
      forgotPasswordDialog: false,
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
    if (
      hasPropChanged(['formValues', 'validationErrors'], this.props, nextProps)
    ) {
      const { validationErrors } = nextProps
      if (size(validationErrors) > 0) {
        this.setState(() => ({ disabled: true }))
      } else {
        this.setState(() => ({ disabled: false }))
      }
    }
  }

  handleClick = () => {
    const { dispatch, formValues } = this.props
    const { username, password } = formValues
    this.setState(() => ({ isLoading: true, error: false }))
    dispatch(login({ username, password })).then(({ payload }) => {
      const { status, data } = payload
      const { type } = data
      const error = status !== 200 || type !== 2
      this.setState(() => ({ isLoading: false, error }))
      if (error) {
        dispatch(logOut())
      }
    })
  }

  enterPressed = (event) => {
    const code = event.keyCode || event.which
    const { isLoading, disabled } = this.state
    const disableEnter = isLoading || disabled
    if (code === 13 && !disableEnter) {
      this.handleClick()
    }
  }
  handleForgotPassword = () => {
    this.setState(() => ({ forgotPasswordDialog: true }))
  }
  handleDialogClose = () => {
    this.setState(() => ({
      forgotPasswordDialog: false,
    }))
  }

  render() {
    const { isLoading, error, disabled, forgotPasswordDialog } = this.state

    return (
      <div>
        <ForgotPassword
          open={forgotPasswordDialog}
          onClose={this.handleDialogClose}
        />
        <div className={styles.mainLogo} />
        <div className={styles.header}>
          <div className={styles.card}>
            <div className={styles.binceeCardLogo} />
            <h4 className={styles.signInText}>SIGN IN</h4>

            <form className={styles.loginFields}>
              <Field
                id="username"
                name="username"
                component={renderTextField}
                label="Username"
                disabled={isLoading}
                variant="outlined"
                margin="dense"
                className={styles.fieldBorder}
                onKeyPress={(e) => this.enterPressed(e)}
              />
              <Field
                id="password"
                name="password"
                component={renderTextField}
                type="password"
                label="Password"
                disabled={isLoading}
                variant="outlined"
                margin="dense"
                className={styles.fieldBorder}
                onKeyPress={(e) => this.enterPressed(e)}
              />
              <div className={styles.room}>
                <span
                  className={styles.forgetPass}
                  onClick={this.handleForgotPassword}
                >
                  Forget Password?
                </span>
              </div>
              {isLoading && (
                <div className={styles.center}>
                  <CircularProgress
                    classes={{ root: styles.circularLogin }}
                    size={20}
                  />
                  <h4 className={styles.loadingText}>Logging you in</h4>
                </div>
              )}
              {error && (
                <h4 className={styles.errorMessage}>
                  {'Invalid Username or Password'}
                </h4>
              )}
              <LoginButton
                label="Login"
                onClick={this.handleClick}
                disabled={isLoading || disabled}
              />
              <div>
                <p className={styles.termsAndConditionsText}>
                  {'By signing in you agree with our'}
                  <a className={styles.signUpText}> Terms & Conditions</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const user = getOr({}, 'user')(state)
  return {
    formValues: getFormValues('login')(state),
    validationErrors: getFormSyncErrors('login')(state),
    user,
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'login',
    validate: isEmptyOrNil,
    initialValues: {
      username: '',
      password: '',
    },
  })(Login)
)
