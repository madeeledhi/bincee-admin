import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '../Button'
import { Field } from 'redux-form'

//src
import styles from './ForgotPasswordInner.less'
import { renderTextField } from '../shared/reduxFormMaterialUI'
import { renderTabs } from './utils'

const ForgotPasswordInner = ({
  sendLoginDetails,
  onClose,
  onEnter,
  selectedOption,
  onTabChange,
  onCancel,
  disabled,

  ...other
}) => {
  return (
    <Dialog
      onClose={onClose}
      onEnter={onEnter}
      aria-labelledby="simple-dialog-title"
      {...other}
    >
      <DialogTitle id="simple-dialog-title" className={styles.head}>
        {'Forgot Password'}
      </DialogTitle>
      <DialogContent>
        <form className={styles.root}>
          <div className={styles.row}>
            <Field
              id="selectedOption"
              name="selectedOption"
              component={renderTabs}
            />
          </div>
          <Choose>
            <When condition={selectedOption === 'email'}>
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
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordInner
