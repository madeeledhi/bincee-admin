import keys from 'lodash/fp/keys'
import every from 'lodash/fp/every'
import filter from 'lodash/fp/filter'
import includes from 'lodash/fp/includes'

const req = [
  'fullname',
  'status',
  'photo',
  'grade',
  'shift_morning',
  'shift_evening',
  'parent_id',
  'driver_id',
]

export const verify = students => {
  const [check] = students
  const verificationKeys = keys(check)
  return every(key => includes(key)(verificationKeys))(req)
}

export const filterSheet = students => {
  return filter(student => {
    const { status } = student
    return status === 'Active' || status === 'Inactive'
  })(students)
}
