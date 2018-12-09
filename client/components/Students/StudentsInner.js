// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'

const StudentsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteStudent,
  onCreateStudent,
  onUpdateStudent,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Students'}
          rows={rows}
          data={data}
          error={error}
          handleDeleteRow={onDeleteStudent}
          handleCreateRow={onCreateStudent}
          handleEditRow={onUpdateStudent}
        />
      </div>
    </When>
    <When condition={error}>
      <div>{error}</div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Students'} />
    </Otherwise>
  </Choose>
)
export default StudentsInner
