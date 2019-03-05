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
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import { lighten } from '@material-ui/core/styles/colorManipulator'

//src
import styles from './EnhancedTableToolbar.less'
import Button from '../../Button'
const EnhancedTableToolbar = props => {
  const {
    numSelected,
    tableName,
    onCreateRow,
    selectedArray,
    onDeleteMutipleRows,
    onDataExport,
  } = props
  // TODO: Bring the content to center in rows just like in the design
  return (
    <Toolbar
      className={`${styles.root} ${
        numSelected > 0 ? styles.selectedBackground : ''
      }`}
    >
      <div className={styles.title}>
        {numSelected > 0 ? (
          <Typography
            color="inherit"
            variant="subtitle1"
            className={`${styles.head} ${styles.headColor}`}
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" className={styles.head}>
            {tableName}
          </Typography>
        )}
      </div>
      <div className={styles.spacer} />
      <div className={styles.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={event => onDeleteMutipleRows(event, selectedArray)}
            >
              <Icon className={styles.deleteIcon} fontSize={'small'}>
                {' '}
                delete
              </Icon>
            </IconButton>
          </Tooltip>
        ) : (
          // <Tooltip title="Create New">
          //   <IconButton aria-label="Filter list" onClick={onCreateRow}>
          //     <Icon className={styles.createIcon} > add_circle</Icon>
          //   </IconButton>
          // </Tooltip>
          <div className={styles.actions}>
            <Button
              style={{ margin: '0 10px' }}
              onClick={e => onDataExport()}
              label={'Export Data'}
            />
            <Button
              style={{ margin: '0 10px' }}
              onClick={onCreateRow}
              label={'Create'}
            />
          </div>
        )}
      </div>
    </Toolbar>
  )
}
export default EnhancedTableToolbar
