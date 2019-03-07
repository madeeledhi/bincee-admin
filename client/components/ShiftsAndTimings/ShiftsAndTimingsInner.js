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
  createDialog,
  editDialog,
  editId,
  handleClose,
  onDataExport,
  importData,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Shifts & Timings'}
          sortKey="shift_name"
          rows={rows}
          data={data}
          error={error}
          onDataExport={onDataExport}
          onDataImport={importData}
          handleDeleteRow={onDeleteShift}
          handleCreateRow={onCreateShift}
          handleEditRow={onUpdateShift}
        />
      </div>
      <EditShift id={editId} open={editDialog} onClose={handleClose} />
      <CreateShifts open={createDialog} onClose={handleClose} />
    </When>
    <Otherwise>
      <LoadingView />
    </Otherwise>
  </Choose>
)
export default ShiftsAndTimingsInner
