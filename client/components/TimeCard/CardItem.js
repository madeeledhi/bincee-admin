// lib
import React from 'react'

// src
import styles from './TimeCard.less'

const CardItem = ({ label, value, unit, backgroudColor, color }) => {
  return (
    <div
      className={styles.cardItem}
      style={{ backgroundColor: backgroudColor }}
    >
      <div>
        <div className={styles.label}>{label}</div>
        <div className={styles.value} style={{ color }}>
          {value}
        </div>
        <div className={styles.unit}>{unit}</div>
      </div>
    </div>
  )
}
export default CardItem
