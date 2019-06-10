import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'

// src
import FleetTrackerInner from './FleetTrackerInner'

class FleetTracker extends React.Component {
  state = {
    selectedRows: [],
  }
  // componentWillReceiveProps(nextProps) {
  //   if (hasPropChanged(['drivers'], this.props, nextProps)) {
  //     // const { drivers } = nextProps
  //     // const value = formatLatLngArray(drivers)
  //     // const viewport = getViewPort(value)
  //     // this.setState(() => ({ viewport }))
  //   }
  // }

  handleRowClick = rows => {
    this.setState(() => ({ selectedRows: rows }))
  }

  render() {
    const { drivers } = this.props
    const { selectedRows } = this.state
    return (
      <FleetTrackerInner
        drivers={drivers}
        selectedRows={selectedRows}
        onRowClick={this.handleRowClick}
      />
    )
  }
}
const mapStateToProps = state => {
  const drivers = getOr([], 'firestore.drivers')(state)

  return { drivers }
}

export default connect(mapStateToProps)(FleetTracker)
