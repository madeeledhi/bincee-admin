import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'

function getColumns(leaves) {
  const [first] = leaves
  return flow(
    keys,
    filter(
      key =>
        key !== 'school_id' &&
        key !== 'parent_id' &&
        key !== 'driver_id' &&
        key !== 'status' &&
        key !== 'found' &&
        key !== 'photo',
    ),
    reduce((final, key) => {
      const current = first[key]
      return [
        ...final,
        {
          numeric: false,
          disablePadding: false,
          title: startCase(key),
          field: key,
        },
      ]
    }, []),
  )(first)
}

function getRows(leaves) {
  return map(leave => {
    const from_date = moment(leave.from_date).format('ll')
    const to_date = moment(leave.to_date).format('ll')
    return { ...omit(leave, 'tableData'), from_date, to_date }
  })(leaves)
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
