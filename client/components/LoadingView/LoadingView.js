// libs
import React from 'react'
// import CircularProgress from '@material-ui/core/CircularProgress'

// src
import styles from './LoadingView.less'

const LoadingView = ({ className, style }) => {
  return (
    <div className={[styles.root, className].join(' ')} style={style}>
      <div className={styles.loader} />
    </div>
  )
}

export default LoadingView
