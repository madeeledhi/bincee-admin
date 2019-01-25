import trim from 'lodash/fp/trim'

const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/

const phoneRegex = /^[+][0-9]{1,12}$/

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
  if (!emailRegex.test(email)) {
    errors.email = 'Invalid Email'
  }
  if (!phoneRegex.test(phone_no)) {
    errors.phone_no = 'Invalid Phone Number (i.e +XXX...)'
  }
  return errors
}

export default { validate }
