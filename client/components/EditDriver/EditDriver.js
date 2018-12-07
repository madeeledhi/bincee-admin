// libs
import React from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

//src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './EditDriver.less'
import { loadSingleDriver, updateDriver } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'

class EditDriver extends React.Component {
  componentDidMount() {
    const { user, dispatch, match, initialize } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)

    dispatch(loadSingleDriver({ id, token })).then(({ payload }) => {
      const { data } = payload
      const { username, password, fullname, phone_no, status, photo } = data
      const config = { username, password, fullname, phone_no, status, photo }
      initialize(config)
    })
  }

  updateDriver = () => {
    const { dispatch, formValues, user, match } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)
    const { fullname, phone_no, status, photo } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      updateDriver({ id, fullname, phone_no, status, photo, token }),
    ).then(({ payload }) => {
      dispatch(push('/dashboard/drivers'))
    })
  }
  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/drivers'))
  }
  render() {
    return (
      <div className={styles.root}>
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
            className={styles.radioButton}
            name="status"
            label="Status"
            component={renderRadioGroup}
          >
            <FormControlLabel
              value="Active"
              control={<Radio color="primary" />}
              label="Active"
            />
            <FormControlLabel
              value="Inactive"
              control={<Radio color="primary" />}
              label="Inactive"
            />
          </Field>
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
              onClick={this.updateDriver}
              color="primary"
              variant="contained"
            >
              Update
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
  return { formValues: getFormValues('editDriver')(state), user }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editDriver',
    enableReinitialize: true,
    initialValues: {
      username: '',
      password: '',
      fullname: '',
      phone_no: '',
      status: '',
      photo: '',
    },
  })(EditDriver),
)
