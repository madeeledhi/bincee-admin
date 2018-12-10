// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'

const DriversInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteDriver,
  onCreateDriver,
  onUpdateDriver,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Drivers'}
          rows={rows}
          data={data}
          error={error}
          handleDeleteRow={onDeleteDriver}
          handleCreateRow={onCreateDriver}
          handleEditRow={onUpdateDriver}
        />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Drivers'} />
    </Otherwise>
  </Choose>
)
export default DriversInner
