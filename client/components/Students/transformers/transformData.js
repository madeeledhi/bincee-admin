import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import startCase from 'lodash/fp/startCase'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import cloneDeep from 'lodash/cloneDeep'

function getColumns(students) {
  const [first] = students
  return flow(
    keys,
    filter(
      key =>
        key !== 'school_id' &&
        key !== 'photo' &&
        key !== 'driver_id' &&
        key !== 'parent_id' &&
        key !== 'grade' &&
        key !== 'shift_morning' &&
        key !== 'id' &&
        key !== 'shift_evening',
    ),
    reduce((final, key) => {
      const current = first[key]
      return [
        ...final,
        {
          id: key,
          numeric: false,
          disablePadding: false,
          label:
            key === 'shift_morning_name'
              ? 'Pickup Shift Name'
              : key === 'shift_evening_name'
              ? 'Dropoff Shift Name'
              : startCase(key),
        },
      ]
    }, []),
  )(first)
}

function getRows(students) {
  return students
}

export default students => {
  if (size(students) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(students)
  const rows = getRows(students)
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
  const { student, driver, parent, grade, shiftMorning, shiftEvening } = data
  const {
    fullname: parentName,
    photo: parentPhoto,
    phone_no: parentPhone,
    address: parentAddress,
    email: parentEmail,
    status: parentStatus,
  } = parent
  const {
    fullname: driverName,
    phone_no: driverPhone,
    photo: driverPhoto,
    status: driverStatus,
  } = driver
  const { grade_name, section, grade_section } = grade
  return {
    student,
    driver: {
      fullname: driverName,
      phone_no: driverPhone,
      photo: driverPhoto,
      status: driverStatus,
      isDriver: true,
    },
    parent: {
      fullname: parentName,
      email: parentEmail,
      photo: parentPhoto,
      address: parentAddress,
      phone_no: parentPhone,
      status: parentStatus,
      isParent: true,
    },
    grade: { grade_name, grade_section, section },
    shiftPickup: shiftMorning,
    shiftDropoff: shiftEvening,
  }
}
