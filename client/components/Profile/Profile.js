//lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import size from 'lodash/fp/size'
//src
import ProfileInner from './ProfileInner'
import { editUserDetails } from '../../actions'
import { hasPropChanged } from '../../utils'
import { validate } from './util'
import { showErrorMessage } from '../../actions'
import LoadingView from '../LoadingView'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoading: false,
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount() {
    const { userDetails, initialize } = this.props
    const { name = '', address = '', phone_no = '' } = userDetails
    initialize({ name, address, phone_no })
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
    if (hasPropChanged('userDetails', this.props, nextProps)) {
      const { userDetails, initialize } = nextProps
      const { name = '', address = '', phone_no = '' } = userDetails
      initialize({ name, address, phone_no })
    }
  }

  handleUpdate() {
    const { dispatch, user, formValues } = this.props
    const { name, address, phone_no } = formValues
    const { id, token } = user
    dispatch(editUserDetails({ id, name, address, phone_no, token })).then(
      ({ payload }) => {
        const { status: requestStatus } = payload
        if (requestStatus === 200) {
          dispatch(push('/dashboard'))
          dispatch(showErrorMessage('Updated successfully', 'success'))
        }
      },
    )
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard'))
  }

  render() {
    const { userDetails } = this.props
    const { disabled, isLoading } = this.state
    return (
      <Choose>
        <When condition={!isLoading}>
      <ProfileInner
        data={userDetails}
        disabled={disabled}
        isLoading={isLoading}
        handleUpdate={this.handleUpdate}
        handleCancel={this.handleCancel}
      />
        </When>
        <Otherwise>
          <LoadingView message={'Loading Profile'} />
        </Otherwise>
      </Choose>


    )
  }
}

const mapStateToProps = state => {
  const userDetails = getOr({}, 'userDetails')(state)
  const user = getOr({}, 'user')(state)
  const error = getOr('', 'message')(userDetails)
  return {
    formValues: getFormValues('profile')(state),
    validationErrors: getFormSyncErrors('profile')(state),
    userDetails,
    error,
    user,
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'profile',
    validate,
    initialValues: {
      name: '',
      phone_no: '',
      address: '',
    },
  })(Profile),
)
