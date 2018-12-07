import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import times from 'lodash/fp/times'
import size from 'lodash/fp/size'

//src
import styles from './EnhanceTableInner.less'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import { desc, stableSort, getSorting } from './utils'
import { editGrade } from '../../actions'

const EnhancedTableInner = props => {
  const {
    rows,
    data,
    order,
    orderBy,
    selected,
    rowsPerPage,
    page,
    onSelectAllClick,
    onRequestSort,
    onClick,
    onChangeRowsPerPage,
    onChangePage,
    isRowSelected,
    onEditRow,
    onDeleteRow,
    onCreateRow,
    onDeleteMutipleRows,
    hasButtons = true,
    tableName,
    onRowClick,
  } = props

  return (
    <Paper className={styles.root}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selectedArray={selected}
        tableName={tableName}
        onCreateRow={onCreateRow}
        onDeleteMutipleRows={onDeleteMutipleRows}
      />
      <div className={styles.tableWrapper}>
        <Table className={styles.table} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={onSelectAllClick}
            onRequestSort={onRequestSort}
            rowCount={data.length}
            rows={rows}
          />
          <TableBody>
            {stableSort(data, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(n => {
                const isSelected = isRowSelected(n.id)
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={() => onRowClick(n)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onClick={event => onClick(event, n.id)}
                      />
                    </TableCell>

                    {times(i => (
                      <TableCell component="th" scope="row">
                        <Choose>
                          <When condition={rows[i]['id'] === 'status'}>
                            <span className={styles.status}>
                              {n[`${rows[i]['id']}`]}
                            </span>
                          </When>
                          <Otherwise>
                            <span>{n[`${rows[i]['id']}`]}</span>
                          </Otherwise>
                        </Choose>
                      </TableCell>
                    ))(size(rows))}
                    {hasButtons && (
                      <TableCell padding="checkbox" component="th" scope="row">
                        <IconButton
                          aria-label="Filter list"
                          onClick={event => onEditRow(event, n.id)}
                        >
                          <Icon> edit</Icon>
                        </IconButton>
                        <IconButton
                          aria-label="Filter list"
                          onClick={event => onDeleteRow(event, n.id)}
                        >
                          <Icon> delete</Icon>
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  )
}
export default EnhancedTableInner
