// libs
import React from 'react'
import { connect, push } from 'react-redux'
import getOr from 'lodash/fp/getOr'

// src
import EnhancedTable from '../EnhancedTable'
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import {
  loadGrades,
  loadSingleGrade,
  createGrade,
  EditGrade,
} from '../../actions'

class Home extends React.Component {
  state = { grades: {}, error: '' }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadGrades({ token }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('grades', this.props, nextProps)) {
      const { grades, error } = nextProps
      this.setState(() => ({ grades, error }))
    }
    if (hasPropChanged('user', this.props, nextProps)) {
      const { dispatch, user } = nextProps
      const { token } = user
      dispatch(loadGrades({ token }))
    }
  }

  render() {
    const { grades, error } = this.state
    // TODO: Change the names in enhanced Tables
    // TODO: Fix Enhanced Table inner, there is problem with it
    const { columns: rows, rows: data } = grades
    return (
      <div>
        <EnhancedTable rows={rows} data={data} error={error} />
      </div>
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
