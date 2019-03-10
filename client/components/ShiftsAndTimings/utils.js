import keys from 'lodash/fp/keys'
import every from 'lodash/fp/every'
import filter from 'lodash/fp/filter'
import includes from 'lodash/fp/includes'

const req = ['shift_name', 'type', 'start_time', 'end_time']

export const verify = shifts => {
  const [check] = shifts
  const verificationKeys = keys(check)
  return every(key => includes(key)(verificationKeys))(req)
}

export const filterSheet = shifts => {
  return filter(shift => {
    const { type } = shift
    return type === 'Pickup' || type === 'Dropoff'
  })(shifts)
}
