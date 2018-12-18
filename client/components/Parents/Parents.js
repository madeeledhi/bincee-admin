// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import { loadParents, deleteParent } from '../../actions'
import ParentsInner from './ParentsInner'

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
    dispatch(deleteParent({ id, token })).then(({ payload }) => {
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

  handleDeleteMutipleParents = selectedArray => {
    const { dispatch, user } = this.props
    const { token } = user
    map(id => dispatch(deleteParent({ id, token })))(selectedArray)
    dispatch(loadParents({ token }))
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
export default connect(mapStateToProps)(Parents)
