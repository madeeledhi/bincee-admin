// lib
import React from 'react'
import size from 'lodash/fp/size'

// src
import styles from './FleetTrackerInner.less'
import FleetMap from './FleetMap/FleetMap'
import FleetTable from './FleetTable/FleetTable'

const FleetTrackerInner = ({ drivers, onRowClick, selectedRows }) => {
  const filteredDrivers = size(selectedRows) > 0 ? selectedRows : drivers

  return (
    <div className={styles.root}>
      <div className={styles.mapContainer}>
        <FleetMap drivers={filteredDrivers} selectedRows={selectedRows} />
      </div>
      <div className={styles.tableContainer}>
        <FleetTable
          drivers={drivers}
          onRowClick={onRowClick}
          selectedRows={selectedRows}
        />
      </div>
    </div>
  )
}
export default FleetTrackerInner
