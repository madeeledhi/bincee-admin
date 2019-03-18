// lib
import React from 'react'

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
  onDataExport,
  createDialog,
  editDialog,
  editId,
  handleClose,
  importData,
  sendCredentials,
  drawerData,
  dataIsAvailable,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Busses'}
          sortKey="registration_no"
          rows={rows}
          data={data}
          error={error}
          onDataImport={importData}
          onDataExport={onDataExport}
          handleRowClick={onRowClick}
          handleDeleteRow={onDeleteBus}
          handleCreateRow={onCreateBus}
          handleEditRow={onUpdateBus}
          drawerData={drawerData}
          sendCredentials={sendCredentials}
          dataIsAvailable={dataIsAvailable}
          enableDrawer
          drawerTitle="Bus Content"
        />
        <EditBus id={editId} open={editDialog} onClose={handleClose} />
        <CreateBus open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView />
    </Otherwise>
  </Choose>
)
export default BussesInner
