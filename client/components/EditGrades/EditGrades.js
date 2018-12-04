// libs
import React from 'react'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'

//src
import { renderTextField } from '../shared/reduxFormMaterialUI'
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
              onClick={this.updateGrade}
              color="primary"
              variant="contained"
            >
              Update
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
