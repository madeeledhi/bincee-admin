// libs
import React from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'

//src
import { RenderTextField } from '../shared/form-fields'
import styles from './EditGrades.less'
import { createGrade, editGrade, loadSingleGrade } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { Button } from '@material-ui/core'

class EditGrades extends React.Component {
  componentDidMount() {
    const { user, dispatch, match, initialize } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)

    dispatch(loadSingleGrade({ id, token })).then(({ payload }) => {
      const { status, data } = payload
      const { grade_name, section, grade_section } = data
      const config = { grade_name, section, grade_section }
      initialize(config)
    })
  }

  updateGrade = () => {
    const { dispatch, formValues, user, match } = this.props
    const { token } = user
    const id = getOr('', 'params.id')(match)
    const { grade_name, section, grade_section } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(editGrade({ id, grade_name, section, grade_section, token })).then(
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
  return { formValues: getFormValues('editgrades')(state), user }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editgrades',
    enableReinitialize: true,
    initialValues: {
      grade_name: '',
      section: '',
      grade_section: '',
    },
  })(EditGrades),
)
