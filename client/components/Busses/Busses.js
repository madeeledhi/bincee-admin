// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import XLSX from 'xlsx'

// src
import transformData, {
  transformDrawerData,
} from './transformers/transformData'
import { hasPropChanged, exportData } from '../../utils'
import { verify, filterSheet } from './utils'
import {
  createBus,
  loadAllBus,
  deleteBus,
  loadSingleDriver,
  showErrorMessage,
} from '../../actions'
import BussesInner from './BussesInner'

class Busses extends React.Component {
  state = {
    error: '',
    isLoading: true,
    createDialog: false,
    editDialog: false,
    editId: '',
    drawerData: {},
    dataIsAvailable: false,
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadAllBus({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'busses'], this.props, nextProps)) {
      const { dispatch, user, busses, error } = nextProps
      const { token } = user
      if (size(busses) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadAllBus({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  exportData = () => {
    const { rawBuses } = this.props
    const { bus } = rawBuses
    if (size(bus) > 0) {
      exportData(bus, 'Busses')
    } else {
      exportData(
        [{ id: '', registration_no: '', description: '', driver_id: '' }],
        'Busses',
      )
    }
  }

  handleDeleteBus = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    this.setState(() => ({ isLoading: true }))
    dispatch(deleteBus({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      dispatch(loadAllBus({ token }))
    })
  }

  handleCreateBus = () => {
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateBus = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleRowClick = data => {
    const { dispatch, user } = this.props
    const { driver_id } = data
    const { token } = user

    this.setState(() => ({
      dataIsAvailable: false,
    }))
    dispatch(loadSingleDriver({ id: driver_id, token })).then(({ payload }) => {
      const { status, data: payloadData } = payload
      if (status === 200) {
        const dataToShow = transformDrawerData({
          bus: data,
          driver: payloadData,
        })
        this.setState(() => ({ drawerData: dataToShow, dataIsAvailable: true }))
      }
    })
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadAllBus({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
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
        const jsonResult = XLSX.utils.sheet_to_json(workbook.Sheets['Busses'])
        if (size(jsonResult) < 1) {
          dispatch(showErrorMessage('No Data Found in Sheet', 'error'))
        } else {
          if (verify(jsonResult)) {
            const filteredSheet = filterSheet(jsonResult)
            this.setState(() => ({ isLoading: true }))
            const createdPromise = map(row => {
              const { registration_no, description, driver_id } = row
              return dispatch(
                createBus({
                  registration_no,
                  description,
                  driver_id,
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
              const createdBusses = filter(item => item === true)(response)
              const total = size(jsonResult)
              const created = size(createdBusses)
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
              dispatch(loadAllBus({ token }))
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
    const {
      error,
      isLoading,
      createDialog,
      editDialog,
      editId,
      drawerData,
      dataIsAvailable,
    } = this.state
    const { busses } = this.props
    const { columns: rows, rows: data } = busses

    return (
      <BussesInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        importData={this.importData}
        onDataExport={this.exportData}
        onRowClick={this.handleRowClick}
        onDeleteBus={this.handleDeleteBus}
        onCreateBus={this.handleCreateBus}
        onUpdateBus={this.handleUpdateBus}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
        sendCredentials={this.handleSendCredentials}
        drawerData={drawerData}
        dataIsAvailable={dataIsAvailable}
      />
    )
  }
}

const mapStateToProps = state => {
  const busses = getOr({}, 'bus')(state)
  const user = getOr({}, 'user')(state)
  const bussesList = getOr([], 'bus')(busses)
  const error = getOr('', 'message')(busses)
  const transformedBusses = transformData(bussesList)
  return { busses: transformedBusses, rawBuses: busses, user, error }
}

export default connect(mapStateToProps)(Busses)
