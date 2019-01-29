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
          handleDeleteRow={onDeleteStudent}
          handleCreateRow={onCreateStudent}
          handleEditRow={onUpdateStudent}
          handleRowClick={onRowClick}
        />
        <EditStudent id={editId} open={editDialog} onClose={handleClose} />
        <CreateStudent open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Students'} />
    </Otherwise>
  </Choose>
)
export default StudentsInner
