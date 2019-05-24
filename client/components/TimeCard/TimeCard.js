// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardItem from './CardItem'

// src
import styles from './TimeCard.less'

const TimeCard = ({ details }) => {
  const { total, active, inactive, title } = details
  return (


    <Card className={styles.timeCard}>
      <CardHeader
        classes={{ title: styles.cardHeaderText }}
        avatar={
          <img
            src={`/images/copy.png`}
          />
        }
        title={title}
        className={styles.cardHeader}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.divider} />
        <div className={styles.cardContentdiv}>
          {/* <div>Your trial version ends in</div> */}
          <div className={styles.clockItem}>
            01
              </div>
          <div className={styles.clockItem}>
            01
              </div>
          <div className={styles.collon}>
            :
              </div>
          <div className={styles.clockItem}>
            01
              </div>
          <div className={styles.clockItem}>
            01
              </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default TimeCard
