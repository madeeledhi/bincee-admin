// lib
import React from 'react'
import map from 'lodash/fp/map'

// src
import LicenceCard from '../LicenceCard'
import EmailCard from '../EmailCard'
import TimeCard from '../TimeCard'
import styles from './LicencesInner.less'
const emailobj= {'title': 'Email'},
  time = {'title': 'Time'}
const LicencesInner = ({ data }) => {
  const { licenceInfo, trialInfo } = data
  console.log(licenceInfo)
  return (
    <div>
      
      <div className={styles.root}>
        {map(obj => <LicenceCard details={obj} />)(licenceInfo)}
      </div>
      <div className={styles.root}>
        <EmailCard details={emailobj} />
        <TimeCard details={time} />
      </div>
    </div>
    // TODO: add Trial Card Here
  )
}
export default LicencesInner
