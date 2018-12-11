// lib
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import styles from './Profile.less'

const ProfileInner = props => {
  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <Field
          id="name"
          name="name"
          component={renderTextField}
          label="Name"
          disabled={false}
          variant="outlined"
        />
      </div>
      <div className={styles.row}>
        <Field
          id="phone_no"
          name="phone_no"
          component={renderTextField}
          label="Phone No"
          disabled={false}
          variant="outlined"
        />
      </div>
      <div className={styles.row}>
        <Field
          id="address"
          name="address"
          component={renderTextField}
          label="Address"
          disabled={false}
          variant="outlined"
        />
      </div>
    </div>
  )
}
export default ProfileInner
