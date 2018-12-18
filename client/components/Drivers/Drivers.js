// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import { loadDrivers, deleteDriver } from '../../actions'
import DriversInner from './DriversInner'

class Drivers extends React.Component {
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
      dispatch(loadDrivers({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'drivers'], this.props, nextProps)) {
      const { dispatch, user, drivers, error } = nextProps
      const { token } = user
      if (size(drivers) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadDrivers({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
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
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateDriver = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadDrivers({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  handleDeleteMutipleDrivers = selectedArray => {
    const { dispatch, user } = this.props
    const { token } = user
    map(id => dispatch(deleteDriver({ id, token })))(selectedArray)
    dispatch(loadDrivers({ token }))
  }

  render() {
    const { error, isLoading, createDialog, editDialog, editId } = this.state
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
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = state => {
  const drivers = getOr({}, 'drivers')(state)
  const user = getOr({}, 'user')(state)
  const driversList = getOr([], 'drivers')(drivers)
  const error = getOr('', 'message')(drivers)
  const transformedDrivers = transformData(driversList)
  return { drivers: transformedDrivers, user, error }
}
export default connect(mapStateToProps)(Drivers)
