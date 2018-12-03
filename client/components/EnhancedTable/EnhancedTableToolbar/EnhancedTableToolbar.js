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

const EnhancedTableToolbar = props => {
  const { numSelected, tableName } = props

  return (
    <Toolbar className={styles.root}>
      <div className={styles.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {tableName}
          </Typography>
        )}
      </div>
      <div className={styles.spacer} />
      <div className={styles.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <Icon> delete</Icon>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Create New">
            <IconButton aria-label="Filter list">
              <Icon> add_circle</Icon>
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  )
}
export default EnhancedTableToolbar
