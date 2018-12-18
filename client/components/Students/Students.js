// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import { loadStudents, deleteStudent } from '../../actions'
import StudentsInner from './StudentsInner'

class Students extends React.Component {
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
      dispatch(loadStudents({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'students'], this.props, nextProps)) {
      const { dispatch, user, students, error } = nextProps
      const { token } = user
      if (size(students) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadStudents({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  handleDeleteStudent = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(deleteStudent({ id, token })).then(({ payload }) => {
      dispatch(loadStudents({ token }))
    })
  }

  handleCreateStudent = () => {
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateStudent = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadStudents({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  handleDeleteMutipleStudents = selectedArray => {
    const { dispatch, user } = this.props
    const { token } = user
    map(id => dispatch(deleteStudent({ id, token })))(selectedArray)
    dispatch(loadStudents({ token }))
  }

  render() {
    const { error, isLoading, createDialog, editDialog, editId } = this.state
    const { students } = this.props
    const { columns: rows, rows: data } = students

    return (
      <StudentsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onDeleteStudent={this.handleDeleteStudent}
        onCreateStudent={this.handleCreateStudent}
        onUpdateStudent={this.handleUpdateStudent}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = state => {
  const students = getOr({}, 'students')(state)
  const user = getOr({}, 'user')(state)
  const studentsList = getOr([], 'students')(students)
  const error = getOr('', 'message')(students)
  const transformedStudents = transformData(studentsList)
  return { students: transformedStudents, user, error }
}
export default connect(mapStateToProps)(Students)
