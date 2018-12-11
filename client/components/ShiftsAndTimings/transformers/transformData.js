import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import cloneDeep from 'lodash/cloneDeep'

function getColumns(shifts) {
  const [first] = shifts
  return flow(
    keys,
    filter(key => key !== 'shift_id' && key !== 'school_id'),
    reduce((final, key) => {
      const current = first[key]
      return [
        ...final,
        {
          id: key,
          numeric: typeof current === 'number',
          disablePadding: false,
          label: startCase(key),
        },
      ]
    }, []),
  )(first)
}

function getRows(shifts) {
  return map(shift => {
    return renameKeyName(shift, 'shift_id', 'id')
  })(shifts)
}

export default shifts => {
  if (size(shifts) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(shifts)
  const rows = getRows(shifts)
  return { columns, rows }
}

export function renameKeyName(obj, oldName, newName) {
  const clone = cloneDeep(obj)
  const keyVal = clone[oldName]

  delete clone[oldName]
  clone[newName] = keyVal

  return clone
}