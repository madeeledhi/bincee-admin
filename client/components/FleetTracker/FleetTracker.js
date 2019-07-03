import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import uniqWith from 'lodash/fp/uniqWith'
import flow from 'lodash/fp/flow'

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
  const drivers = flow(
    getOr([], 'firestore.drivers'),
    uniqWith(
      ({ latitude: cx, longitude: cy }, { latitude: px, longitude: py }) => cx === px && cy === py,
    ),
  )(state)
  return { drivers }
}

export default connect(mapStateToProps)(FleetTracker)
