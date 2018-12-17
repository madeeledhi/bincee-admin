// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

//src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import styles from './CreateShifts.less'
import { createShift } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'
import { showErrorMessage } from '../../actions'

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
    const { dispatch, formValues, user, onClose } = this.props
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
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        dispatch(showErrorMessage('Created successfully', 'success'))(
        onClose(),)
      }
    })
  }

  handleCancel = () => {
    const { onClose } = this.props
    onClose()
  }
  onEnter = () => {
    const { initialize } = this.props
    const config = {  shift_name: '',  start_time: '', end_time: '' }
    initialize(config)
  }

  render() {
    // TODO: Change file upload control
    const { disabled } = this.state
    const { classes, onClose, ...other } = this.props
    return (
      <Dialog
        onClose={onClose}
        onEnter={this.onEnter}
        aria-labelledby="simple-dialog-title"
        {...other}
        fullWidth
      >
        <DialogTitle id="simple-dialog-title" className={styles.head}>Create Shifts</DialogTitle>
        <DialogContent>
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
      </DialogContent>
      </Dialog>
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
