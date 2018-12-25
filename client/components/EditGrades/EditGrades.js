// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

// src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import styles from './EditGrades.less'
import { editGrade, loadSingleGrade, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import Button from '../Button'
import { validate } from './util'

class EditGrades extends React.Component {
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

  updateGrade = () => {
    const { dispatch, formValues, user, id, onClose } = this.props
    const { token } = user
    const { grade_name, section } = formValues
    const grade_section = `${grade_name} ${section}`
    this.setState(() => ({ isLoading: true }))
    dispatch(editGrade({ id, grade_name, section, grade_section, token })).then(
      ({ payload }) => {
        const { status: requestStatus } = payload
        if (requestStatus === 200) {
          onClose()
          dispatch(showErrorMessage('Updated successfully', 'success'))
        }
      },
    )
  }

  handleCancel = () => {
    const { onClose } = this.props
    this.setState(() => ({ isLoading: true }))
    onClose()
  }

  onEnter = () => {
    const { user, dispatch, initialize, id } = this.props
    const { token } = user
    dispatch(loadSingleGrade({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { data } = payload
      const { grade_name, section } = data
      const config = { grade_name, section }
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
      >
        <DialogTitle id="simple-dialog-title" className={styles.head}>
          {'Edit Grades'}
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
                    id="gradeName"
                    name="grade_name"
                    component={renderTextField}
                    label="Grade Name"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>
                <div className={styles.row}>
                  <Field
                    id="section"
                    name="section"
                    component={renderTextField}
                    label="Section"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.item}>
                    <Button
                      disabled={disabled}
                      onClick={this.updateGrade}
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
    formValues: getFormValues('editgrade')(state),
    validationErrors: getFormSyncErrors('editgrade')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editgrade',
    validate,
    initialValues: {
      grade_name: '',
      section: '',
    },
  })(EditGrades),
)
