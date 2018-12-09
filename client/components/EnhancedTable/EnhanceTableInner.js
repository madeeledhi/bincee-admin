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
import toLower from 'lodash/toLower'

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
                    className={styles.row}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={() => onRowClick(n)}
                  >
                  {/* TODO: change the color on selction of row */}
                    <TableCell padding="checkbox" className={styles.tableText}>
                      <Checkbox
                        checked={isSelected}
                        onClick={event => onClick(event, n.id)}
                        className={styles.checkbox}
                      />
                    </TableCell>

                    {times(i => (
                      <TableCell
                        component="th"
                        scope="row"
                        className={styles.tableText}
                      >
                        <Choose>
                          <When condition={rows[i]['id'] === 'status'}>
                            <span
                              className={
                                toLower(n[`${rows[i]['id']}`]) === 'active'
                                  ? styles.status
                                  : styles.inactive
                              }
                            >
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
                      <TableCell
                        padding="checkbox"
                        component="th"
                        scope="row"
                        className={styles.action}
                      >
                        <IconButton
                          aria-label="Filter list"
                          onClick={event => onEditRow(event, n.id)}
                        >
                          <Icon className={styles.editIcon} fontSize={'small'}>
                            {' '}
                            edit
                          </Icon>
                        </IconButton>
                        <IconButton
                          aria-label="Filter list"
                          onClick={event => onDeleteRow(event, n.id)}
                        >
                          <Icon className={styles.deleteIcon} fontSize={'small'} > delete</Icon>
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>
      {/* TODO: check if this could be styled */}
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
        className={styles.spacer}
      />
    </Paper>
  )
}
export default EnhancedTableInner
