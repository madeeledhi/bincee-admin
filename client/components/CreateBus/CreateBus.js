// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import uniqueId from 'lodash/fp/uniqueId'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'

//src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './CreateBus.less'
import { loadDrivers, createBus } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'

class CreateBus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
    }
  }
  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadDrivers({ token }))
    }
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
  createBus = () => {
    const { dispatch, formValues, user } = this.props
    const { token } = user
    const username = uniqueId(formValues.fullname)
    const { registration_no, description, driver_id } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      createBus({
        registration_no,
        description,
        driver_id,
        token,
      }),
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
    const { disabled } = this.state
    return (
      <form className={styles.root}>
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
              disabled={disabled}
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
      </form>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const user = getOr({}, 'user')(state)
  const drivers = getOr({}, 'drivers')(state)
  const driversList = getOr([], 'drivers')(drivers)
  return {
    formValues: getFormValues('createBus')(state),
    validationErrors: getFormSyncErrors('createBus')(state),
    user,
    driversList,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createBus',
    validate: validate,
    enableReinitialize: true,
    initialValues: {
      registration_no: '',
      description: '',
      driver_id: '',
    },
  })(CreateBus),
)
