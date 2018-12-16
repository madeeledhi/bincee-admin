// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import MaterialTable from 'material-table'

// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'

const LeavesInner = ({ error, isLoading, rows, data }) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <MaterialTable title={'Leaves'} columns={rows} data={data} />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Leaves'} />
    </Otherwise>
  </Choose>
)
export default LeavesInner
