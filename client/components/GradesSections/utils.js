import keys from 'lodash/fp/keys'
import every from 'lodash/fp/every'
import includes from 'lodash/fp/includes'

const req = ['grade_name', 'section']

export const verify = grades => {
  const [check] = grades
  const verificationKeys = keys(check)
  return every(key => includes(key)(verificationKeys))(req)
}

export const filterSheet = grades => {
  return grades
}
