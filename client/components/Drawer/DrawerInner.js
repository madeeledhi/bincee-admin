// lib
import React from 'react'
import Avatar from '@material-ui/core/Avatar'

// src
import styles from './Drawer.less'

const displayData = (data) => {
  return (
    <div className={styles.keyConainer}>
      <label className={styles.label}>First Key : </label>
      <span className={styles.keyValue}>Key value</span>
    </div>
  )
}
//TODO: handle the data and display it on the styled fields help needed

const DrawerInner = props => {
  const { data, handleData } = props
  handleData(data)
  return (
    <div className={styles.main}>
      <Avatar alt="Remy Sharp" src="/images/profile.png" className={styles.avatar} />
      <h4 className={styles.heading}>Heading</h4>
      <div className={styles.keyConainer}>
        <label className={styles.label}>First Key : </label>
        <span className={styles.keyValue}>Key value</span>
      </div>
      <div className={styles.keyConainer}>
        <label className={styles.label}>Second Key : </label>
        <span className={styles.keyValue}>Second value</span>
      </div>
    </div>
  )
}
export default DrawerInner
