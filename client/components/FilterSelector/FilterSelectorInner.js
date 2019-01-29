// lib
import React from 'react'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Icon from '@material-ui/core/Icon'
import InputAdornment from '@material-ui/core/InputAdornment'

// src
import styles from './FilterSelectorInner.less'

const FilterSelectorInner = ({
  selectAll,
  selectedValues,
  filtersValues,
  filterName,
  onApplyFilter,
  onSelectChange,
  onChangeAll,
  selectedCount,
  onMenuOpen,
  anchorEl,
  onMenuClose,
  onSearchChange,
  selectedTab,
  onTabChange,
}) => {
  const open = Boolean(anchorEl)
  const filterLabel = startCase(filterName)
  return (
    <div>
      <TextField
        label={filterLabel}
        onClick={onMenuOpen}
        className={styles.filterField}
        value={`(${selectedCount}) Selected`}
        aria-owns={open ? 'filter-popover' : undefined}
        aria-haspopup="true"
        variant="outlined"
        margin="dense"
        disabled
        InputProps={{
          classes: { input: styles.input },
          endAdornment: (
            <InputAdornment position="end">
              <Icon>arrow_drop_down</Icon>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ className: styles.filterFieldLabel }}
      />

      <Popover
        id="filter-popover"
        anchorEl={anchorEl}
        open={open}
        onClose={onMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={styles.root}>
          <div className={styles.row}>
            <TextField
              label={`Search `}
              onChange={onSearchChange}
              variant="outlined"
              className={styles.textField}
              type="search"
              margin="dense"
            />
          </div>
          <div className={styles.row}>
            <Tabs
              value={selectedTab}
              onChange={onTabChange}
              indicatorColor="primary"
              textColor="primary"
              className={styles.tabs}
              classes={{ indicator: styles.indicator }}
            >
              <Tab
                classes={{ root: styles.tab, selected: styles.tabText }}
                label="ALL"
                value={'all'}
              />
              <Tab
                classes={{ root: styles.tab, selected: styles.tabText }}
                label={`SELECTED (${selectedCount})`}
                value={'selected'}
              />
            </Tabs>
          </div>
          <div className={styles.row}>
            <List className={styles.filterList}>
              <Choose>
                <When condition={selectedTab === 'all'}>
                  <ListItem classes={{ root: styles.listItem }}>
                    <Checkbox
                      classes={{ root: styles.checkBox }}
                      checked={selectAll}
                      onChange={onChangeAll}
                      icon={<Icon className={styles.unChecked}>check</Icon>}
                      checkedIcon={
                        <Icon className={styles.checked}>check</Icon>
                      }
                    />
                    <ListItemText
                      primary={'ALL'}
                      classes={{
                        root: styles.listItemTextRoot,
                        primary: styles.listItemText,
                      }}
                    />
                  </ListItem>
                  {map(val => {
                    return (
                      <ListItem classes={{ root: styles.listItem }}>
                        <Checkbox
                          classes={{ root: styles.checkBox }}
                          checked={selectedValues.indexOf(val) > -1}
                          onChange={onSelectChange}
                          value={val}
                          icon={<Icon className={styles.unChecked}>check</Icon>}
                          checkedIcon={
                            <Icon className={styles.checked}>check</Icon>
                          }
                        />
                        <ListItemText
                          primary={val}
                          classes={{
                            root: styles.listItemTextRoot,
                            primary: styles.listItemText,
                          }}
                        />
                      </ListItem>
                    )
                  })(filtersValues)}
                </When>
                <Otherwise>
                  {map(val => {
                    return (
                      <ListItem classes={{ root: styles.listItem }}>
                        <Checkbox
                          classes={{ root: styles.checkBox }}
                          checked={selectedValues.indexOf(val) > -1}
                          onChange={onSelectChange}
                          value={val}
                          icon={<Icon className={styles.unChecked}>check</Icon>}
                          checkedIcon={
                            <Icon className={styles.checked}>check</Icon>
                          }
                        />
                        <ListItemText
                          classes={{
                            root: styles.listItemTextRoot,
                            primary: styles.listItemText,
                          }}
                          primary={val}
                        />
                      </ListItem>
                    )
                  })(selectedValues)}
                </Otherwise>
              </Choose>
            </List>
          </div>
          <div className={styles.buttonGroup}>
            <Button
              color="primary"
              variant="contained"
              className={styles.applyButton}
              onClick={onApplyFilter}
            >
              Apply
            </Button>
            <Button
              color="secondary"
              variant="contained"
              className={styles.cancelButton}
              onClick={onMenuClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  )
}
export default FilterSelectorInner
