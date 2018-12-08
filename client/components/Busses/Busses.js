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
import { loadAllBus, deleteBus } from '../../actions'
import BussesInner from './BussesInner'

class Busses extends React.Component {
  state = { error: '', isLoading: true }

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

  handleDeleteBus = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(deleteBus({ id, token })).then(({ payload }) => {
      dispatch(loadAllBus({ token }))
    })
  }

  handleCreateBus = () => {
    const { dispatch } = this.props
    dispatch(push('/dashboard/busses/create'))
  }

  handleUpdateBus = (event, id) => {
    const { dispatch } = this.props
    dispatch(push(`/dashboard/busses/edit/${id}`))
  }

  handleDeleteMutipleBusses = selectedArray => {
    const { dispatch, user } = this.props
    const { token } = user
    map(id => dispatch(deleteBus({ id, token })))(selectedArray)
    dispatch(loadAllBus({ token }))
  }

  render() {
    const { error, isLoading } = this.state
    const { busses } = this.props
    const { columns: rows, rows: data } = busses

    return (
      <BussesInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onDeleteBus={this.handleDeleteBus}
        onCreateBus={this.handleCreateBus}
        onUpdateBus={this.handleUpdateBus}
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
  return { busses: transformedBusses, user, error }
}
export default connect(mapStateToProps)(Busses)
