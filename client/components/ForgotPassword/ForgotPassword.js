// libs
import React from 'react'
import { getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './utils'
import ForgotPasswordInner from './ForgotPasswordInner'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoading: true,
      selectedOption: 'email',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      hasPropChanged(['formValues', 'validationErrors'], this.props, nextProps)
    ) {
      const { validationErrors, formValues } = nextProps
      const { selectedOption } = formValues
      if (size(validationErrors) > 0) {
        this.setState(() => ({
          disabled: true,
          selectedOption: selectedOption,
        }))
      } else {
        this.setState(() => ({
          disabled: false,
          selectedOption: selectedOption,
        }))
      }
    }
  }

  sendLoginDetails = () => {}

  onEnter = () => {
    const { initialize } = this.props
    const config = { selectedOption: 'email', email: '', phone_no: '' }
    this.setState(() => ({ isLoading: false }))
    initialize(config)
  }

  handleTabChange = (event, value) => {
    this.setState(() => ({
      selectedOption: value,
    }))
  }
  handleCancel = () => {
    this.setState(() => ({ isLoading: true }))
    const { onClose } = this.props
    onClose()
  }

  render() {
    const { disabled, isLoading, selectedOption } = this.state
    const { classes, onClose, ...other } = this.props
    return (
      <ForgotPasswordInner
        onTabChange={this.handleTabChange}
        onClose={this.onClose}
        onEnter={this.onEnter}
        sendLoginDetails={this.sendLoginDetails}
        disabled={disabled}
        selectedOption={selectedOption}
        onCancel={this.handleCancel}
        {...other}
      />
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
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
      selectedOption: 'email',
      email: '',
      phone_no: '',
    },
  })(ForgotPassword),
)
