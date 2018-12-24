// lib
import React from 'react'
import { Field } from 'redux-form'
// src
import { renderTextField } from '../shared/reduxFormMaterialUI'
import Button from '../Button'
import MapPicker from '../MapPicker'
import styles from './Profile.less'

const ProfileInner = props => {
  const {
    handleUpdate,
    handleCancel,
    disabled,
    isLoading,
    defaultPosition,
    handlePositionChange,
  } = props
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
          id="email"
          name="email"
          component={renderTextField}
          label="Email"
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
        <MapPicker
          height={500}
          width={500}
          defaultPosition={defaultPosition}
          zoom={16}
          onChange={val => {
            handlePositionChange(val)
          }}
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
