// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import MenuItem from '@material-ui/core/MenuItem'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '../Button'

// src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import styles from './EditBus.less'
import { loadSingleBus, editBus, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'

class EditBus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { disabled: false, isLoading: true }
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

  updateBus = () => {
    const { dispatch, formValues, user, id, onClose } = this.props
    const { token } = user
    const { registration_no, description, driver_id } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      editBus({ id, registration_no, description, driver_id, token }),
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
    dispatch(loadSingleBus({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { data } = payload
      const { registration_no, description, driver_id } = data
      const config = { registration_no, description, driver_id }
      initialize(config)
    })
  }

  render() {
    const { disabled, isLoading } = this.state
    const { driversList } = this.props
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
          {'Edit Bus'}
        </DialogTitle>
        <DialogContent className={styles.dialog}>
          <Choose>
            <When condition={isLoading}>
              <LoadingView style={{ minHeight: 300 }} />
            </When>
            <Otherwise>
              <form className={styles.root}>
                <div className={styles.row}>
                  <Field
                    id="registration_no"
                    name="registration_no"
                    component={renderTextField}
                    label="Registration no"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>
                <div className={styles.row}>
                  <Field
                    id="description"
                    name="description"
                    component={renderTextField}
                    label="Description"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
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
                <div className={styles.row}>
                  <div className={styles.item}>
                    <Button
                      disabled={disabled}
                      onClick={this.updateBus}
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
  return {
    formValues: getFormValues('editBus')(state),
    validationErrors: getFormSyncErrors('editBus')(state),
    user,
    driversList,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editBus',
    validate,
    initialValues: {
      registration_no: '',
      description: '',
      driver_id: '',
    },
  })(EditBus),
)
