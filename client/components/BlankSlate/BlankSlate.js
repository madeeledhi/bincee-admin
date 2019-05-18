//  libs
import React from 'react'

//  src
import styles from './BlankSlate.less'

const BlankSlate = ({ message }) => {
  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        <div className={styles.text}>
          <img src="/images/blank.png" />
          <div className={styles.texter}>{message}</div>
        </div>
      </div>
    </div>
  )
}

export default BlankSlate
