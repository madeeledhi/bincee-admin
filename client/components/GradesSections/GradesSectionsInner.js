// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import EnhancedTable from '../EnhancedTable'
import CreateGrades from '../CreateGrades'
import EditGrades from '../EditGrades'
import LoadingView from '../LoadingView'
import { createGrade } from '../../actions/grades'

const GradesSectionsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteGrade,
  onCreateGrade,
  onUpdateGrade,
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
          tableName={'Grades & Sections'}
          rows={rows}
          data={data}
          error={error}
          handleRowClick={onRowClick}
          handleDeleteRow={onDeleteGrade}
          handleCreateRow={onCreateGrade}
          handleEditRow={onUpdateGrade}
        />
        <EditGrades id={editId} open={editDialog} onClose={handleClose} />
        <CreateGrades open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Grades & Sections'} />
    </Otherwise>
  </Choose>
)
export default GradesSectionsInner
