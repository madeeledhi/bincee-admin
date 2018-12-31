import React from 'react'
import trim from 'lodash/fp/trim'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styles from './ForgotPasswordInner.less'

const emailRegex = /^$|^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
const phoneRegex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/

export const validate = values => {
  const errors = {}
  const { phone_no, email, selectedOption } = values

  if (!emailRegex.test(email) && selectedOption === 'email') {
    errors.email = 'Invalid Email'
  }
  if (!phoneRegex.test(phone_no) && selectedOption === 'phone') {
    errors.phone_no = 'Invalid Phone Number (i.e +XXX..., XXX...)'
  }
  if (!trim(email) && selectedOption === 'email') {
    errors.email = 'Required'
  }

  if (!trim(phone_no) && selectedOption === 'phone') {
    errors.phone_no = 'Required'
  }

  return errors
}

export const renderTabs = ({ input, classes }) => (
  <Tabs
    value={input.value}
    onChange={(event, value) => input.onChange(value)}
    indicatorColor="primary"
    textColor="primary"
    variant="fullWidth"
    centered
    classes={{ indicator: styles.indicator }}
  >
    <Tab
      classes={{ selected: styles.tabText }}
      label="By Email"
      value={'email'}
    />
    <Tab
      classes={{ selected: styles.tabText }}
      label="By Phone No"
      value={'phone'}
    />
  </Tabs>
)

export default { validate, renderTabs }
