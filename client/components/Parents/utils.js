import keys from 'lodash/fp/keys'
import every from 'lodash/fp/every'
import filter from 'lodash/fp/filter'
import includes from 'lodash/fp/includes'

const req = ['fullname', 'address', 'phone_no', 'email', 'status']

export const verify = parents => {
  const [check] = parents
  const verificationKeys = keys(check)
  return every(key => includes(key)(verificationKeys))(req)
}

export const filterSheet = parents => {
  return filter(parent => {
    const { status } = parent
    return status === 'Active' || status === 'Inactive'
  })(parents)
}
