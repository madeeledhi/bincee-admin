// libs
import React from 'react'
import styles from './styles.less'

import Profie from '../Profile'
import MapPicker from '../MapPicker'

class Home extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        {/* testing map picker here */}
        <MapPicker
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          defaultPosition={{ lat: -34.397, lng: 150.644 }}
          zoom={8}
        />
        <div className={styles.image}>
          <div className={styles.wrap}>
            <div className={styles.text}>Welcome to Bincee Portal</div>
            <div className={styles.smallText}>
              this is a long paragraph this is a long paragraph this is a long
              paragraph this is a long paragraph this is a long paragraph
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
