import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const { name, address, phone_no } = values
  if (!trim(name)) {
    errors.name = 'Required'
  }
  if (!trim(address)) {
    errors.address = 'Required'
  }
  if (!trim(phone_no)) {
    errors.phone_no = 'Required'
  }
  return errors
}