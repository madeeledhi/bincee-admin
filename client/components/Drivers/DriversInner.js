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
  onDataExport,
  importData,
  sendCredentials,
  drawerData,
  dataIsAvailable,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName="Drivers"
          sortKey="fullname"
          rows={rows}
          data={data}
          error={error}
          onDataImport={importData}
          onDataExport={onDataExport}
          handleRowClick={onRowClick}
          handleDeleteRow={onDeleteDriver}
          handleCreateRow={onCreateDriver}
          handleEditRow={onUpdateDriver}
          drawerData={drawerData}
          sendCredentials={sendCredentials}
          dataIsAvailable={dataIsAvailable}
          enableDrawer
          drawerTitle="Driver Content"
        />
        <EditDriver id={editId} open={editDialog} onClose={handleClose} />
        <CreateDriver open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView />
    </Otherwise>
  </Choose>
)
export default DriversInner
