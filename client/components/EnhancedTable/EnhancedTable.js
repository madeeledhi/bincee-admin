import React from 'react'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import includes from 'lodash/fp/includes'

//src
import EnhancedTableInner from './EnhanceTableInner'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'

let counter = 0
function createData(name, calories, fat, carbs, protein) {
  counter += 1
  return { id: counter, name, calories, fat, carbs, protein }
}

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)
    const { data = [], rows = [], error = '', sortKey = '' } = props
    this.state = {
      order: 'asc',
      orderBy: sortKey,
      selected: [],
      data,
      page: 0,
      rows,
      rowsPerPage: 5,
      error,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['rows', 'data'], this.props, nextProps)) {
      const { rows, data, error, sortKey } = nextProps
      const { selected: prevSelected } = this.state
      const ids = map(({ id }) => id)(data)
      const selected = filter(id => includes(id)(ids))(prevSelected)
      this.setState(() => ({
        rows,
        data,
        error,
        selected,
        orderBy: sortKey,
      }))
    }
  }

  handleRequestSort = (event, property) => {
    console.log('property: ', property)
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    event.stopPropagation()
    event.preventDefault()
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)

    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
    return false
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  handleDeleteMutipleRows = (event, selectedArray) => {
    const { handleDeleteRow } = this.props
    Promise.all(map(id => handleDeleteRow(event, id))(selectedArray)).then(
      () => {
        // TODO: Use this for isLoading on/off
        console.log('resolved')
      },
    )
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      rows,
    } = this.state
    const {
      handleDeleteRow,
      handleEditRow,
      handleRowClick = () => true,
      handleCreateRow,
      tableName,
    } = this.props

    return (
      <EnhancedTableInner
        tableName={tableName}
        rows={rows}
        data={data}
        order={order}
        orderBy={orderBy}
        selected={selected}
        rowsPerPage={rowsPerPage}
        page={page}
        onSelectAllClick={this.handleSelectAllClick}
        onRequestSort={this.handleRequestSort}
        onClick={this.handleClick}
        onDeleteRow={handleDeleteRow}
        onEditRow={handleEditRow}
        onDeleteMutipleRows={this.handleDeleteMutipleRows}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        onChangePage={this.handleChangePage}
        isRowSelected={this.isSelected}
        onCreateRow={handleCreateRow}
        onRowClick={handleRowClick}
      />
    )
  }
}

export default EnhancedTable
