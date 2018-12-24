// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import { loadParents, deleteParent, loadSingleUser } from '../../actions'
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
          credentials: { username, password },
          parent: { id, fullname, status, photo, email, address, phone_no },
        }
        this.setState(() => ({ isLoading: false }))
        triggerDrawer({
          title: 'Parent Content',
          content: <Drawer data={dataToShow} />,
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
  const error = getOr('', 'message')(parents)
  const transformedParents = transformData(parentsList)
  return { parents: transformedParents, user, error }
}

const drawerSettings = { style: {} }
export default InfoDrawer(drawerSettings)(connect(mapStateToProps)(Parents))
