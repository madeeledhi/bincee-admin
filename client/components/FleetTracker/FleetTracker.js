import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import MapGL, { Marker, Popup } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'

// src
import BusPin from './BusPin/BusPin'
import MarkerInfo from './MarkerInfo/MarkerInfo'
import FleetMap from './FleetMap/FleetMap'
import FleetTable from './FleetTable/FleetTable'
import styles from './FleetTracker.less'
import { formatLatLngArray, getViewPort } from './Utils'
import { hasPropChanged } from '../../utils'

class FleetTracker extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['drivers'], this.props, nextProps)) {
      // const { drivers } = nextProps
      // const value = formatLatLngArray(drivers)
      // const viewport = getViewPort(value)
      // this.setState(() => ({ viewport }))
    }
  }

  render() {
    const { drivers } = this.props
    console.log(drivers)
    return (
      <div className={styles.root}>
        <div className={styles.mapContainer}>
          <FleetMap drivers={drivers} />
        </div>
        <div className={styles.tableContainer}>
          <FleetTable drivers={drivers} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const drivers = getOr([], 'firestore.drivers')(state)

  return { drivers }
}

export default connect(mapStateToProps)(FleetTracker)
