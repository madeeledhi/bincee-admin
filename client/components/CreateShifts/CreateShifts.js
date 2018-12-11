// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

//src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import styles from './CreateShifts.less'
import { createShift } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'

class CreateShifts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoading: false,
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

  createShift = () => {
    const { dispatch, formValues, user } = this.props
    const { token } = user
    const { shift_name, start_time, end_time } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      createShift({
        shift_name,
        start_time,
        end_time,
        token,
      }),
    ).then(({ payload }) => {
      dispatch(push('/dashboard/shifts'))
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/shifts'))
  }

  render() {
    // TODO: Change file upload control
    const { disabled } = this.state
    return (
      <form className={styles.root}>
        <div className={styles.row}>
          <Field
            id="shift_name"
            name="shift_name"
            component={renderTextField}
            label="Shift Name"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <Field
            id="start_time"
            name="start_time"
            component={renderTextField}
            label="Start Time"
            disabled={false}
            variant="outlined"
            className={styles.item}
            InputLabelProps={{ shrink: true }}
            inputProps={
              { step: 300 } // 5 min
            }
            type="time"
          />
        </div>
        <div className={styles.row}>
          <Field
            id="end_time"
            name="end_time"
            component={renderTextField}
            label="End Time"
            disabled={false}
            variant="outlined"
            className={styles.item}
            type="time"
            InputLabelProps={{ shrink: true }}
            inputProps={
              { step: 300 } // 5 min
            }
          />
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <Button
              disabled={disabled}
              onClick={this.createShift}
              label="Create"
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
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const user = getOr({}, 'user')(state)
  return {
    formValues: getFormValues('CreateShifts')(state),
    validationErrors: getFormSyncErrors('CreateShifts')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'CreateShifts',
    validate,
    initialValues: {
      shift_name: '',
      start_time: '07:30',
      end_time: '12:30',
    },
  })(CreateShifts),
)