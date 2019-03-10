import keys from 'lodash/fp/keys'
import every from 'lodash/fp/every'
import filter from 'lodash/fp/filter'
import includes from 'lodash/fp/includes'

const req = ['fullname', 'phone_no', 'status']

export const verify = drivers => {
  const [check] = drivers
  const verificationKeys = keys(check)
  return every(key => includes(key)(verificationKeys))(req)
}

export const filterSheet = drivers => {
  return filter(driver => {
    const { status } = driver
    return status === 'Active' || status === 'Inactive'
  })(drivers)
}
