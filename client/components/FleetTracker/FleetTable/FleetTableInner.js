// lib
import React from 'react'
import MaterialTable, {
  MTableToolbar,
  MTableHeader,
  MTableBody,
} from 'material-table'
// src
import BlankState from '../../EnhancedTable/BlankState'
import LoadingView from '../../LoadingView'
import styles from './FleetTableInner.less'

const FleetTableInner = ({ error, isLoading, rows, data, onRowClick }) => {
  return (
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
          title="Fleets"
          columns={rows}
          data={data}
          //   onRowClick={onRowClick}
          onSelectionChange={onRowClick}
          options={{
            selection: true,
            // rowStyle: rowData => ({
            //   backgroundColor:
            //     selectedRow && selectedRow.tableData.id === rowData.tableData.id
            //       ? '#EEE'
            //       : '#FFF',
            // }),
          }}
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
              Body: () => (
                <div className={styles.body}>
                  <BlankState />
                </div>
              ),
              Pagination: () => <div />,
            }}
            title="Fleets"
          />
        </div>
      </When>
      <Otherwise>
        <LoadingView />
      </Otherwise>
    </Choose>
  )
}
export default FleetTableInner
