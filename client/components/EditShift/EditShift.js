// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

// src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './EditShift.less'
import { loadSingleShift, editShift, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'

class EditShift extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoading: true,
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

  updateShift = () => {
    const { dispatch, formValues, user, match, id, onClose } = this.props
    const { token } = user
    const { shift_name, start_time, end_time, type } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      editShift({
        id,
        shift_name,
        start_time,
        end_time,
        type,
        token,
      }),
    ).then(({ payload }) => {
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        onClose()
        dispatch(showErrorMessage('Updated successfully', 'success'))
      }
    })
  }

  handleCancel = () => {
    const { onClose } = this.props
    this.setState(() => ({ isLoading: true }))
    onClose()
  }

  onEnter = () => {
    const { user, dispatch, initialize, id } = this.props
    const { token } = user
    dispatch(loadSingleShift({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { data } = payload
      const { shift_name, start_time, end_time, type } = data
      const config = { shift_name, start_time, end_time, type }
      initialize(config)
    })
  }

  render() {
    const { disabled, isLoading } = this.state
    const { classes, onClose, ...other } = this.props
    return (
      <Dialog
        onClose={onClose}
        onEnter={this.onEnter}
        aria-labelledby="simple-dialog-title"
        {...other}
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="simple-dialog-title" className={styles.head}>
          {'Edit Shift'}
        </DialogTitle>
        <DialogContent className={styles.dialog}>
          <Choose>
            <When condition={isLoading}>
              <LoadingView />
            </When>
            <Otherwise>
              <form className={styles.root}>
                <div className={styles.row}>
                  <Field
                    classes={{ root: styles.radioButton }}
                    name="type"
                    label="Type"
                    component={renderRadioGroup}
                  >
                    <FormControlLabel
                      value="Pickup"
                      control={<Radio color="primary" />}
                      label="Pickup"
                    />
                    <FormControlLabel
                      value="Dropoff"
                      control={<Radio color="primary" />}
                      label="Dropoff"
                    />
                  </Field>
                </div>
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
                      onClick={this.updateShift}
                      label="Update"
                      style={{
                        backgroundColor: '#0adfbd',
                        borderColor: '#0adfbd',
                      }}
                    />
                    <Button
                      onClick={this.handleCancel}
                      label="Cancel"
                      style={{
                        backgroundColor: '#ff4747',
                        borderColor: '#ff4747',
                      }}
                    />
                  </div>
                </div>
              </form>
            </Otherwise>
          </Choose>
        </DialogContent>
      </Dialog>
    )
  }
}
const mapStateToProps = state => {
  const user = getOr({}, 'user')(state)
  return {
    formValues: getFormValues('editShift')(state),
    validationErrors: getFormSyncErrors('editShift')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editShift',
    validate,
    initialValues: {
      shift_name: '',
      start_time: '07:30',
      end_time: '12:30',
      type: 'Pickup',
    },
  })(EditShift),
)
