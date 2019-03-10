import keys from 'lodash/fp/keys'
import every from 'lodash/fp/every'
import filter from 'lodash/fp/filter'
import includes from 'lodash/fp/includes'

const req = ['registration_no', 'description', 'driver_id']

export const verify = busses => {
  const [check] = busses
  const verificationKeys = keys(check)
  return every(key => includes(key)(verificationKeys))(req)
}

export const filterSheet = busses => {
  return busses
}
