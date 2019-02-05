import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import sortBy from 'lodash/fp/sortBy'
import cloneDeep from 'lodash/cloneDeep'

function getColumns(parents) {
  const [first] = parents
  return flow(
    keys,
    filter(
      key =>
        key !== 'school_id' &&
        key !== 'parent_id' &&
        key !== 'photo' &&
        key !== 'lat' &&
        key !== 'lng',
    ),
    reduce((final, key) => {
      const current = first[key]

      const currentKey = key === 'parent_id' ? 'id' : key
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

function getRows(parents) {
  return flow(
    sortBy('parent_id'),
    map(parent => {
      return renameKeyName(parent, 'parent_id', 'id')
    }),
  )(parents)
}

export default parents => {
  if (size(parents) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(parents)
  const rows = getRows(parents)
  return { columns, rows }
}
export function renameKeyName(obj, oldName, newName) {
  const clone = cloneDeep(obj)
  const keyVal = clone[oldName]
  delete clone[oldName]
  clone[newName] = keyVal

  return clone
}
