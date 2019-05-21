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
        // avatar={
        //   <Avatar aria-label="Recipe" className={styles.avatar}>
        //     L
        //   </Avatar>
        // }
        title={Title}
        className={styles.cardHeader}
      />

      <CardContent className={styles.cardContent}>
        <div className={styles.divider} />
        <div className={styles.cardContentdiv}>
          <CardItem label={'Total'} value={Total} unit={'Licences'} />
          <CardItem label={'Active'} value={Active} unit={'Licences'} />
          <CardItem label={'Inactive'} value={Inactive} unit={'Licences'} />
        </div>
      </CardContent>
    </Card>
  )
}
export default LicenceCard
