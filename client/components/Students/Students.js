// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import { push } from 'react-router-redux'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import { loadStudents, deleteStudent } from '../../actions'
import StudentsInner from './StudentsInner'

class Students extends React.Component {
  state = { error: '', isLoading: true }

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
    const { dispatch } = this.props
    dispatch(push('/dashboard/students/create'))
  }

  handleUpdateStudent = (event, id) => {
    const { dispatch } = this.props
    dispatch(push(`/dashboard/students/edit/${id}`))
  }

  handleDeleteMutipleStudents = selectedArray => {
    const { dispatch, user } = this.props
    const { token } = user
    map(id => dispatch(deleteStudent({ id, token })))(selectedArray)
    dispatch(loadStudents({ token }))
  }

  render() {
    const { error, isLoading } = this.state
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
