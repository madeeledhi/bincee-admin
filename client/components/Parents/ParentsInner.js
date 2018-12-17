// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

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
          rows={rows}
          data={data}
          error={error}
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
