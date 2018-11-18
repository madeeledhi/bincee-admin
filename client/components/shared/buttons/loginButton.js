import React from 'react'
import styles from './styles.less'
export const LoginButton = ({ label, style, onClick }) => {
  return (
    <div
      style={style}
      className={`${styles.postion} ${styles.buttonClass}`}
      onClick={onClick}
    >
      <div className={styles.loginText}>{label}</div>
    </div>
  )
}
