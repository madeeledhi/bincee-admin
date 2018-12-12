import React from 'react'
import styles from './styles.less'

const BlankState = ({tableName}) => {

  return (
    <div className={styles.main}>
      {/* <div className={styles.wrap}> */}
      <div className={styles.text}>No {tableName} Avalible Create New {tableName} </div>
      {/* </div> */}
    </div>
  )
}
export default BlankState
