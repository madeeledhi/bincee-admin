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
import { loadLeaves } from '../../actions'
import LeavesInner from './LeavesInner'

class Leaves extends React.Component {
  state = { error: '', isLoading: true }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadLeaves({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'leaves'], this.props, nextProps)) {
      const { dispatch, user, leaves, error } = nextProps
      const { token } = user
      if (size(leaves) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadLeaves({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  render() {
    const { error, isLoading } = this.state
    const { leaves } = this.props
    const { columns: rows, rows: data } = leaves

    return (
      <LeavesInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
      />
    )
  }
}

const mapStateToProps = state => {
  const leaves = getOr({}, 'leaves')(state)
  const user = getOr({}, 'user')(state)
  const leavesList = getOr([], 'leaves')(leaves)
  const error = getOr('', 'message')(leaves)
  const transformedLeaves = transformData(leavesList)
  return { leaves: transformedLeaves, user, error }
}
export default connect(mapStateToProps)(Leaves)
