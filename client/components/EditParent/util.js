import trim from 'lodash/fp/trim'

export const validate = values => {
  const errors = {}
  const { fullname, phone_no } = values
  if (!trim(fullname)) {
    errors.fullname = 'Required'
  }
  if (!trim(phone_no)) {
    errors.phone_no = 'Required'
  }
  return errors
}

export default { validate }
