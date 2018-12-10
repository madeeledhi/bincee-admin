// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import { push } from 'react-router-redux'

// src
import transformData from './transformers/transformData'
import { hasPropChanged, infoDrawer } from '../../utils'
import { loadGrades, deleteGrade } from '../../actions'
import GradesSectionsInner from './GradesSectionsInner'
import Drawer from '../Drawer'

class GradesSections extends React.Component {
  state = { error: '', isLoading: true }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadGrades({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'grades'], this.props, nextProps)) {
      const { dispatch, user, grades, error } = nextProps
      const { token } = user
      if (size(grades) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadGrades({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  handleDeleteGrade = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(deleteGrade({ id, token })).then(({ payload }) => {
      dispatch(loadGrades({ token }))
    })
  }

  handleCreateGrade = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/grades/create'))
  }

  handleUpdateGrade = (event, id) => {
    const { dispatch } = this.props
    dispatch(push(`/dashboard/grades/edit/${id}`))
  }

  handleRowClick = data => {
    const { triggerDrawer } = this.props
    const { grade_name, section, grade_section } = data
    // TODO: Create a component that will show the details {data} in the drawer
    /*
    Component format will be as following
    Heading
    firstKey: firstValue
    SecondKey: SecondValue
    */
    // Pass the data object as a prop to that component, style the component properly as same style will be used for other tables
    // and will render data that will be have more than 1 heading
    triggerDrawer({
      title: 'Grade Content',
      content: (
        <Drawer data={{ grade: { grade_name, section, grade_section } }} />
      ),
    })
  }

  handleDeleteMutipleGrades = selectedArray => {
    const { dispatch, user } = this.props
    const { token } = user
    map(id => dispatch(deleteGrade({ id, token })))(selectedArray)
    dispatch(loadGrades({ token }))
  }

  render() {
    const { error, isLoading } = this.state
    const { grades } = this.props
    const { columns: rows, rows: data } = grades

    return (
      <GradesSectionsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onRowClick={this.handleRowClick}
        onDeleteGrade={this.handleDeleteGrade}
        onCreateGrade={this.handleCreateGrade}
        onUpdateGrade={this.handleUpdateGrade}
      />
    )
  }
}

const mapStateToProps = state => {
  const grades = getOr({}, 'grades')(state)
  const user = getOr({}, 'user')(state)
  const gradesList = getOr([], 'grades')(grades)
  const error = getOr('', 'message')(grades)
  const transformedGrades = transformData(gradesList)
  return { grades: transformedGrades, user, error }
}
// TODO: send the style for drawer header
const drawerSettings = { style: {} }
export default infoDrawer(drawerSettings)(
  connect(mapStateToProps)(GradesSections),
)
