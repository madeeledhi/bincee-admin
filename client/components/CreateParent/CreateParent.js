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
import styles from './CreateParent.less'
import { createParent, uploadImage, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'
import Picture from '../Picture'

class CreateParent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { disabled: false, isLoading: false }
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

  createNewParent = () => {
    const { dispatch, formValues, user, onClose } = this.props
    const { token } = user
    const lat = 33.99
    const lng = 70.89
    const username = uniqueId(formValues.fullname)
    const {
      password,
      fullname,
      address,
      phone_no,
      email,
      status,
      photo,
    } = formValues
    this.setState(() => ({ isLoading: true }))

    dispatch(
      createParent({
        username,
        password,
        fullname,
        address,
        phone_no,
        email,
        status,
        lat,
        lng,
        photo,
        token,
      }),
    ).then(({ payload }) => {
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        dispatch(showErrorMessage('Created successfully', 'success'))
        onClose()
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
      address: '',
      phone_no: '',
      email: '',
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
          user: 'parent',
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
          {'Create Parent'}
        </DialogTitle>
        <DialogContent>
          <form className={styles.root}>
            <div className={styles.fullRow}>
              <Picture source={'data:image/jpeg;base64,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'}/>
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
                  id="password"
                  name="password"
                  component={renderTextField}
                  label="Password"
                  disabled={false}
                  variant="outlined"
                  className={styles.item}
                />
              </div>
            </div>
            <div className={styles.sameRow}>
              <div className={styles.row}>
                <Field
                  id="email"
                  name="email"
                  component={renderTextField}
                  label="Email"
                  disabled={false}
                  variant="outlined"
                  className={styles.item}
                />
              </div>
              <div className={styles.row}>
                <Field
                  id="address"
                  name="address"
                  component={renderTextField}
                  label="Address"
                  disabled={false}
                  variant="outlined"
                  className={styles.item}
                />
              </div>
            </div>
            <div className={styles.sameRow}>
              <div className={styles.row}>
                <Field
                  id="phone_no"
                  name="phone_no"
                  component={renderTextField}
                  label="Phone no"
                  disabled={false}
                  variant="outlined"
                  className={styles.item}
                />
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
            {/* <div className={styles.sameRow}>
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
            </div> */}
            <div className={styles.fullRow}>
              <div className={styles.item}>
                <Button
                  disabled={disabled}
                  onClick={this.createNewParent}
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
    formValues: getFormValues('createParent')(state),
    validationErrors: getFormSyncErrors('createParent')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createParent',
    validate,
    initialValues: {
      password: '',
      fullname: '',
      address: '',
      phone_no: '',
      email: '',
      status: 'Active',
      photo: '',
    },
  })(CreateParent),
)
