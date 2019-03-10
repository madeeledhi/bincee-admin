// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import XLSX from 'xlsx'

// src
import transformData from './transformers/transformData'
import { hasPropChanged, exportData } from '../../utils'
import { verify, filterSheet } from './utils'
import {
  loadShifts,
  deleteShift,
  showErrorMessage,
  createShift,
} from '../../actions'
import ShiftsAndTimingsInner from './ShiftsAndTimingsInner'

class ShiftsAndTimings extends React.Component {
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
    this.setState(() => ({ isLoading: true }))
    dispatch(deleteShift({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
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

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadShifts({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  exportData = () => {
    const { rawShifts } = this.props
    const { shifts } = rawShifts
    if (size(shifts) > 0) {
      exportData(shifts, 'Shifts')
    } else {
      exportData(
        [
          {
            shift_name: '',
            type: '',
            start_time: '',
            end_time: '',
          },
        ],
        'Shifts',
      )
    }
  }

  importData = event => {
    const { dispatch, user } = this.props
    const { token } = user
    const [selectedFile] = event.target.files
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = e => {
        const xlsrow = e.target.result
        const workbook = XLSX.read(xlsrow, { type: 'buffer' })
        const jsonResult = XLSX.utils.sheet_to_json(workbook.Sheets['Shifts'])
        if (size(jsonResult) < 1) {
          dispatch(showErrorMessage('No Data Found in Sheet', 'error'))
        } else {
          if (verify(jsonResult)) {
            const filteredSheet = filterSheet(jsonResult)
            this.setState(() => ({ isLoading: true }))
            const createdPromise = map(row => {
              const { shift_name, type, start_time, end_time } = row
              return dispatch(
                createShift({
                  shift_name,
                  type,
                  start_time,
                  end_time,
                  token,
                }),
              )
                .then(({ payload }) => {
                  const { status } = payload
                  return status === 200
                })
                .catch(err => false)
            })(filteredSheet)
            Promise.all(createdPromise).then(response => {
              const createdShifts = filter(item => item === true)(response)
              const total = size(jsonResult)
              const created = size(createdShifts)
              if (created > 0) {
                dispatch(
                  showErrorMessage(`${created} Records Created`, 'success'),
                )
              }
              if (total - created > 0) {
                dispatch(
                  showErrorMessage(
                    `${total - created} Records Rejected`,
                    'error',
                  ),
                )
              }
              this.setState(() => ({ isLoading: false }))
              dispatch(loadShifts({ token }))
            })
          } else {
            dispatch(showErrorMessage('Invalid Data in Sheet', 'error'))
          }
        }
      }
      reader.readAsArrayBuffer(selectedFile)
    }
  }

  render() {
    const { error, isLoading, createDialog, editDialog, editId } = this.state
    const { shifts } = this.props
    const { columns: rows, rows: data } = shifts

    return (
      <ShiftsAndTimingsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        importData={this.importData}
        onDataExport={this.exportData}
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
  return { shifts: transformedShifts, user, rawShifts: shifts, error }
}
export default connect(mapStateToProps)(ShiftsAndTimings)
