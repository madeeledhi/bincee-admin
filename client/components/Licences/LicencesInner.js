// lib
import React from 'react'
import map from 'lodash/fp/map'

// src
import LicenceCard from '../LicenceCard'
import styles from './LicencesInner.less'

const LicencesInner = ({ data }) => {
  const { licenceInfo, trialInfo } = data
  return (
    <div className={styles.root}>
      {map(obj => <LicenceCard details={obj} />)(licenceInfo)}
    </div>
    // TODO: add Trial Card Here
  )
}
export default LicencesInner
