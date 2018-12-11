// lib
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import Button from '../Button'
import styles from './Profile.less'

const ProfileInner = props => {
  const {handleUpdate, handleCancel, disabled, isLoading} = props
  return (
    <form className={styles.root}>
       <div className={styles.row}>
        <Field
          id="name"
          name="name"
          component={renderTextField}
          label="Name"
          disabled={false}
          variant="outlined"
          className={styles.item}
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
          className={styles.item}
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
          className={styles.item}
        />
      </div>
      <div className={styles.row}>
          <div className={styles.item}>
            <Button
              disabled={disabled}
              onClick={handleUpdate}
              label="Update"
              style={{ backgroundColor: '#0adfbd', borderColor: '#0adfbd' }}
            />
            <Button
              onClick={handleCancel}
              label="Cancel"
              style={{ backgroundColor: '#ff4747', borderColor: '#ff4747' }}
            />
          </div>
        </div>
    </form>
  )
}
export default ProfileInner
