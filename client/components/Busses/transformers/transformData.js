import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import cloneDeep from 'lodash/cloneDeep'

function getColumns(busses) {
  const [first] = busses
  return flow(
    keys,
    filter(key => key !== 'id' && key !== 'driver_id'),
    reduce((final, key) => {
      const current = first[key]
      return [
        ...final,
        {
          id: key,
          numeric: false,
          disablePadding: false,
          label: startCase(key),
        },
      ]
    }, []),
  )(first)
}

function getRows(busses) {
  return map(bus => {
    return renameKeyName(bus, 'id', 'id')
  })(busses)
}

export default busses => {
  if (size(busses) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(busses)
  const rows = getRows(busses)
  return { columns, rows }
}
export function renameKeyName(obj, oldName, newName) {
  const clone = cloneDeep(obj)
  const keyVal = clone[oldName]

  delete clone[oldName]
  clone[newName] = keyVal

  return clone
}

export function transformDrawerData(data) {
  const { bus, driver } = data
  const { registration_no, description } = bus
  const { fullname, phone_no, photo, status } = driver
  return {
    bus: {
      registration_no,
      description,
    },
    driver: {
      fullname,
      phone_no,
      photo,
      status,
    },
  }
}
