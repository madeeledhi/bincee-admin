// libs
import React from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import MenuItem from '@material-ui/core/MenuItem'
import map from 'lodash/fp/map'

//src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './EditBus.less'
import { loadSingleBus, editBus, loadDrivers } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'

class EditBus extends React.Component {
  componentDidMount() {
    const { user, dispatch, match, initialize } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)
    dispatch(loadDrivers({ token }))
    dispatch(loadSingleBus({ id, token })).then(({ payload }) => {
      const { data } = payload
      const { registration_no, description, driver_id } = data
      const config = { registration_no, description, driver_id }
      initialize(config)
    })
  }

  updateBus = () => {
    const { dispatch, formValues, user, match } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)
    const { registration_no, description, driver_id } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      editBus({ id, registration_no, description, driver_id, token }),
    ).then(({ payload }) => {
      dispatch(push('/dashboard/busses'))
    })
  }
  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/busses'))
  }
  render() {
    const { driversList } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.row}>
          <Field
            id="registration_no"
            name="registration_no"
            component={renderTextField}
            label="Registration no"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <Field
            id="description"
            name="description"
            component={renderTextField}
            label="Description"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <Field
            className={styles.item}
            name="driver_id"
            component={renderTextField}
            select
            label="Select Driver"
            variant="outlined"
            margin="dense"
          >
            {map(({ driver_id, fullname }) => (
              <MenuItem key={driver_id} value={driver_id}>
                {fullname}
              </MenuItem>
            ))(driversList)}
          </Field>
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <Button
              onClick={this.createBus}
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
  const drivers = getOr({}, 'drivers')(state)
  const driversList = getOr([], 'drivers')(drivers)
  return { formValues: getFormValues('editBus')(state), user, driversList }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editBus',
    enableReinitialize: true,
    initialValues: {
      registration_no: '',
      description: '',
      driver_id: '',
    },
  })(EditBus),
)
