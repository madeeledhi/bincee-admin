import React from 'react'
import trim from 'lodash/fp/trim'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styles from './ForgotPasswordInner.less'

const emailRegex = /^$|^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/

const phoneRegex = /^[+][0-9]{1,12}$/

export const validate = values => {
  const errors = {}
  const { phone_no, email, selected_option, username } = values

  if (!emailRegex.test(email) && selected_option === 'email') {
    errors.email = 'Invalid Email'
  }
  if (!phoneRegex.test(phone_no) && selected_option === 'phone') {
    errors.phone_no = 'Invalid Phone Number (i.e +XXX...)'
  }
  if (!trim(email) && selected_option === 'email') {
    errors.email = 'Required'
  }

  if (!trim(username)) {
    errors.username = 'Required'
  }

  if (!trim(phone_no) && selected_option === 'phone') {
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
