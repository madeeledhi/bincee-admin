import trim from 'lodash/fp/trim'

const emailRegex = /^$|^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/

const phoneRegex = /^[+][0-9]{1,12}$/
export const validate = values => {
  const errors = {}
  const { fullname, phone_no, email, status } = values
  if (!trim(fullname)) {
    errors.fullname = 'Required'
  }
  if (!trim(phone_no)) {
    errors.phone_no = 'Required'
  }
  if (!emailRegex.test(email)) {
    errors.email = 'Invalid Email'
  }
  if (!phoneRegex.test(phone_no)) {
    errors.phone_no = 'Invalid Phone Number (i.e +XXX...)'
  }
  if (!trim(status)) {
    errors.status = 'Required'
  }
  return errors
}

export default { validate }
