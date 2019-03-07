import React from 'react'
import styles from './styles.less'

const Button = ({
  className,
  marginStyle,
  label,
  style,
  onClick,
  disabled,
  type = '',
}) => {
  return (
    <Choose>
      <When condition={type === 'file'}>
        <div style={{ display: 'flex' }}>
          <input
            type="file"
            name="file"
            id="file"
            className={styles.inputText}
            onChange={disabled ? () => {} : onClick}
          />
          <label for="file" className={styles.inputLabel}>
            {label}
          </label>
        </div>

        {/* <input
            type="file"
            className={styles.buttonText}
            style={marginStyle}
          /> */}
      </When>
      <Otherwise>
        <div
          style={style}
          className={`${styles.buttonClass} ${disabled ? styles.disable : ''}`}
          onClick={disabled ? () => {} : onClick}
        >
          <div className={styles.buttonText} style={marginStyle}>
            {label}
          </div>
        </div>
      </Otherwise>
    </Choose>
  )
}
export default Button
