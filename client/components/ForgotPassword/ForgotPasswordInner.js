import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { Field } from 'redux-form'

// src
import styles from './ForgotPasswordInner.less'
import { renderTextField } from '../shared/reduxFormMaterialUI'
import { renderTabs } from './utils'
import LoadingView from '../LoadingView'
import Button from '../Button'

const ForgotPasswordInner = ({
  sendLoginDetails,
  onClose,
  onEnter,
  selected_option,
  onTabChange,
  onCancel,
  disabled,
  isLoading,
  message,
  success,
  ...other
}) => {
  return (
    <Dialog
      onClose={onClose}
      onEnter={onEnter}
      aria-labelledby="simple-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
      {...other}
    >
      <DialogTitle id="simple-dialog-title" className={styles.head}>
        {'Forgot Password'}
      </DialogTitle>
      <DialogContent>
        <Choose>
          <When condition={isLoading}>
            <LoadingView message="Resseting" style={{ minHeight: 300 }} />
          </When>
          <When condition={success && message}>
            <div>
              <h1>Password Reset Successfully</h1>
              <p>{message}</p>
              <Button
                onClick={onCancel}
                label="OK"
                style={{ backgroundColor: '#0adfbd', borderColor: '#0adfbd' }}
              />
            </div>
          </When>
          <When condition={!success && message}>
            <div>
              <h1>Password Reset Failed</h1>
              <p>{message}</p>
              <Button
                onClick={onCancel}
                label="OK"
                style={{ backgroundColor: '#0adfbd', borderColor: '#0adfbd' }}
              />
            </div>
          </When>
          <Otherwise>
            <form className={styles.root}>
              <div className={styles.row}>
                <Field
                  id="selected_option"
                  name="selected_option"
                  component={renderTabs}
                />
              </div>
              <div className={styles.row}>
                <Field
                  id="username"
                  name="username"
                  component={renderTextField}
                  label="Enter your Username"
                  disabled={false}
                  variant="outlined"
                  className={styles.item}
                />
              </div>
              <Choose>
                <When condition={selected_option === 'email'}>
                  <div className={styles.row}>
                    <Field
                      id="email"
                      name="email"
                      component={renderTextField}
                      label="Enter your Email"
                      disabled={false}
                      variant="outlined"
                      className={styles.item}
                    />
                  </div>
                </When>
                <Otherwise>
                  <div className={styles.row}>
                    <Field
                      id="phone"
                      name="phone_no"
                      component={renderTextField}
                      label="Enter your Phone No"
                      disabled={false}
                      variant="outlined"
                      className={styles.item}
                    />
                  </div>
                </Otherwise>
              </Choose>
              <div className={styles.row}>
                <div className={styles.item}>
                  <Button
                    disabled={disabled}
                    onClick={sendLoginDetails}
                    label="Verify"
                    style={{
                      backgroundColor: '#0adfbd',
                      borderColor: '#0adfbd',
                    }}
                  />
                  <Button
                    onClick={onCancel}
                    label="Cancel"
                    style={{
                      backgroundColor: '#ff4747',
                      borderColor: '#ff4747',
                    }}
                  />
                </div>
              </div>
            </form>
          </Otherwise>
        </Choose>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordInner
