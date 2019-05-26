// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import toArray from 'lodash/fp/toArray'
import toString from 'lodash/fp/toString'
import concat from 'lodash/fp/concat'
import map from 'lodash/fp/map'

// src
import styles from './TimeCard.less'

const TimeCard = ({ trialInfo }) => {
  const { remainingDays, remainingHour } = trialInfo
  const daysLetters = toArray(toString(remainingDays))
  const hoursLetters = toArray(toString(remainingHour))
  const newhoursLetters =
    hoursLetters.length === 1 ? concat('0', hoursLetters) : hoursLetters
  const newdaysLetters =
    daysLetters.length === 1 ? concat('0', daysLetters) : daysLetters

  return (
    <Card className={styles.timeCard}>
      <CardHeader
        classes={{ title: styles.cardHeaderText }}
        avatar={<img src={`/images/trial.png`} />}
        title="Trial Version Notification"
        className={styles.cardHeader}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.divider} />
        <div className={styles.cardContentdiv}>
          {/* <div>Your trial version ends in</div> */}
          <div className={styles.trialText}>Your trial version will end in</div>
          <div className={styles.timer}>
            <div className={styles.spacing} />
            {map(obj => <div className={styles.clockItem}>{obj}</div>)(
              newdaysLetters,
            )}
            {/* <div>Weeks</div> */}
            <div className={styles.collon}>:</div>
            {map(obj => <div className={styles.clockItem}>{obj}</div>)(
              newhoursLetters,
            )}
            <div className={styles.spacing} />
          </div>
          <div className={styles.timeInfo}>
            <div className={styles.spacing} />
            <p className={styles.weekDays}>DAYS</p>
            <div className={styles.daysSpacing} />
            <p className={styles.weekDays}>HOURS</p>
            <div className={styles.spacing} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default TimeCard
