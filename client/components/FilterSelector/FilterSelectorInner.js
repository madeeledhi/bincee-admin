// lib
import React from 'react'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Icon from '@material-ui/core/Icon'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

// src
import Button from '../Button'
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
    <div className={styles.row}>
      <FormControl className={styles.item}>
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
        /></FormControl>

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
            <FormControl className={styles.item}>
              <TextField
                label={`Search `}
                onChange={onSearchChange}
                variant="outlined"
                className={styles.textField}
                type="search"
                margin="dense"
              /></FormControl>
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
          <div className={styles.row}>
            <div className={styles.item}>
              <Button
                style={{
                  backgroundColor: '#07b9ed',
                  borderColor: '#07b9ed',
                }}
                marginStyle={{ margin: '4px 22px' }}
                onClick={onApplyFilter}
                label={'Apply'}
              />
              <Button
                style={{
                  backgroundColor: '#ff4747',
                  borderColor: '#ff4747',
                }}
                marginStyle={{ margin: '4px 22px' }}
                onClick={onMenuClose}
                label={'Cancel'}
              />
            </div>
          </div>
        </div>
      </Popover>
    </div>
  )
}
export default FilterSelectorInner
