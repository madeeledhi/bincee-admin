// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import size from 'lodash/fp/size'
import FormData from 'form-data'
import MenuItem from '@material-ui/core/MenuItem'
import map from 'lodash/fp/map'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

// src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './CreateStudent.less'
import {
  createStudent,
  uploadImage,
  loadParents,
  loadDrivers,
  loadGrades,
  loadShifts,
  showErrorMessage,
} from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'
import Picture from '../Picture'

class CreateStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { disabled: false, isLoading: true }
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadParents({ token }))
      dispatch(loadDrivers({ token }))
      dispatch(loadShifts({ token }))
      dispatch(loadGrades({ token }))
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

  createNewStudent = () => {
    const { dispatch, formValues, user, onClose } = this.props
    const { token } = user
    const {
      fullname,
      status,
      photo,
      grade,
      shift,
      parent_id,
      driver_id,
    } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      createStudent({
        fullname,
        status,
        photo,
        grade,
        shift,
        parent_id,
        driver_id,
        token,
      }),
    ).then(({ payload }) => {
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        dispatch(showErrorMessage('Created successfully', 'success'))(onClose())
      }
    })
  }

  handleCancel = () => {
    const { onClose } = this.props
    onClose()
  }

  onEnter = () => {
    const { initialize } = this.props
    const config = {
      fullname: '',
      status: '',
      photo: '',
      grade: '',
      shift: '',
      parent_id: '',
      driver_id: '',
      token: '',
    }
    this.setState(() => ({ isLoading: false }))
    initialize(config)
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
    // TODO: Change file upload control
    const { disabled, isLoading } = this.state
    const { driversList, parentsList, gradesList, shiftsList } = this.props
    const { classes, onClose, formValues, ...other } = this.props
    const { photo } = formValues || {}
    return (
      <Dialog
        onClose={onClose}
        onEnter={this.onEnter}
        aria-labelledby="simple-dialog-title"
        {...other}
        fullWidth
      >
        <DialogTitle id="simple-dialog-title" className={styles.head}>
          {'Create Student'}
        </DialogTitle>
        <DialogContent>
          <Choose>
            <When condition={isLoading}>
              <LoadingView />
            </When>
            <Otherwise>
              <form className={styles.root}>
                <div className={styles.fullRow}>
                  <Picture
                    source={photo || '/images/profile.png'}
                    onChange={this.fileChangedHandler}
                  />
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
                      name="shift"
                      component={renderTextField}
                      select
                      label="Select Shift"
                      variant="outlined"
                      margin="dense"
                    >
                      {map(({ shift_id, shift_name }) => (
                        <MenuItem key={shift_id} value={shift_id}>
                          {shift_name}
                        </MenuItem>
                      ))(shiftsList)}
                    </Field>
                  </div>
                </div>
                <div className={styles.sameRow}>
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
                <div className={styles.fullRow}>
                  <div className={styles.item}>
                    <Button
                      disabled={disabled}
                      onClick={this.createNewStudent}
                      label="Create"
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
const mapStateToProps = (state, ownProps) => {
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
    formValues: getFormValues('createStudent')(state),
    validationErrors: getFormSyncErrors('createStudent')(state),
    user,
    driversList,
    parentsList,
    gradesList,
    shiftsList,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createStudent',
    validate,
    initialValues: {
      fullname: '',
      status: 'Active',
      photo: '',
      grade: '',
      shift: '',
      parent_id: '',
      driver_id: '',
    },
  })(CreateStudent),
)
