// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import CircularProgress from '@material-ui/core/CircularProgress'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckBoxOutlineBlankIcon from '@material-ui/core/SvgIcon'
import CheckBoxIcon from '@material-ui/core/SvgIcon'

// src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import { LoginButton } from '../shared/buttons/loginButton'
import styles from './Login.less'
import { login, loadUser, logOut } from '../../actions'
import { hasPropChanged } from '../../utils'
import { isEmptyOrNil } from '../../utils/formValidation'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      user: { username: '', type: '' },
      error: false,
      disabled: false,
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

  render() {
    const { user, isLoading, error, disabled } = this.state

    console.log('{error}, {disabled}:', error, disabled)
    return (
      <div>
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
              />
              {
                //TODO: Change this to a span or div, for onclick function
              }
              <div className={styles.room}>
                <span className={styles.forgetPass}>Forget Password?</span>
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
                <p className={styles.memberText}>Not a member yet?</p>
                <p className={styles.termsAndConditionsText}>
                  By signing in you agree with our 
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

const mapStateToProps = (state, ownProps) => {
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
  })(Login),
)
