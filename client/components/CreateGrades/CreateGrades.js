// libs
import React from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'

//src
import { RenderTextField } from '../shared/form-fields'
import styles from './CreateGrades.less'
import { createGrade, editGrade } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { Button } from '@material-ui/core'

class CreateGrades extends React.Component {
  updateGrade = () => {
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
    return (
      <div className={styles.root}>
        <Field
          id="gradeName"
          name="grade_name"
          component={RenderTextField}
          label="Grade Name"
          disabled={false}
        />
        <Field
          id="section"
          name="section"
          component={RenderTextField}
          label="Section"
          disabled={false}
        />
        <Field
          id="gradeSection"
          name="grade_section"
          component={RenderTextField}
          label="gradeSection"
          disabled={false}
        />
        <div className={styles.buttonGroup}>
          <Button onClick={this.updateGrade}>Update</Button>
          <Button onClick={this.handleCancel}>Cancel</Button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const user = getOr({}, 'user')(state)
  return { formValues: getFormValues('grades')(state), user }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'grades',
    enableReinitialize: true,
    initialValues: {
      grade_name: '',
      section: '',
      grade_section: '',
    },
  })(CreateGrades),
)
