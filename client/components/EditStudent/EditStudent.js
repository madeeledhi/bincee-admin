// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import MenuItem from '@material-ui/core/MenuItem'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'

//src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './EditStudent.less'
import {
  loadSingleStudent,
  updateSTUDENT,
  uploadImage,
  loadParents,
  loadDrivers,
  loadGrades,
  loadShifts,
} from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'
import { showErrorMessage } from '../../actions'

class EditStudent extends React.Component {
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
    dispatch(loadParents({ token }))
    dispatch(loadDrivers({ token }))
    dispatch(loadShifts({ token }))
    dispatch(loadGrades({ token }))
    dispatch(loadSingleStudent({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { data } = payload
      const {
        fullname,
        status,
        photo,
        grade,
        shift,
        parent_id,
        driver_id,
      } = data
      const config = {
        fullname,
        status,
        photo,
        grade,
        shift,
        parent_id,
        driver_id,
      }
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

  updateStudent = () => {
    const { dispatch, formValues, user, match } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)
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
      updateSTUDENT({
        id,
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
        dispatch(push('/dashboard/students'))
        dispatch(showErrorMessage('Updated successfully', 'success'))
      }
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/students'))
  }

  render() {
    const { disabled, isLoading } = this.state
    const { driversList, parentsList, gradesList, shiftsList } = this.props
    return (
      <Choose>
        <When condition={isLoading}>
          <LoadingView />
        </When>
        <Otherwise>
          <form className={styles.root}>
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
            <div className={styles.sameRow}>
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
            <div className={styles.fullRow}>
              <div className={styles.item}>
                <Button
                  disabled={disabled}
                  onClick={this.updateStudent}
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
      status: '',
      photo: '',
      grade: '',
      shift: '',
      parent_id: '',
      driver_id: '',
    },
  })(EditStudent),
)
