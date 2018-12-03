// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import { push } from 'react-router-redux'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import {
  loadGrades,
  loadSingleGrade,
  createGrade,
  editGrade,
  deleteGrade,
} from '../../actions'
import GradesSectionsInner from './GradesSectionsInner'

class GradesSections extends React.Component {
  state = { error: '', isLoading: false }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadGrades({ token }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'grades'], this.props, nextProps)) {
      const { dispatch, user, grades, error } = nextProps
      const { token } = user
      if (size(grades) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadGrades({ token }))
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
    dispatch(push('/dashboard/create/grades'))
  }
  handleUpdateGrade = (event, id) => {
    const { dispatch } = this.props
    dispatch(push(`/dashboard/edit/grades/${id}`))
  }

  render() {
    const { error, isLoading } = this.state
    const { grades } = this.props
    // TODO: Change the names in enhanced Tables
    // TODO: Fix Enhanced Table inner, there is problem with it
    const { columns: rows, rows: data } = grades

    return (
      <GradesSectionsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onDeleteGrade={this.handleDeleteGrade}
        handleCreateGrade={this.handleCreateGrade}
        handleUpdateGrade={this.handleUpdateGrade}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const grades = getOr({}, 'grades')(state)
  const user = getOr({}, 'user')(state)
  const gradesList = getOr([], 'grades')(grades)
  const error = getOr('', 'message')(grades)
  const transformedGrades = transformData(gradesList)
  return { grades: transformedGrades, user, error }
}
export default connect(mapStateToProps)(GradesSections)
