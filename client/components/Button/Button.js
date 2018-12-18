import React from 'react'
import styles from './styles.less'

const Button = ({ className, label, style, onClick, disabled }) => {
  return (
    <div
      style={style}
      className={`${styles.buttonClass} ${disabled ? styles.disable : ''}`}
      onClick={disabled ? () => {} : onClick}
    >
      <div className={styles.buttonText}>{label}</div>
    </div>
  )
}
export default Button
