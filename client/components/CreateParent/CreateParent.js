// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import uniqueId from 'lodash/fp/uniqueId'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import size from 'lodash/fp/size'
import FormData from 'form-data'

//src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './CreateParent.less'
import { createParent, uploadImage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'

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
    const { dispatch, formValues, user } = this.props
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
      dispatch(push('/dashboard/parents'))
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/parents'))
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
    return (
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