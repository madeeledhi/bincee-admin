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
  handleCreateGrade,
  handleUpdateGrade,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          rows={rows}
          data={data}
          error={error}
          handleDeleteRow={onDeleteGrade}
          handleCreateRow={handleCreateGrade}
          handleEditRow={handleUpdateGrade}
        />
      </div>
    </When>
    <When condition={error}>
      <div>{error}</div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Grades & Sections'} />
    </Otherwise>
  </Choose>
)
export default GradesSectionsInner
