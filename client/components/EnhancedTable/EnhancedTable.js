import React from 'react'
import size from 'lodash/fp/size'

//src
import EnhancedTableInner from './EnhanceTableInner'
import { hasPropChanged } from '../../utils'

let counter = 0
function createData(name, calories, fat, carbs, protein) {
  counter += 1
  return { id: counter, name, calories, fat, carbs, protein }
}

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)
    const { data = [], rows = [], error = '' } = props
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data,
      page: 0,
      rows,
      rowsPerPage: 5,
      error,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('rows', this.props, nextProps)) {
      const { rows, data, error } = nextProps
      this.setState(() => ({ rows, data, error }))
    }
  }

  handleRequestSort = (event, property) => {
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
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
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
    console.log('data: ', order, orderBy, selected, data, rows)
    return (
      <Choose>
        <When condition={size(rows) > 0}>
          <EnhancedTableInner
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
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            onChangePage={this.handleChangePage}
            isRowSelected={this.isSelected}
          />
        </When>
        <Otherwise>
          <div>{'No Data Available'}</div>
        </Otherwise>
      </Choose>
    )
  }
}

export default EnhancedTable
