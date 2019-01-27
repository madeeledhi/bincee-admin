import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import cloneDeep from 'lodash/cloneDeep'

function getColumns(drivers) {
  const [first] = drivers
  return flow(
    keys,
    filter(
      key => key !== 'school_id' && key !== 'driver_id' && key !== 'photo',
    ),
    reduce((final, key) => {
      const current = first[key]
      const currentKey = key === 'driver_id' ? 'id' : key
      return [
        ...final,
        {
          id: currentKey,
          numeric: false,
          disablePadding: false,
          label: startCase(currentKey),
        },
      ]
    }, []),
  )(first)
}

function getRows(drivers) {
  return map(driver => {
    return renameKeyName(driver, 'driver_id', 'id')
  })(drivers)
}

export default drivers => {
  if (size(drivers) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(drivers)
  const rows = getRows(drivers)
  return { columns, rows }
}

export function renameKeyName(obj, oldName, newName) {
  const clone = cloneDeep(obj)
  const keyVal = clone[oldName]

  delete clone[oldName]
  clone[newName] = keyVal

  return clone
}
