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
import styles from './CreateGrades.less'
import { createGrade, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import Button from '../Button'
import { validate } from './util'

class CreateGrades extends React.Component {
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

  createGrade = () => {
    const { dispatch, formValues, user, onClose } = this.props
    const { token } = user
    const { grade_name, section } = formValues

    const grade_section = `${grade_name} ${section}`
    this.setState(() => ({ isLoading: true }))
    dispatch(createGrade({ grade_name, section, grade_section, token })).then(
      ({ payload }) => {
        const { status: requestStatus } = payload
        if (requestStatus === 200) {
          dispatch(showErrorMessage('Created successfully', 'success'))(
            onClose(),
          )
        }
      },
    )
  }

  handleCancel = () => {
    const { onClose } = this.props
    onClose()
  }

  onEnter = () => {
    const { initialize } = this.props
    const config = { grade_name: '', section: '', grade_section: '' }
    this.setState(() => ({ isLoading: false }))
    initialize(config)
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
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="simple-dialog-title" className={styles.head}>
          {'Create Grades'}
        </DialogTitle>
        <DialogContent>
          <Choose>
            <When condition={isLoading}>
              <LoadingView style={{ minHeight: 300 }} />
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
                      onClick={this.createGrade}
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
  return {
    formValues: getFormValues('createGrade')(state),
    validationErrors: getFormSyncErrors('createGrade')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createGrade',
    validate,
    initialValues: {
      grade_name: '',
      section: '',
    },
  })(CreateGrades),
)
