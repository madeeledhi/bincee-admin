import React from 'react'

//src
import EnhancedTableInner from './EnhanceTableInner'

let counter = 0
function createData(name, calories, fat, carbs, protein) {
  counter += 1
  return { id: counter, name, calories, fat, carbs, protein }
}

const rows = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
]

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Donut', 452, 25.0, 51, 4.9),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
      createData('Honeycomb', 408, 3.2, 87, 6.5),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Jelly Bean', 375, 0.0, 94, 0.0),
      createData('KitKat', 518, 26.0, 65, 7.0),
      createData('Lollipop', 392, 0.2, 98, 0.0),
      createData('Marshmallow', 318, 0, 81, 2.0),
      createData('Nougat', 360, 19.0, 9, 37.0),
      createData('Oreo', 437, 18.0, 63, 4.0),
    ],
    page: 0,
    rowsPerPage: 5,
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
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
      <EnhancedTableInner
        rows={rows}
        data={data}
        order={order}
        orderBy={orderBy}
        selected={selected}
        rowsPerPage={rowsPerPage}
        page={page}
        emptyRows={emptyRows}
        onSelectAllClick={this.handleSelectAllClick}
        onRequestSort={this.handleRequestSort}
        onClick={this.handleClick}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        onChangePage={this.handleChangePage}
        isRowSelected={this.isSelected}
      />
    )
  }
}

export default EnhancedTable
