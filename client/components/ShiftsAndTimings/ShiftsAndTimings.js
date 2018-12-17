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
import { loadShifts, deleteShift } from '../../actions'
import ShiftsAndTimingsInner from './ShiftsAndTimingsInner'

class ShiftsAndTimings extends React.Component {
  state = { error: '', 
  isLoading: true,
  createDialog: false,
  editDialog: false,
  editId: '',
 }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadShifts({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'drivers'], this.props, nextProps)) {
      const { dispatch, user, shifts, error } = nextProps
      const { token } = user
      if (size(shifts) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadShifts({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  handleDeleteShift = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(deleteShift({ id, token })).then(({ payload }) => {
      dispatch(loadShifts({ token }))
    })
  }

  handleCreateShift = () => {
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateShift = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleDeleteMutipleShifts = selectedArray => {
    const { dispatch, user } = this.props
    const { token } = user
    map(id => dispatch(deleteShift({ id, token })))(selectedArray)
    dispatch(loadShifts({ token }))
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadShifts({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  render() {
    const { error, isLoading, createDialog, editDialog, editId  } = this.state
    const { shifts } = this.props
    const { columns: rows, rows: data } = shifts

    return (
      <ShiftsAndTimingsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onDeleteShift={this.handleDeleteShift}
        onCreateShift={this.handleCreateShift}
        onUpdateShift={this.handleUpdateShift}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = state => {
  const shifts = getOr({}, 'shifts')(state)
  const user = getOr({}, 'user')(state)
  const shiftsList = getOr([], 'shifts')(shifts)
  const error = getOr('', 'message')(shifts)
  const transformedShifts = transformData(shiftsList)
  return { shifts: transformedShifts, user, error }
}
export default connect(mapStateToProps)(ShiftsAndTimings)
