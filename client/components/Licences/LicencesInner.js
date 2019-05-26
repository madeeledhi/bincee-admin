// lib
import React from 'react'
import map from 'lodash/fp/map'

// src
import LicenceCard from '../LicenceCard'
import EmailCard from '../EmailCard'
import TimeCard from '../TimeCard'
import styles from './LicencesInner.less'

const LicencesInner = ({ data }) => {
  const { licenceInfo, trialInfo, emailInfo = {} } = data
  return (
    <div>
      <div className={styles.root}>
        {map(obj => <LicenceCard details={obj} />)(licenceInfo)}
      </div>
      <div className={styles.root}>
        <EmailCard emailInfo={emailInfo} />
        <TimeCard trialInfo={trialInfo} />
      </div>
    </div>
  )
}
export default LicencesInner
