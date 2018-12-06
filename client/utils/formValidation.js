import trim from 'lodash/fp/trim'
import * as MSGS from './formValidationsMsgs'

export const isEmptyOrNil = values => {
  const errors = {}
  const { username, password } = values
  if (!trim(username)) {
    errors.username = MSGS.REQUIRED_MESSAGE
  }
  if (!trim(password)) {
    errors.password = MSGS.REQUIRED_MESSAGE
  }
  return errors
}

export const check = () => {}
