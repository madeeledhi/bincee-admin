// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

// src
import styles from './LicenceCard.less'

const CardItem = ({ label, value, unit }) => {
  return (
    <Card className={styles.cardItem}>
      <CardContent>
        <div className={styles.container}>
          <div className={styles.label}>{label}</div>
          <div className={styles.value}>{value}</div>
          <div className={styles.unit}>{unit}</div>
        </div>
      </CardContent>
    </Card>
  )
}
export default CardItem
