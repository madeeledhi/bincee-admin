// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import size from 'lodash/fp/size'

//src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './EditDriver.less'
import { loadSingleDriver, updateDriver } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'
import { showErrorMessage } from '../../actions'

class EditDriver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoading: true,
    }
  }

  componentDidMount() {
    const { user, dispatch, match, initialize } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)

    dispatch(loadSingleDriver({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { data } = payload
      const { username, password, fullname, phone_no, status, photo } = data
      const config = { username, password, fullname, phone_no, status, photo }
      initialize(config)
    })
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

  updateDriver = () => {
    const { dispatch, formValues, user, match } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)
    const { fullname, phone_no, status, photo } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      updateDriver({ id, fullname, phone_no, status, photo, token }),
    ).then(({ payload }) => {
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        dispatch(push('/dashboard/drivers'))
        dispatch(showErrorMessage('Updated successfully', 'success'))
      }
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/drivers'))
  }

  render() {
    const { disabled, isLoading } = this.state
    return (
      <Choose>
        <When condition={isLoading}>
          <LoadingView />
        </When>
        <Otherwise>
          <form className={styles.root}>
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
                id="photo"
                InputLabelProps={{ shrink: true }}
                input={{ value: '', onChange: this.fileChangedHandler }}
                name="photo"
                margin="normal"
                component={renderTextField}
                label="Photo Url"
                disabled={false}
                variant="outlined"
                className={styles.item}
                type="file"
              />
            </div>
            <div className={styles.row}>
              <div className={styles.item}>
                <Button
                  disabled={disabled}
                  onClick={this.updateDriver}
                  label="Update"
                  style={{ backgroundColor: '#0adfbd', borderColor: '#0adfbd' }}
                />
                <Button
                  onClick={this.handleCancel}
                  label="Cancel"
                  style={{ backgroundColor: '#ff4747', borderColor: '#ff4747' }}
                />
              </div>
            </div>
          </form>
        </Otherwise>
      </Choose>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const user = getOr({}, 'user')(state)
  return {
    formValues: getFormValues('editDriver')(state),
    validationErrors: getFormSyncErrors('editDriver')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editDriver',
    validate,
    initialValues: {
      fullname: '',
      phone_no: '',
      status: '',
      photo: '',
    },
  })(EditDriver),
)
