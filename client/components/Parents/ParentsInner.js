// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'

const ParentsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteParent,
  onCreateParent,
  onUpdateParent,
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
      </div>
    </When>
    <When condition={error}>
      <div>{error}</div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Parents'} />
    </Otherwise>
  </Choose>
)
export default ParentsInner
