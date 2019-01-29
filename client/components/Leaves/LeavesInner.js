// lib
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import MaterialTable from 'material-table'
import {
  MTableToolbar,
  MTableHeader,
  MTableCell,
  MTableBody,
} from 'material-table'
// src
import BlankState from '../EnhancedTable/BlankState'
import LoadingView from '../LoadingView'
import styles from './LeavesInner.less'

const LeavesInner = ({ error, isLoading, rows, data }) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <MaterialTable
        components={{
          Toolbar: props => (
            <MTableToolbar
              classes={{
                root: styles.root,
                title: styles.head,
                actions: styles.actions,
              }}
              {...props}
            />
          ),
          Header: props => (
            <div className={styles.heading}>
              <MTableHeader {...props} />
            </div>
          ),
          Body: props => (
            <div className={styles.body}>
              <MTableBody {...props} />
            </div>
          ),
        }}
        title={'Leaves'}
        columns={rows}
        data={data}
      />
    </When>

    <When condition={error && !isLoading}>
      <div style={{ height: 575, overflow: 'hidden' }}>
        <MaterialTable
          components={{
            Toolbar: props => (
              <MTableToolbar
                classes={{
                  root: styles.root,
                  title: styles.head,
                  actions: styles.actions,
                }}
                {...props}
              />
            ),
            Header: props => (
              <div style={{ display: 'none' }}>
                <MTableHeader {...props} />
              </div>
            ),
            Body: props => (
              <div className={styles.body}>
                <BlankState />
              </div>
            ),
            Pagination: props => <div />,
          }}
          title={'Leaves'}
        />
      </div>
    </When>
    <Otherwise>
      <LoadingView message={'Loading Leaves'} />
    </Otherwise>
  </Choose>
)
export default LeavesInner
