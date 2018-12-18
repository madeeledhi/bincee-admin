import React from 'react'
import styles from './styles.less'

export const LoginButton = ({ label, style, onClick, disabled }) => {
  return (
    <div
      style={style}
      className={`${styles.postion} ${styles.buttonClass} ${
        disabled ? styles.disable : ''
      }`}
      onClick={disabled ? () => {} : onClick}
    >
      <div className={styles.loginText}>{label}</div>
    </div>
  )
}
