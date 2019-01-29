// lib
import React from 'react'

// src
import EnhancedTable from '../EnhancedTable'
import CreateParent from '../CreateParent'
import EditParent from '../EditParent'
import LoadingView from '../LoadingView'

const ParentsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteParent,
  onCreateParent,
  onUpdateParent,
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
          tableName={'Parents'}
          sortKey="fullname"
          rows={rows}
          data={data}
          error={error}
          handleRowClick={onRowClick}
          handleDeleteRow={onDeleteParent}
          handleCreateRow={onCreateParent}
          handleEditRow={onUpdateParent}
        />
        <EditParent id={editId} open={editDialog} onClose={handleClose} />
        <CreateParent open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Parents'} />
    </Otherwise>
  </Choose>
)
export default ParentsInner
