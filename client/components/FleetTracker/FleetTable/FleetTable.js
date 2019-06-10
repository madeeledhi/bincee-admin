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
  state = { transformedData: {} }

  componentDidMount() {
    const { drivers } = this.props
    if (size(drivers) > 0) {
      const transformedData = transformData(drivers)
      this.setState(() => ({ transformedData }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['drivers'], this.props, nextProps)) {
      const { drivers: preDrivers } = this.props
      if (size(preDrivers) < 1) {
        const { drivers } = nextProps
        const transformedData = transformData(drivers)
        this.setState(() => ({ transformedData }))
      }
    }
  }

  render() {
    const { transformedData } = this.state
    const { drivers, onRowClick, selectedRows } = this.props
    const { columns: rows, rows: data } = transformedData

    return (
      <FleetTableInner
        error={size(data) < 1 ? 'No Record' : ''}
        isLoading={size(drivers) < 1}
        rows={rows}
        data={data}
        onRowClick={onRowClick}
        selectedRows={selectedRows}
      />
    )
  }
}

export default FleetTable
