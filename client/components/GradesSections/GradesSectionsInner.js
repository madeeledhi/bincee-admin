// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'

const GradesSectionsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteGrade,
  onCreateGrade,
  onUpdateGrade,
  onRowClick,
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
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Grades & Sections'} />
    </Otherwise>
  </Choose>
)
export default GradesSectionsInner
