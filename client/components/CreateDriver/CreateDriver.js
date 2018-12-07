// libs
import React from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import uniqueId from 'lodash/fp/uniqueId'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Input from '@material-ui/core/Input'
import FormData from 'form-data'

//src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './CreateDriver.less'
import { createDriver, uploadImage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'

// TODO: Refactor Photo upload
class CreateDriver extends React.Component {
  state = { selectedFile: null }

  createDriver = () => {
    const { dispatch, formValues, user } = this.props
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
      dispatch(push('/dashboard/drivers'))
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/drivers'))
  }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  uploadHandler = () => {
    const { selectedFile } = this.state
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
      )
    }
  }

  render() {
    return (
      <div className={styles.root}>
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
            id="photo"
            name="photo"
            component={renderTextField}
            label="Photo Url"
            disabled={false}
            variant="outlined"
            className={styles.item}
          />
          <Input type="file" onChange={this.fileChangedHandler} />
          <Button onClick={this.uploadHandler}>Upload!</Button>
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <Button
              onClick={this.createDriver}
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
  return { formValues: getFormValues('createDriver')(state), user }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createDriver',
    enableReinitialize: true,
    initialValues: {
      password: '',
      fullname: '',
      phone_no: '',
      status: 'Active',
      photo: '',
    },
  })(CreateDriver),
)
