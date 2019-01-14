// libs
import React from 'react'
import { connect } from 'react-redux'
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
import FilterSelectorInner from './FilterSelectorInner'

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

  componentWillReceiveProps(nextProps) {
    if (
      hasPropChanged(
        ['savedFilters', 'data', 'filterName'],
        this.props,
        nextProps,
      )
    ) {
      const { data, filterName, savedFilters } = nextProps
      const selectedValues = getOr([], `${filterName}.selectedValues`)(
        savedFilters,
      )
      const filterData = getFilterValues(data, filterName)
      this.setState(() => ({
        filtersValues: filterData,
        data: filterData,
        filterName: filterName,
        selectedValues: selectedValues,
        selectedCount: size(selectedValues),
      }))
    }
  }

  componentDidMount() {
    const { data, filterName, savedFilters } = this.props
    const selectedValues = getOr([], `${filterName}.selectedValues`)(
      savedFilters,
    )
    const filterData = getFilterValues(data, filterName)
    this.setState(() => ({
      filtersValues: filterData,
      data: filterData,
      filterName: filterName,
      selectedValues: selectedValues,
      selectedCount: size(selectedValues),
    }))
  }
  handleChangeAll = event => {
    const { filtersValues } = this.state
    const value = event.target.checked ? filtersValues : []
    const selectAll = event.target.checked
    this.setState(() => ({
      selectedValues: value,
      selectAll: selectAll,
      selectedCount: size(value),
    }))
  }

  handleSelectChange = event => {
    const { filtersValues, selectedValues, data } = this.state
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

      const selectAll = size(newSelectedValues) === size(data) ? true : false
      this.setState(() => ({
        selectedValues: newSelectedValues,
        selectAll: selectAll,
        selectedCount: size(newSelectedValues),
      }))
    }
  }

  handleSearchChange = event => {
    const { filtersValues, selectedValues, data } = this.state
    const value = event.target.value
    const searchResult = filter(val => val.indexOf(value) !== -1)(data)
    const selectAll = size(selectedValues) === size(data) ? true : false
    this.setState(() => ({
      filtersValues: searchResult,
      selectAll: selectAll,
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
    this.setState({ anchorEl: anchorEl })
  }

  handleMenuClose = () => {
    const { data, filterName, savedFilters } = this.props
    const selectedValues = getOr([], `${filterName}.selectedValues`)(
      savedFilters,
    )
    const selectAll = size(selectedValues) === size(data) ? true : false
    this.setState({
      anchorEl: null,
      selectedCount: size(selectedValues),
      selectedValues,
      selectAll,
    })
  }

  handleApplyFilter = () => {
    const { selectedValues, filterName } = this.state
    const { onApply, savedFilters } = this.props

    const config = {
      ...savedFilters,
      [filterName]: {
        id: filterName,
        operator: '=',
        selectedValues: selectedValues,
      },
    }

    if (!isEqual(savedFilters)(config)) {
      console.log(config)
      onApply(config)
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

function getFilterValues(data, filterName) {
  return flow(
    map(value => `${value[filterName]}`),
    filter(val => !(isNil(val) || val === '' || lowerCase(val) === 'not set')),
    array => uniq(array),
  )(data)
}
