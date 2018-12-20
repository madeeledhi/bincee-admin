// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import MaterialTable from 'material-table'
import { MTableToolbar } from 'material-table'
// src
import EnhancedTable from '../EnhancedTable'
import LoadingView from '../LoadingView'
import styles from './LeavesInner.less'

const LeavesInner = ({ error, isLoading, rows, data }) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <MaterialTable
        components={{
          Toolbar: props => (
            <MTableToolbar
              classes={{ root: styles.root, title: styles.head }}
              {...props}
            />
          ),
        }}
        title={'Leaves'}
        columns={rows}
        data={data}
      />
    </When>
    <Otherwise>
      <LoadingView message={'Loading Leaves'} />
    </Otherwise>
  </Choose>
)
export default LeavesInner
