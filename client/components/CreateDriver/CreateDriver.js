// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import uniqueId from 'lodash/fp/uniqueId'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import size from 'lodash/fp/size'
import FormData from 'form-data'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

// src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './CreateDriver.less'
import { createDriver, uploadImage, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'

class CreateDriver extends React.Component {
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

  createDriver = () => {
    const { dispatch, formValues, user, onClose } = this.props
    const { token } = user
    const username = uniqueId(formValues.fullname)
    const { password, fullname, phone_no, status, photo } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      createDriver({
        username,
        password,
        fullname,
        phone_no,
        status,
        photo,
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
      password: '',
      fullname: '',
      phone_no: '',
      status: '',
      photo: '',
    }
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
      dispatch(
        uploadImage({
          id: 1,
          user: 'driver',
          image: formData,
          token,
        }),
      ).then(({ payload }) => {
        const { status, data } = payload
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
        <DialogTitle id="simple-dialog-title" className={styles.head}>
          {'Create Driver'}
        </DialogTitle>
        <DialogContent>
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
                id="password"
                name="password"
                component={renderTextField}
                label="Password"
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
                  onClick={this.createDriver}
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
    formValues: getFormValues('createDriver')(state),
    validationErrors: getFormSyncErrors('createDriver')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createDriver',
    validate,
    initialValues: {
      password: '',
      fullname: '',
      phone_no: '',
      status: 'Active',
      photo: '',
    },
  })(CreateDriver),
)
