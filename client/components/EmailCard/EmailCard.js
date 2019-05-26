// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

// src
import styles from './EmailCard.less'

const EmailCard = ({ emailInfo }) => {
  return (
    <Card className={styles.emailCard}>
      <CardHeader
        classes={{ title: styles.cardHeaderText }}
        avatar={<img src={`/images/mail.png`} />}
        title="Email Credential Status"
        className={styles.cardHeader}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.divider} />
        <div className={styles.email}>Feature Not Available</div>
      </CardContent>
    </Card>
  )
}
export default EmailCard
