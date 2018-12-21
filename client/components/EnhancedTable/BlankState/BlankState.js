import React from 'react'
import styles from './styles.less'
import Button from '../../Button'

const BlankState = ({tableName}) => {

  return (
    <div className={styles.main}>
      {/* <div className={styles.wrap}> */}
      <div className={styles.text}>THERE IS NO DATA TO DISPLAY
      <Button 
        label="INSERT DATA"
        style={{ color: '#000', marginTop: '2em', fontSize:'11px' }}
      />
      </div>
      
      {/* </div> */}
    </div>
  )
}
export default BlankState
