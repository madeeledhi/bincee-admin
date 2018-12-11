// lib
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import Button from '../Button'
import styles from './Security.less'

const SecurityInner = props => {
  const {handleUpdate, handleCancel, disabled, isLoading} = props
  return (
    <form className={styles.root}>
       <div className={styles.row}>
        <Field
          id="current_password"
          name="current_password"
          component={renderTextField}
          label="Current Password"
          disabled={false}
          variant="outlined"
          type={'password'}
          className={styles.item}
        />
      </div>
      <div className={styles.row}>
        <Field
          id="new_password"
          name="new_password"
          component={renderTextField}
          label="New Password"
          disabled={false}
          variant="outlined"
          type={'password'}
          className={styles.item}
        />
      </div>
      <div className={styles.row}>
        <Field
          id="re_enter_password"
          name="re_enter_password"
          component={renderTextField}
          label="Re Enter Pasword"
          disabled={false}
          type={'password'}
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
export default SecurityInner
