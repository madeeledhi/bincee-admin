import trim from 'lodash/fp/trim'
import equals from 'lodash/fp/equals'

export const validate = values => {
  const errors = {}
  const { current_password,  new_password,  re_enter_password, } = values
  if (!trim(current_password)) {
    errors.current_password = 'Required'
  }
  if (!trim(new_password)) {
    errors.new_password = 'Required'
  }
  if (!trim(re_enter_password)) {
    errors.re_enter_password = 'Required'
  }
  if (!equals(re_enter_password, new_password)) {
    errors.new_password = "Passwords Don't Match"
    errors.re_enter_password = "Passwords Don't Match"
  }
  return errors
}