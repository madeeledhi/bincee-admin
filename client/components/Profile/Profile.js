// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import size from 'lodash/fp/size'

// src
import ProfileInner from './ProfileInner'
import { editUserDetails, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import { validate } from './util'
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
    const {
      name = '',
      address = '',
      phone_no = '',
      email = '',
      lat = '',
      lng = '',
    } = userDetails
    initialize({ name, address, phone_no, email, lat, lng })
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
      const {
        name = '',
        address = '',
        phone_no = '',
        email = '',
        lat = '',
        lng = '',
      } = userDetails
      initialize({ name, address, phone_no, email, lat, lng })
    }
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard'))
  }

  handlePositionChange = value => {
    const { dispatch, initialize, formValues } = this.props
    const { address = '', position = {} } = value
    const { lat = '', lng = '' } = position
    dispatch(initialize({ ...formValues, lat, lng, address }))
  }

  handleUpdate() {
    const { dispatch, user, formValues } = this.props
    const { name, address, phone_no, email, lat, lng } = formValues
    const { id, token } = user

    this.setState(() => ({ isLoading: true }))
    dispatch(
      editUserDetails({ id, name, address, phone_no, email, lat, lng, token }),
    ).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        dispatch(push('/dashboard'))
        dispatch(showErrorMessage('Updated successfully', 'success'))
      }
    })
  }

  render() {
    const { userDetails, formValues } = this.props
    const { disabled, isLoading } = this.state
    const { lat = '', lng = '' } = formValues || {}

    return (
      <Choose>
        <When condition={!isLoading}>
          <ProfileInner
            data={userDetails}
            disabled={disabled}
            isLoading={isLoading}
            defaultPosition={{ lat, lng }}
            handlePositionChange={this.handlePositionChange}
            handleUpdate={this.handleUpdate}
            handleCancel={this.handleCancel}
          />
        </When>
        <Otherwise>
          <LoadingView />
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
      email: '',
      lat: '',
      lng: '',
    },
  })(Profile),
)
