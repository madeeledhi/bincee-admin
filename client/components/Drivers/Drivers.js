// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import find from 'lodash/fp/find'
import size from 'lodash/fp/size'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import {
  loadDrivers,
  deleteDriver,
  loadSingleUser,
  sendCredentials,
  showErrorMessage,
} from '../../actions'
import DriversInner from './DriversInner'
import InfoDrawer from '../InfoDrawer'
import Drawer from '../Drawer'

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
    const { triggerDrawer, dispatch, user, onDrawerClose } = this.props
    const { id, fullname, status, photo } = data
    const { token } = user
    onDrawerClose()

    this.setState(() => ({
      isLoading: true,
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
        this.setState(() => ({ isLoading: false }))
        triggerDrawer({
          title: 'Driver Content',
          content: (
            <Drawer
              data={dataToShow}
              sendCredentials={this.handleSendCredentials}
            />
          ),
        })
      }
    })
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
        onRowClick={this.handleRowClick}
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
  const loadedUser = getOr({}, 'users.loadedUser')(state)
  const driversList = getOr([], 'drivers')(drivers)
  const error = getOr('', 'message')(drivers)
  const transformedDrivers = transformData(driversList)
  return { drivers: transformedDrivers, user, error, loadedUser }
}

const drawerSettings = { style: {} }
export default InfoDrawer(drawerSettings)(connect(mapStateToProps)(Drivers))
