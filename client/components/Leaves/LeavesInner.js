// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import MaterialTable from 'material-table'
import MTableToolbar from 'material-table/dist/m-table-toolbar'
// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'
import styles from './LeavesInner.less'

const LeavesInner = ({ error, isLoading, rows, data }) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <MaterialTable
          components={{
            Toolbar: props => (
              <MTableToolbar
                classes={{ root: styles.root, title: styles.head }}
                title={'Leaves'}
                {...props}
              />
            ),
          }}
          columns={rows}
          data={data}
        />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Leaves'} />
    </Otherwise>
  </Choose>
)
export default LeavesInner
