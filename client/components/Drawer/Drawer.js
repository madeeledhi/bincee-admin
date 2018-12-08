// lib
import React from 'react'

// src
import styles from './Drawer.less'
const Drawer = props => {
  const { data } = props
  return (
    <div className={styles.main}>
      <h4 className={styles.heading}>H  eading</h4>
      <div>
        <label className={styles.label}>First Key : </label>
        <span className={styles.keyValue}>Key value</span>
      </div>
      <div>
        <label className={styles.label}>Second Key : </label>
        <span className={styles.keyValue}>Second value</span>
      </div>
    </div>
  )
}
export default Drawer
