//lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import size from 'lodash/fp/size'
//src
import SecurityInner from './SecurityInner'
import { editPassword } from '../../actions'
import { validate } from './util'
import { hasPropChanged } from '../../utils'
import { showErrorMessage } from '../../actions'

class Security extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoading: false,
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentWillReceiveProps(nextProps) {
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

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard'))
  }

  handleUpdate() {
    const { dispatch, user, formValues, initialize } = this.props
    const { new_password, current_password } = formValues
    const { id, username, token } = user

    this.setState(() => ({ isLoading: true }))
    dispatch(
      editPassword({
        id,
        username,
        password: current_password,
        new_password,
        token,
      }),
    ).then(({ payload: editPayload }) => {
      const { status: requestStatus } = editPayload
      this.setState(() => ({ isLoading: false }))
      if (requestStatus === 200) {
        dispatch(push('/dashboard/parents'))
        dispatch(showErrorMessage('Password Updated successfully', 'success'))
      } else {
        dispatch(showErrorMessage('Password Change Failed', 'error'))

        initialize({
          current_password: '',
          new_password: '',
          re_enter_password: '',
        })
      }
    })
  }

  render() {
    const { user } = this.props
    const { disabled, isLoading } = this.state
    return (
      <SecurityInner
        data={user}
        disabled={disabled}
        isLoading={isLoading}
        handleUpdate={this.handleUpdate}
        handleCancel={this.handleCancel}
      />
    )
  }
}

const mapStateToProps = state => {
  const user = getOr({}, 'user')(state)
  const error = getOr('', 'message')(user)
  return {
    formValues: getFormValues('security')(state),
    validationErrors: getFormSyncErrors('security')(state),
    user,
    error,
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'security',
    validate,
    initialValues: {
      current_password: '',
      new_password: '',
      re_enter_password: '',
    },
  })(Security),
)
