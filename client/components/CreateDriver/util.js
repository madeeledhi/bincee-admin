import trim from 'lodash/fp/trim'

const phoneRegex = /^[+][0-9]{1,12}$/

export const validate = values => {
  const errors = {}
  const { fullname, password, phone_no } = values
  if (!trim(fullname)) {
    errors.fullname = 'Required'
  }
  if (!trim(phone_no)) {
    errors.phone_no = 'Required'
  }
  if (!phoneRegex.test(phone_no)) {
    errors.phone_no = 'Invalid Phone Number (i.e +XXX...)'
  }
  return errors
}

export default { validate }
