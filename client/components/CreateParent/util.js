import trim from 'lodash/fp/trim'

const emailRegex = /^$|^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
const phoneRegex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
export const validate = values => {
  const errors = {}
  const { fullname, password, phone_no, email } = values
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
    errors.phone_no = 'Invalid Phone Number (i.e +XXX..., XXX...)'
  }
  return errors
}

export default { validate }
