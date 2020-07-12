// libs
import React from 'react'
import { getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import size from 'lodash/fp/size'

// src
import { hasPropChanged } from '../../utils'
import { resetPassword } from '../../actions'
import { validate } from './utils'
import ForgotPasswordInner from './ForgotPasswordInner'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoading: true,
      selected_option: 'email',
      success: false,
      message: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      hasPropChanged(['formValues', 'validationErrors'], this.props, nextProps)
    ) {
      const { validationErrors, formValues } = nextProps
      const { selected_option } = formValues
      if (size(validationErrors) > 0) {
        this.setState(() => ({ disabled: true, selected_option }))
      } else {
        this.setState(() => ({ disabled: false, selected_option }))
      }
    }
  }

  sendLoginDetails = () => {
    const { formValues, dispatch } = this.props
    const { username, selected_option, email, phone_no, type } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      resetPassword({
        username,
        selected_option,
        email,
        phone_no,
        type,
      })
    ).then(({ payload }) => {
      const { status, data } = payload
      const { message = 'Something Bad happened' } = data || {}
      if (status === 200) {
        this.setState(() => ({ isLoading: false, message, success: true }))
      } else {
        this.setState(() => ({
          isLoading: false,
          message,
          success: false,
        }))
      }
    })
  }

  onEnter = () => {
    const { initialize } = this.props
    const config = {
      selected_option: 'email',
      email: '',
      phone_no: '',
      username: '',
      type: 'School',
    }
    this.setState(() => ({ isLoading: false }))
    initialize(config)
  }

  handleTabChange = (event, value) => {
    this.setState(() => ({
      selectedOption: value,
    }))
  }

  handleCancel = () => {
    this.setState(() => ({ isLoading: true, message: '', success: false }))
    const { onClose } = this.props
    onClose()
  }

  render() {
    const {
      disabled,
      isLoading,
      message,
      success,
      selected_option,
    } = this.state
    const { classes, onClose, ...other } = this.props
    return (
      <ForgotPasswordInner
        onTabChange={this.handleTabChange}
        onClose={this.onClose}
        onEnter={this.onEnter}
        sendLoginDetails={this.sendLoginDetails}
        disabled={disabled}
        isLoading={isLoading}
        message={message}
        success={success}
        selected_option={selected_option}
        onCancel={this.handleCancel}
        {...other}
      />
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    formValues: getFormValues('forgotPassword')(state),
    validationErrors: getFormSyncErrors('forgotPassword')(state),
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'forgotPassword',
    validate,
    initialValues: {
      selected_option: 'email',
      username: '',
      email: '',
      phone_no: '',
      type: 'School',
    },
  })(ForgotPassword)
)
