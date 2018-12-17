// lib
import React from 'react'


import EnhancedTable from '../EnhancedTable'
import CreateShifts from '../CreateShifts'
import EditShift from '../EditShift'
import LoadingView from '../LoadingView'

const ShiftsAndTimingsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteShift,
  onCreateShift,
  onUpdateShift,
  onRowClick,
  createDialog,
  editDialog,
  editId,
  handleClose,
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
      <EditShift id={editId} open={editDialog} onClose={handleClose} />
      <CreateShifts open={createDialog} onClose={handleClose} />
    </When>
    <Otherwise>
      <LoadingView message={'Loading Shifts'} />
    </Otherwise>
  </Choose>
)
export default ShiftsAndTimingsInner
