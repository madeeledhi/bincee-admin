// lib
import React from 'react'
import map from 'lodash/fp/map'

// src
import LicenceCard from '../LicenceCard'
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
        <LicenceCard details={emailobj} />
        <LicenceCard details={time} />
      </div>
    </div>
    // TODO: add Trial Card Here
  )
}
export default LicencesInner
