// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import { push } from 'react-router-redux'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import { loadDrivers, deleteDriver } from '../../actions'
import DriversInner from './DriversInner'

class Drivers extends React.Component {
  state = { error: '', isLoading: false }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadDrivers({ token }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'drivers'], this.props, nextProps)) {
      const { dispatch, user, drivers, error } = nextProps
      const { token } = user
      if (size(drivers) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadDrivers({ token }))
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  handleDeleteDriver = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(deleteDriver({ id, token })).then(({ payload }) => {
      dispatch(loadDrivers({ token }))
    })
  }
  handleCreateDriver = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/drivers/create'))
  }
  handleUpdateDriver = (event, id) => {
    const { dispatch } = this.props
    dispatch(push(`/dashboard/drivers/edit/${id}`))
  }
  handleDeleteMutipleDrivers = selectedArray => {
    const { dispatch, user } = this.props
    const { token } = user
    map(id => dispatch(deleteDriver({ id, token })))(selectedArray)
    dispatch(loadDrivers({ token }))
  }

  render() {
    const { error, isLoading } = this.state
    const { drivers } = this.props
    const { columns: rows, rows: data } = drivers

    return (
      <DriversInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onDeleteDriver={this.handleDeleteDriver}
        onCreateDriver={this.handleCreateDriver}
        onUpdateDriver={this.handleUpdateDriver}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const drivers = getOr({}, 'drivers')(state)
  const user = getOr({}, 'user')(state)
  const driversList = getOr([], 'drivers')(drivers)
  const error = getOr('', 'message')(drivers)
  const transformedDrivers = transformData(driversList)
  return { drivers: transformedDrivers, user, error }
}
export default connect(mapStateToProps)(Drivers)
