// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardItem from './CardItem'

// src
import styles from './LicenceCard.less'

const LicenceCard = ({ details }) => {
  const { total, active, inactive, title } = details
  return (
    <Card className={styles.card}>
      <CardHeader
        classes={{ title: styles.cardHeaderText }}
        avatar={
          <img
            src={`/images/${title === 'App Licences' ? 'copy' : 'bus'}.png`}
          />
        }
        title={title}
        className={styles.cardHeader}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.divider} />
        <div className={styles.cardContentdiv}>
          <CardItem
            label="Total"
            value={total}
            unit="Licences"
            backgroudColor="#eafaff"
            color="#06b9ed"
          />
          <CardItem
            label="Active"
            value={active}
            unit="Licences"
            backgroudColor="#b8ffe4"
            color="#0fde8e"
          />
          <CardItem
            label="Inactive"
            value={inactive}
            unit="Licences"
            backgroudColor="#ffe1e5"
            color="#ff4560"
          />
        </div>
      </CardContent>
    </Card>
  )
}
export default LicenceCard
