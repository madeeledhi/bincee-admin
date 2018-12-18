import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const { fullname, password, phone_no } = values
  if (!trim(fullname)) {
    errors.fullname = 'Required'
  }
  if (!trim(password)) {
    errors.password = 'Required'
  }
  if (!trim(phone_no)) {
    errors.phone_no = 'Required'
  }
  return errors
}

export default { validate }
