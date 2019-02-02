// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import find from 'lodash/fp/find'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import {
  loadParents,
  deleteParent,
  loadSingleUser,
  showErrorMessage,
  sendCredentials,
} from '../../actions'
import ParentsInner from './ParentsInner'
import InfoDrawer from '../InfoDrawer'
import Drawer from '../Drawer'

class Parents extends React.Component {
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
      dispatch(loadParents({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'parents'], this.props, nextProps)) {
      const { dispatch, user, parents, error } = nextProps
      const { token } = user
      if (size(parents) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadParents({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  handleDeleteParent = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    this.setState(() => ({ isLoading: true }))
    dispatch(deleteParent({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      dispatch(loadParents({ token }))
    })
  }

  handleCreateParent = () => {
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateParent = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadParents({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  handleSendCredentials = () => {
    const { loadedUser, parents, user, dispatch } = this.props
    const { id, username, password } = loadedUser
    const { token } = user
    const { rows } = parents
    const { email } = find(({ id: userId }) => id === userId)(rows)
    dispatch(
      sendCredentials({
        username,
        password,
        email,
        phone_no: '',
        type: 'Parent',
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
    const { id, fullname, status, photo, email, address, phone_no } = data
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
          credentials: { username, password, hasCredentials: true },
          parent: {
            id,
            fullname,
            status,
            photo,
            email,
            address,
            phone_no,
            isParent: true,
          },
        }
        this.setState(() => ({ isLoading: false }))
        triggerDrawer({
          title: 'Parent Content',
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
    const { parents } = this.props
    const { columns: rows, rows: data } = parents

    return (
      <ParentsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onRowClick={this.handleRowClick}
        onDeleteParent={this.handleDeleteParent}
        onCreateParent={this.handleCreateParent}
        onUpdateParent={this.handleUpdateParent}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = state => {
  const parents = getOr({}, 'parents')(state)
  const user = getOr({}, 'user')(state)
  const parentsList = getOr([], 'parents')(parents)
  const loadedUser = getOr({}, 'users.loadedUser')(state)
  const error = getOr('', 'message')(parents)
  const transformedParents = transformData(parentsList)
  return { parents: transformedParents, user, error, loadedUser }
}

const drawerSettings = { style: {} }
export default InfoDrawer(drawerSettings)(connect(mapStateToProps)(Parents))
