// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import find from 'lodash/fp/find'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import uniqueId from 'lodash/fp/uniqueId'
import XLSX from 'xlsx'

// src
import transformData from './transformers/transformData'
import { hasPropChanged, exportData, makePID } from '../../utils'
import { verify, filterSheet } from './utils'
import {
  createDriver,
  loadDrivers,
  deleteDriver,
  loadSingleUser,
  sendCredentials,
  showErrorMessage,
} from '../../actions'
import DriversInner from './DriversInner'

class Drivers extends React.Component {
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
    this.setState(() => ({ isLoading: true }))
    dispatch(deleteDriver({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
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

  handleSendCredentials = () => {
    const { loadedUser, drivers, user, dispatch } = this.props
    const { id, username, password } = loadedUser
    const { token } = user
    const { rows } = drivers
    const { phone_no } = find(({ id: userId }) => id === userId)(rows)
    dispatch(
      sendCredentials({
        username,
        password,
        email: '',
        phone_no,
        type: 'Driver',
        token,
      }),
    ).then(({ payload }) => {
      const { status, data } = payload
      const { message = 'Something Bad happened' } = data
      if (status === 200) {
        dispatch(showErrorMessage(message, 'success'))
      } else {
        dispatch(showErrorMessage(message))
      }
    })
  }

  handleRowClick = data => {
    const { dispatch, user } = this.props
    const { id, fullname, status, photo } = data
    const { token } = user

    this.setState(() => ({
      dataIsAvailable: false,
    }))

    dispatch(
      loadSingleUser({
        id,
        token,
      }),
    ).then(({ payload }) => {
      const { status: requestStatus, data: payloadData } = payload
      if (requestStatus === 200) {
        const { username, password } = payloadData
        const dataToShow = {
          credentials: {
            username,
            password,
            hasCredentials: true,
          },
          driver: {
            id,
            fullname,
            status,
            photo,
            isDriver: true,
          },
        }
        this.setState(() => ({ drawerData: dataToShow, dataIsAvailable: true }))
      }
    })
  }

  exportData = () => {
    const { rawDriver } = this.props
    const { drivers } = rawDriver
    if (size(drivers) > 0) {
      exportData(drivers, 'Drivers')
    } else {
      exportData(
        [{ driver_id: '', fullname: '', phone_no: '', status: '' }],
        'Drivers',
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
        const jsonResult = XLSX.utils.sheet_to_json(workbook.Sheets['Drivers'])
        if (size(jsonResult) < 1) {
          dispatch(showErrorMessage('No Data Found in Sheet', 'error'))
        } else {
          if (verify(jsonResult)) {
            const filteredSheet = filterSheet(jsonResult)
            this.setState(() => ({ isLoading: true }))
            const createdPromise = map(row => {
              const { fullname, phone_no, status, photo = '' } = row

              const username = phone_no
              const password = uniqueId(makePID())
              return dispatch(
                createDriver({
                  username,
                  password,
                  fullname,
                  phone_no,
                  status,
                  photo,
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
              const createdDrivers = filter(item => item === true)(response)
              const total = size(jsonResult)
              const created = size(createdDrivers)
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
              dispatch(loadDrivers({ token }))
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
    const { drivers } = this.props
    const { columns: rows, rows: data } = drivers

    return (
      <DriversInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        importData={this.importData}
        onDataExport={this.exportData}
        onRowClick={this.handleRowClick}
        onDeleteDriver={this.handleDeleteDriver}
        onCreateDriver={this.handleCreateDriver}
        onUpdateDriver={this.handleUpdateDriver}
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
  const drivers = getOr({}, 'drivers')(state)
  const user = getOr({}, 'user')(state)
  const loadedUser = getOr({}, 'users.loadedUser')(state)
  const driversList = getOr([], 'drivers')(drivers)
  const error = getOr('', 'message')(drivers)
  const transformedDrivers = transformData(driversList)
  return {
    drivers: transformedDrivers,
    user,
    rawDriver: drivers,
    error,
    loadedUser,
  }
}

export default connect(mapStateToProps)(Drivers)
