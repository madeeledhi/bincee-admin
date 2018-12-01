// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import {
  loadGrades,
  loadSingleGrade,
  createGrade,
  EditGrade,
} from '../../actions'

class Home extends React.Component {
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

  render() {
    const { error, isLoading } = this.state
    const { grades } = this.props
    // TODO: Change the names in enhanced Tables
    // TODO: Fix Enhanced Table inner, there is problem with it
    const { columns: rows, rows: data } = grades
    return (
      <Choose>
        <When condition={!error && !isLoading}>
          <div>
            <EnhancedTable rows={rows} data={data} error={error} />
          </div>
        </When>
        <When condition={error}>
          <div>{error}</div>
        </When>
        <Otherwise>
          <LoadingView message={'Loading Grades & Sections'} />
        </Otherwise>
      </Choose>
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
export default connect(mapStateToProps)(Home)
