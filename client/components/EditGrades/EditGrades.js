// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

//src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import styles from './EditGrades.less'
import { createGrade, editGrade, loadSingleGrade } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import Button from '../Button'
import { validate } from './util'

class EditGrades extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
    }
  }
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
    const { disabled } = this.state
    return (
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
          <Field
            id="gradeSection"
            name="grade_section"
            component={renderTextField}
            label="gradeSection"
            disabled={false}
            variant="outlined"
            margin="dense"
            className={styles.item}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <Button
              disabled={disabled}
              onClick={this.updateGrade}
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
      grade_section: '',
    },
  })(EditGrades),
)
