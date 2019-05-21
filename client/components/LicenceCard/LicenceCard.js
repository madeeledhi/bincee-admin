// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import CardItem from './CardItem'

// src
import styles from './LicenceCard.less'

const LicenceCard = ({ details }) => {
  const { Total, Active, Inactive, Title } = details
  return (
    <Card className={styles.card}>
      <CardHeader
        classes={{ title: styles.cardHeaderText }}
        avatar={
          <img
            src={`/images/${Title === 'App Licences' ? 'copy' : 'bus'}.png`}
          />
        }
        title={Title}
        className={styles.cardHeader}
      />

      <CardContent className={styles.cardContent}>
        <div className={styles.divider} />
        <div className={styles.cardContentdiv}>
          <CardItem
            label="Total"
            value={Total}
            unit="Licences"
            backgroudColor="#eafaff"
            color="#06b9ed"
          />
          <CardItem
            label="Active"
            value={Active}
            unit="Licences"
            backgroudColor="#b8ffe4"
            color="#0fde8e"
          />
          <CardItem
            label="Inactive"
            value={Inactive}
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
