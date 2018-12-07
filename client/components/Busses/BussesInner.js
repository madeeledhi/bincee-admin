// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'

const BussesInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteBus,
  onCreateBus,
  onUpdateBus,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Busses'}
          rows={rows}
          data={data}
          error={error}
          handleDeleteRow={onDeleteBus}
          handleCreateRow={onCreateBus}
          handleEditRow={onUpdateBus}
        />
      </div>
    </When>
    <When condition={error}>
      <div>{error}</div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Busses'} />
    </Otherwise>
  </Choose>
)
export default BussesInner
