// lib
import React from 'react'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'

const ShiftsAndTimingsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteShift,
  onCreateShift,
  onUpdateShift,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Shifts & Timings'}
          rows={rows}
          data={data}
          error={error}
          handleDeleteRow={onDeleteShift}
          handleCreateRow={onCreateShift}
          handleEditRow={onUpdateShift}
        />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Shifts'} />
    </Otherwise>
  </Choose>
)
export default ShiftsAndTimingsInner
