import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const { name, address, phone_no, email } = values
  if (!trim(name)) {
    errors.name = 'Required'
  }
  if (!trim(address)) {
    errors.address = 'Required'
  }
  if (!trim(phone_no)) {
    errors.phone_no = 'Required'
  }
  if (!trim(email)) {
    errors.email = 'Required'
  }
  return errors
}

export default { validate }
