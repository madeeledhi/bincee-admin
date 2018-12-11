import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const { fullname, grade, shift, parent_id, driver_id } = values
  if (!trim(fullname)) {
    errors.fullname = 'Required'
  }
  if (!trim(grade)) {
    errors.grade = 'Required'
  }
  if (!trim(shift)) {
    errors.shift = 'Required'
  }
  if (!trim(parent_id)) {
    errors.shift = 'Required'
  }
  if (!trim(driver_id)) {
    errors.shift = 'Required'
  }
  return errors
}
