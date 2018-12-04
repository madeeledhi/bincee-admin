import {
  isEmpty,
  isNil,
  anyPass

} from 'ramda'
import * as MSGS from './formValidationsMsgs'

export const isEmptyOrNil = anyPass([isEmpty, isNil])

export const required = value => isEmptyOrNil(value) ? MSGS.REQUIRED_MESSAGE : undefined
