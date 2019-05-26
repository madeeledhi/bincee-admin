// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardItem from './CardItem'

// src
import styles from './EmailCard.less'

const EmailCard = ({ details, trialInfo }) => {
  const { total, active, inactive, title } = details
  return (
    <Card className={styles.emailCard}>
      <CardHeader
        classes={{ title: styles.cardHeaderText }}
        avatar={
          <img
            src={`/images/bus.png`}
          />
        }
        title={title}
        className={styles.cardHeader}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.divider} />
        <div className={styles.email}>
          Feature Not Available
            </div>
      </CardContent>
    </Card>

  )
}
export default EmailCard
