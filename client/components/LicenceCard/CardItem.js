// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

// src
import styles from './LicenceCard.less'

const CardItem = ({ label, value, unit }) => {
  return (
    <div className={styles.cardItem}>
      <div>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
        <div className={styles.unit}>{unit}</div>
      </div>
    </div>
  )
}
export default CardItem
