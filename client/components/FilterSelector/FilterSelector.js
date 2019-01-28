// libs
import React from 'react'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import filter from 'lodash/fp/filter'
import remove from 'lodash/fp/remove'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import lowerCase from 'lodash/fp/lowerCase'
import isNil from 'lodash/fp/isNil'
import uniq from 'lodash/fp/uniq'
import isEqual from 'lodash/fp/isEqual'

// src
import { hasPropChanged } from '../../utils'
import { updateAnnouncementFilters } from '../../actions'
import FilterSelectorInner from './FilterSelectorInner'

function getFilterValues(data, filterName) {
  return flow(
    map(value => `${value[filterName]}`),
    filter(val => !(isNil(val) || val === '' || lowerCase(val) === 'not set')),
    array => uniq(array),
  )(data)
}

class FilterSelector extends React.Component {
  state = {
    selectedValues: [],
    filtersValues: [],
    filterName: '',
    selectAll: false,
    anchorEl: null,
    selectedCount: 0,
    selectedTab: 'all',
    data: [],
  }

  componentDidMount() {
    const { data, filterName, savedFilters, filterKey } = this.props
    const selectedValues = getOr([], `${filterKey}.selectedValues`)(
      savedFilters,
    )
    const filterData = getFilterValues(data, filterName)
    this.setState(() => ({
      filtersValues: filterData,
      data: filterData,
      filterName,
      selectedValues,
      selectedCount: size(selectedValues),
    }))
  }

  componentWillReceiveProps(nextProps) {
    if (
      hasPropChanged(
        ['savedFilters', 'data', 'filterName', 'filterKey'],
        this.props,
        nextProps,
      )
    ) {
      const { data, filterName, savedFilters, filterKey } = nextProps
      const selectedValues = getOr([], `${filterKey}.selectedValues`)(
        savedFilters,
      )
      const filterData = getFilterValues(data, filterName)
      this.setState(() => ({
        filtersValues: filterData,
        data: filterData,
        filterName,
        selectedValues,
        selectedCount: size(selectedValues),
      }))
    }
  }

  handleChangeAll = event => {
    const { filtersValues } = this.state
    const value = event.target.checked ? filtersValues : []
    const selectAll = event.target.checked
    this.setState(() => ({
      selectedValues: value,
      selectAll,
      selectedCount: size(value),
    }))
  }

  handleSelectChange = event => {
    const { selectedValues, data } = this.state
    const isChecked = event.target.checked
    const value = `${event.target.value}`
    if (!isChecked) {
      const newSelectedValues = remove(val => val === value)(selectedValues)
      this.setState(() => ({
        selectedValues: newSelectedValues,
        selectAll: false,
        selectedCount: size(newSelectedValues),
      }))
    } else {
      const newSelectedValues = [value, ...selectedValues]

      const selectAll = size(newSelectedValues) === size(data)
      this.setState(() => ({
        selectedValues: newSelectedValues,
        selectAll,
        selectedCount: size(newSelectedValues),
      }))
    }
  }

  handleSearchChange = event => {
    const { selectedValues, data } = this.state
    const { target } = event
    const { value } = target
    const searchResult = filter(val => val.indexOf(value) !== -1)(data)
    const selectAll = size(selectedValues) === size(data)
    this.setState(() => ({
      filtersValues: searchResult,
      selectAll,
      selectedCount: size(selectedValues),
    }))
  }

  handleTabChange = (event, value) => {
    this.setState(() => ({
      selectedTab: value,
    }))
  }

  handleMenuOpen = event => {
    const anchorEl = event.currentTarget
    this.setState({ anchorEl })
  }

  handleMenuClose = () => {
    const { data, filterName, savedFilters, filterKey } = this.props
    const selectedValues = getOr([], `${filterKey}.selectedValues`)(
      savedFilters,
    )
    const selectAll = size(selectedValues) === size(data)
    this.setState({
      anchorEl: null,
      selectedCount: size(selectedValues),
      selectedValues,
      selectAll,
    })
  }

  handleApplyFilter = () => {
    const { selectedValues } = this.state
    const { savedFilters, dispatch, filterKey } = this.props

    const config = {
      ...savedFilters,
      [filterKey]: {
        id: filterKey,
        operator: '=',
        selectedValues,
      },
    }
    const filters = { filters: config }
    if (!isEqual(savedFilters)(config)) {
      dispatch(updateAnnouncementFilters(filters))
    }
    this.setState({ anchorEl: null })
  }

  render() {
    const {
      selectedValues,
      filtersValues,
      selectAll,
      filterName,
      anchorEl,
      selectedCount,
      selectedTab,
    } = this.state

    return (
      <FilterSelectorInner
        selectAll={selectAll}
        anchorEl={anchorEl}
        selectedTab={selectedTab}
        selectedCount={selectedCount}
        selectedValues={selectedValues}
        filtersValues={filtersValues}
        filterName={filterName}
        onApplyFilter={this.handleApplyFilter}
        onSelectChange={this.handleSelectChange}
        onChangeAll={this.handleChangeAll}
        onMenuOpen={this.handleMenuOpen}
        onMenuClose={this.handleMenuClose}
        onSearchChange={this.handleSearchChange}
        onTabChange={this.handleTabChange}
      />
    )
  }
}

export default FilterSelector
