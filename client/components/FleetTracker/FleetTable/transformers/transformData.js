import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import sortBy from 'lodash/fp/sortBy'
import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'

function getColumns(fleets) {
  const [first] = fleets
  return flow(
    keys,
    filter(
      key => key !== 'driverDirection'
        && key !== 'enableFleet'
        && key !== 'latitude'
        && key !== 'longitude'
        && key !== 'rideId'
        && key !== 'school_id'
        && key !== 'photo',
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

function getRows(fleets) {
  return flow(
    sortBy('driver_id'),
    map(fleet => ({ ...omit(fleet, 'tableData') })),
  )(fleets)
}

export default fleets => {
  if (size(fleets) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(fleets)
  const rows = getRows(fleets)
  return { columns, rows }
}
export function renameKeyName(obj, oldName, newName) {
  const clone = cloneDeep(obj)
  const keyVal = clone[oldName]

  delete clone[oldName]
  clone[newName] = keyVal

  return clone
}
