// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import EnhancedTable from '../EnhancedTable'
import CreateBus from '../CreateBus'
import EditBus from '../EditBus'
import LoadingView from '../LoadingView'

const BussesInner = ({
  error,
  isLoading,
  rows,
  data,
  onRowClick,
  onDeleteBus,
  onCreateBus,
  onUpdateBus,
  createDialog,
  editDialog,
  editId,
  handleClose,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Busses'}
          rows={rows}
          data={data}
          error={error}
          handleRowClick={onRowClick}
          handleDeleteRow={onDeleteBus}
          handleCreateRow={onCreateBus}
          handleEditRow={onUpdateBus}
        />
        <EditBus id={editId} open={editDialog} onClose={handleClose} />
        <CreateBus open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Busses'} />
    </Otherwise>
  </Choose>
)
export default BussesInner
