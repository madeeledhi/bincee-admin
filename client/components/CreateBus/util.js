import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const { registration_no, driver_id } = values
  if (!trim(registration_no)) {
    errors.registration_no = 'Required'
  }
  if (!trim(driver_id)) {
    errors.driver_id = 'Required'
  }
  return errors
}
