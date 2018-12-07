// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

//src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import styles from './CreateGrades.less'
import { createGrade, editGrade } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { Button } from '@material-ui/core'
import { validate } from './util'

class CreateGrades extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
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
  createGrade = () => {
    const { dispatch, formValues, user } = this.props
    const { token } = user
    const { grade_name, section, grade_section } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(createGrade({ grade_name, section, grade_section, token })).then(
      ({ payload }) => {
        dispatch(push('/dashboard/grades'))
      },
    )
  }
  handleCancel = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/grades'))
  }

  render() {
    const { disabled } = this.state
    return (
      <div className={styles.root}>
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
          <Field
            id="gradeSection"
            name="grade_section"
            component={renderTextField}
            label="gradeSection"
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
  return {
    formValues: getFormValues('createGrade')(state),
    validationErrors: getFormSyncErrors('createGrade')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createGrade',
    enableReinitialize: true,
    validate: validate,
    initialValues: {
      grade_name: '',
      section: '',
      grade_section: '',
    },
  })(CreateGrades),
)
