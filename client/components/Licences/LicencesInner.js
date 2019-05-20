// lib
import React from 'react'

// src
import LicenceCard from '../LicenceCard'
import styles from './LicencesInner.less'

const LicencesInner = ({ data }) => {
  return (
    <div className={styles.root}>
      <LicenceCard />
      <LicenceCard />
    </div>
  )
}
export default LicencesInner
