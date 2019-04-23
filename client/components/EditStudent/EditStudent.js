// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import MenuItem from '@material-ui/core/MenuItem'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import filter from 'lodash/fp/filter'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

// src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './EditStudent.less'
import {
  loadSingleStudent,
  updateSTUDENT,
  showErrorMessage,
  uploadImage,
} from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'
import Picture from '../Picture'

class EditStudent extends React.Component {
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

  updateStudent = () => {
    const { dispatch, formValues, user, id, onClose } = this.props
    const { token } = user
    const {
      fullname,
      status,
      photo,
      grade,
      shift_morning,
      shift_evening,
      parent_id,
      driver_id,
    } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      updateSTUDENT({
        id,
        fullname,
        status,
        photo,
        grade,
        shift_morning,
        shift_evening,
        parent_id,
        driver_id,
        token,
      }),
    ).then(({ payload }) => {
      const { status: requestStatus } = payload
      this.setState(() => ({ isLoading: false }))
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
    dispatch(loadSingleStudent({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { status: requestStatus, data } = payload
      const {
        fullname,
        status,
        photo,
        grade,
        shift_morning,
        shift_evening,
        parent_id,
        driver_id,
      } = data
      const config = {
        fullname,
        status,
        photo,
        grade,
        shift_morning,
        shift_evening,
        parent_id,
        driver_id,
      }
      initialize(config)
    })
  }

  fileChangedHandler = event => {
    const [selectedFile] = event.target.files
    if (selectedFile) {
      const { dispatch, user } = this.props
      const { token } = user
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('name', selectedFile.name)
      this.setState(() => ({ isLoading: true }))
      dispatch(
        uploadImage({
          id: 1,
          user: 'student',
          image: formData,
          token,
        }),
      ).then(({ payload }) => {
        const { status, data } = payload

        this.setState(() => ({ isLoading: false }))
        if (status === 200) {
          const { path } = data
          const { formValues, initialize } = this.props
          initialize({ ...formValues, photo: path })
        }
      })
    }
  }

  render() {
    const { disabled, isLoading } = this.state
    const { driversList, parentsList, gradesList, shiftsList } = this.props
    const morningShifts = filter(({ type }) => type === 'Pickup')(shiftsList)
    const eveningShifts = filter(({ type }) => type === 'Dropoff')(shiftsList)
    const { classes, onClose, formValues, ...other } = this.props
    const { photo } = formValues || {}
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
          {'Edit Student'}
        </DialogTitle>
        <DialogContent className={styles.dialog}>
          <Choose>
            <When condition={isLoading}>
              <LoadingView />
            </When>
            <Otherwise>
              <form className={styles.root}>
                <div className={styles.fullRow}>
                  <Picture
                    source={photo || '/images/profileStudent.png'}
                    onChange={this.fileChangedHandler}
                  />
                </div>

                <div className={styles.fullRow}>
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
                </div>
                <div className={styles.sameRow}>
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
                      className={styles.item}
                      name="parent_id"
                      component={renderTextField}
                      select
                      label="Select Parent"
                      variant="outlined"
                      margin="dense"
                    >
                      {map(({ parent_id, fullname }) => (
                        <MenuItem key={parent_id} value={parent_id}>
                          {fullname}
                        </MenuItem>
                      ))(parentsList)}
                    </Field>
                  </div>
                </div>
                <div className={styles.sameRow}>
                  <div className={styles.row}>
                    <Field
                      className={styles.item}
                      name="shift_morning"
                      component={renderTextField}
                      select
                      label="Select Pickup Shift"
                      variant="outlined"
                      margin="dense"
                    >
                      {map(({ shift_id, shift_name }) => (
                        <MenuItem key={shift_id} value={shift_id}>
                          {shift_name}
                        </MenuItem>
                      ))([
                        { shift_id: null, shift_name: 'None' },
                        ...morningShifts,
                      ])}
                    </Field>
                  </div>
                  <div className={styles.row}>
                    <Field
                      className={styles.item}
                      name="shift_evening"
                      component={renderTextField}
                      select
                      label="Select Dropoff Shift"
                      variant="outlined"
                      margin="dense"
                    >
                      {map(({ shift_id, shift_name }) => (
                        <MenuItem key={shift_id} value={shift_id}>
                          {shift_name}
                        </MenuItem>
                      ))([
                        { shift_id: null, shift_name: 'None' },
                        ...eveningShifts,
                      ])}
                    </Field>
                  </div>
                </div>
                <div className={styles.sameRow}>
                  <div className={styles.row}>
                    <Field
                      className={styles.item}
                      name="grade"
                      component={renderTextField}
                      select
                      label="Select Grade"
                      variant="outlined"
                      margin="dense"
                    >
                      {map(({ grade_id, grade_section }) => (
                        <MenuItem key={grade_id} value={grade_id}>
                          {grade_section}
                        </MenuItem>
                      ))(gradesList)}
                    </Field>
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
                </div>
                <div className={styles.fullRow}>
                  <div className={styles.item}>
                    <Button
                      disabled={disabled}
                      onClick={this.updateStudent}
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
  const drivers = getOr({}, 'drivers')(state)
  const driversList = getOr([], 'drivers')(drivers)
  const parents = getOr({}, 'parents')(state)
  const parentsList = getOr([], 'parents')(parents)
  const grades = getOr({}, 'grades')(state)
  const gradesList = getOr([], 'grades')(grades)
  const shifts = getOr({}, 'shifts')(state)
  const shiftsList = getOr([], 'shifts')(shifts)
  return {
    formValues: getFormValues('editStudent')(state),
    validationErrors: getFormSyncErrors('editStudent')(state),
    user,
    driversList,
    parentsList,
    gradesList,
    shiftsList,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editStudent',
    validate,
    initialValues: {
      fullname: '',
      status: 'Active',
      photo: '',
      grade: '',
      shift_morning: '',
      shift_evening: '',
      parent_id: '',
      driver_id: '',
    },
  })(EditStudent),
)
