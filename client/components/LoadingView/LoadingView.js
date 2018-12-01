// libs
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

// src
import styles from './LoadingView.less'

const LoadingView = ({ className, style, message = 'loading' }) => {
  return (
    <div className={[styles.root, className].join(' ')} style={style}>
      <CircularProgress
        className={styles.circularProgress}
        size={70}
        thickness={3}
      />
      <div>{message}</div>
    </div>
  )
}

export default LoadingView
