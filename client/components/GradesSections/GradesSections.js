// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import { infoDrawer } from '../shared/infoDrawer'
import { loadGrades, deleteGrade } from '../../actions'
import GradesSectionsInner from './GradesSectionsInner'
import Drawer from '../Drawer'

class GradesSections extends React.Component {
  state = {
    error: '',
    isLoading: true,
    createDialog: false,
    editDialog: false,
    editId: '',
  }

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
    if (
      hasPropChanged(['user', 'grades', 'gradesList'], this.props, nextProps)
    ) {
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
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateGrade = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadGrades({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  handleRowClick = data => {
    const { triggerDrawer } = this.props
    const { grade_name, section, grade_section } = data
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
    const { error, isLoading, createDialog, editDialog, editId } = this.state
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
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
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
