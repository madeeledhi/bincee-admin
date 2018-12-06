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
    if (hasPropChanged('formValues', this.props, nextProps)) {
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
      console.log('error:', error)
      if (error) {
        dispatch(logOut())
      }
    })
  }

  render() {
    const { user, isLoading, error, disabled } = this.state
    return (
      <div className={styles.header}>
        <div className={styles.mainLogo} />
        <div className={styles.card}>
          <div className={styles.binceeCardLogo} />
          <h4 className={styles.signInText}>SIGN IN</h4>

          <div className={styles.loginFields}>
            <Field
              id="username"
              name="username"
              component={renderTextField}
              label="Username"
              disabled={isLoading}
              variant="outlined"
              margin="dense"
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
            />
            <FormControlLabel
              control={
                // TODO: i can't seem to find the CheckBoxOutlineBlankIcon CheckBoxIcon in material core
                // <Checkbox
                //   style={{ width: 36, height: 36 }}
                //   icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                //   checkedIcon={<CheckBoxIcon style={{ fontSize: 20, color: "#000" }} />}
                // />
                <Checkbox color={'primary'} />
              }
              label="Remember Me"
            />
            <a className={styles.forgetPass}>Forget Password?</a>
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
              <p className={styles.signUpText}>Sign Up here</p>
              <p className={styles.termsAndConditionsText}>
                By signing in you agree with our Terms & Conditions
              </p>
            </div>
          </div>
          {
            //TODO: Fix this page properly
            //TODO: Set the background Use the image with grey background
            //TODO: Create proper login form design
            //TODO: Create your own loading View
            //TODO: Use the loading view on form only not the whole screen, also disable any functionality while loading
            //TODO: Add form validator for empty fields and show errors on text fields border
            //TODO: Added a file in shared folder with material fields that can help you with this
          }
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
    enableReinitialize: true,
    validate: isEmptyOrNil,
    initialValues: {
      username: '',
      password: '',
    },
  })(Login),
)
