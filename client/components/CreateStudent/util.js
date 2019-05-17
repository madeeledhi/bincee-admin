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
    status,
  } = values
  if (!trim(fullname)) {
    errors.fullname = 'Required'
  }
  if (!trim(grade)) {
    errors.grade = 'Required'
  }
  if (!trim(status)) {
    errors.status = 'Required'
  }
  if (!trim(shift_morning) && !trim(shift_evening)) {
    errors.shift_morning = 'Atleast One Shift Required'
    errors.shift_evening = 'Atleast One Shift Required'
  }
  if (!trim(parent_id)) {
    errors.parent_id = 'Required'
  }
  if (!trim(driver_id)) {
    errors.driver_id = 'Required'
  }
  return errors
}

export default { validate }
