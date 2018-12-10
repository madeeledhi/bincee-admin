// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import size from 'lodash/fp/size'

//src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './EditParent.less'
import { loadSingleParent, updateParent } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'

class EditParent extends React.Component {
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

    dispatch(loadSingleParent({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { data } = payload
      const { fullname, address, phone_no, email, status, photo } = data
      const config = { fullname, address, phone_no, email, status, photo }
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

  updateParent = () => {
    const { dispatch, formValues, user, match } = this.props
    const { token } = user
    const lat = 33.99
    const lng = 70.89
    const id = getOr('', 'params.id')(match)
    const { fullname, address, phone_no, email, status, photo } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      updateParent({
        id,
        fullname,
        address,
        phone_no,
        email,
        status,
        photo,
        lat,
        lng,
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

  render() {
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
              onClick={this.updateParent}
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
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const user = getOr({}, 'user')(state)
  return {
    formValues: getFormValues('editParent')(state),
    validationErrors: getFormSyncErrors('editParent')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editParent',
    validate,
    initialValues: {
      fullname: '',
      address: '',
      phone_no: '',
      email: '',
      status: '',
      photo: '',
    },
  })(EditParent),
)
