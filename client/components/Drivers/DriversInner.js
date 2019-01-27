// lib
import React from 'react'

// src
import EnhancedTable from '../EnhancedTable'
import CreateDriver from '../CreateDriver'
import EditDriver from '../EditDriver'
import LoadingView from '../LoadingView'

const DriversInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteDriver,
  onCreateDriver,
  onUpdateDriver,
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
          tableName={'Drivers'}
          sortKey="fullname"
          rows={rows}
          data={data}
          error={error}
          handleRowClick={onRowClick}
          handleDeleteRow={onDeleteDriver}
          handleCreateRow={onCreateDriver}
          handleEditRow={onUpdateDriver}
        />
        <EditDriver id={editId} open={editDialog} onClose={handleClose} />
        <CreateDriver open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Drivers'} />
    </Otherwise>
  </Choose>
)
export default DriversInner
