// libs
import React from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'

//src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import styles from './CreateDriver.less'
import { createDriver } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { Button } from '@material-ui/core'

class CreateDriver extends React.Component {
  createDriver = () => {
    const { dispatch, formValues, user } = this.props
    const { token } = user
    const { username, password, fullname, phone_no, status, photo } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      createDriver({
        username,
        password,
        fullname,
        phone_no,
        status,
        photo,
        token,
      }),
    ).then(({ payload }) => {
      dispatch(push('/dashboard/grades'))
    })
  }
  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/grades'))
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.row}>
          <Field
            id="username"
            name="username"
            component={renderTextField}
            label="UserName"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <Field
            id="password"
            name="password"
            component={renderTextField}
            label="Password"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>

        <div className={styles.row}>
          <Field
            id="fullname"
            name="fullname"
            component={renderTextField}
            label="Fullname"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <Field
            id="phone_no"
            name="phone_no"
            component={renderTextField}
            label="Phone No"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <Field
            id="status"
            name="status"
            component={renderTextField}
            label="Status"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <Field
            id="photo"
            name="photo"
            component={renderTextField}
            label="Photo Url"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <Button
              onClick={this.createDriver}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
            <Button
              onClick={this.handleCancel}
              color="secondary"
              variant="contained"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const user = getOr({}, 'user')(state)
  return { formValues: getFormValues('createDriver')(state), user }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createDriver',
    enableReinitialize: true,
    initialValues: {
      username: '',
      password: '',
      fullname: '',
      phone_no: '',
      status: '',
      photo: '',
    },
  })(CreateDriver),
)
