import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const {
    fullname,
    grade,
    shift_morning,
    shift_evening,
    parent_id,
    driver_id,
  } = values
  if (!trim(fullname)) {
    errors.fullname = 'Required'
  }
  if (!trim(grade)) {
    errors.grade = 'Required'
  }
  if (!trim(shift_morning) && !trim(shift_evening)) {
    errors.shift_morning = 'Atleast One Shift Required'
    errors.shift_evening = 'Atleast One Shift Required'
  }
  if (!trim(parent_id)) {
    errors.shift = 'Required'
  }
  if (!trim(driver_id)) {
    errors.shift = 'Required'
  }
  return errors
}

export default { validate }
