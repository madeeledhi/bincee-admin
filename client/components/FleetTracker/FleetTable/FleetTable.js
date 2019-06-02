// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../../utils'
import FleetTableInner from './FleetTableInner'

class FleetTable extends React.Component {
  state = { isLoading: true }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['drivers'], this.props, nextProps)) {
    }
  }

  render() {
    const { isLoading } = this.state
    const { drivers } = this.props
    const transformD = transformData(drivers)
    const { columns: rows, rows: data } = transformD
    console.log('=====>', transformD)

    return (
      <FleetTableInner
        error={size(data) < 1 ? 'No Record' : ''}
        isLoading={size(drivers) < 1}
        rows={rows}
        data={data}
      />
    )
  }
}

export default FleetTable
