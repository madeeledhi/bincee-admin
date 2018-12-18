import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const { start_time, end_time, shift_name } = values
  if (!trim(shift_name)) {
    errors.shift_name = 'Required'
  }
  if (!trim(start_time)) {
    errors.start_time = 'Required'
  }
  if (!trim(end_time)) {
    errors.end_time = 'Required'
  }
  return errors
}

export default { validate }
