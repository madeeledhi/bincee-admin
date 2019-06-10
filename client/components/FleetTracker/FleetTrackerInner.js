// lib
import React from 'react'
import filter from 'lodash/fp/filter'

// src
import styles from './FleetTrackerInner.less'
import FleetMap from './FleetMap/FleetMap'
import FleetTable from './FleetTable/FleetTable'

const FleetTrackerInner = ({ drivers, onRowClick, selectedRow }) => {
  const filteredDrivers = selectedRow
    ? filter(({ driver_id }) => driver_id === selectedRow.driver_id)(drivers)
    : drivers
  console.log('filteredDrivers', filteredDrivers, drivers, selectedRow)
  return (
    <div className={styles.root}>
      <div className={styles.mapContainer}>
        <FleetMap drivers={filteredDrivers} selectedRow={selectedRow} />
      </div>
      <div className={styles.tableContainer}>
        <FleetTable
          drivers={drivers}
          onRowClick={onRowClick}
          selectedRow={selectedRow}
        />
      </div>
    </div>
  )
}
export default FleetTrackerInner
