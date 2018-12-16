import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import cloneDeep from 'lodash/cloneDeep'

function getColumns(leaves) {
  const [first] = leaves
  return flow(
    keys,
    filter(key => key !== 'id' && key !== 'school_id'),
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

function getRows(leaves) {
  return leaves
}

export default leaves => {
  if (size(leaves) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(leaves)
  const rows = getRows(leaves)
  return { columns, rows }
}
export function renameKeyName(obj, oldName, newName) {
  const clone = cloneDeep(obj)
  const keyVal = clone[oldName]

  delete clone[oldName]
  clone[newName] = keyVal

  return clone
}
