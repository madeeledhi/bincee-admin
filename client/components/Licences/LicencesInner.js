// lib
import React from 'react'
import map from 'lodash/fp/map'

// src
import LicenceCard from '../LicenceCard'
import styles from './LicencesInner.less'

const LicencesInner = ({ data }) => {
  return (
    <div className={styles.root}>
      {map(obj => <LicenceCard details={obj} />)(data)}
    </div>
  )
}
export default LicencesInner
