import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'

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
    const { start_time, end_time } = shift
    return {
      ...renameKeyName(shift, 'shift_id', 'id'),
      start_time: moment(start_time, 'hh:mm:ss').format('hh:mm A'),
      end_time: moment(end_time, 'hh:mm:ss').format('hh:mm A'),
    }
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
