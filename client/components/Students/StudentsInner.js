// lib
import React from 'react'

// src
import EnhancedTable from '../EnhancedTable'
import CreateStudent from '../CreateStudent'
import EditStudent from '../EditStudent'
import LoadingView from '../LoadingView'

const StudentsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteStudent,
  onRowClick,
  onCreateStudent,
  onUpdateStudent,
  createDialog,
  editDialog,
  editId,
  handleClose,
  onDataExport,
  importData,
  extras,
  sendCredentials,
  drawerData,
  dataIsAvailable,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Students'}
          sortKey="fullname"
          rows={rows}
          data={data}
          error={error}
          extras={extras}
          onDataImport={importData}
          onDataExport={onDataExport}
          handleDeleteRow={onDeleteStudent}
          handleCreateRow={onCreateStudent}
          handleEditRow={onUpdateStudent}
          handleRowClick={onRowClick}
          drawerData={drawerData}
          sendCredentials={sendCredentials}
          dataIsAvailable={dataIsAvailable}
          enableDrawer
          drawerTitle="Student Content"
        />
        <EditStudent id={editId} open={editDialog} onClose={handleClose} />
        <CreateStudent open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView />
    </Otherwise>
  </Choose>
)
export default StudentsInner
