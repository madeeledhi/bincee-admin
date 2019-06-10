import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import MapGL, { Marker, Popup } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'

// src
import FleetTrackerInner from './FleetTrackerInner'

import { formatLatLngArray, getViewPort } from './Utils'
import { hasPropChanged } from '../../utils'

class FleetTracker extends React.Component {
  state = {
    selectedRow: null,
  }
  // componentWillReceiveProps(nextProps) {
  //   if (hasPropChanged(['drivers'], this.props, nextProps)) {
  //     // const { drivers } = nextProps
  //     // const value = formatLatLngArray(drivers)
  //     // const viewport = getViewPort(value)
  //     // this.setState(() => ({ viewport }))
  //   }
  // }

  handleRowClick = (event, data) => {
    const { selectedRow } = this.state

    const currentRow = data === selectedRow ? null : data
    this.setState(() => ({ selectedRow: currentRow }))
  }

  render() {
    const { drivers } = this.props
    const { selectedRow } = this.state
    console.log(drivers)
    return (
      <FleetTrackerInner
        drivers={drivers}
        selectedRow={selectedRow}
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
