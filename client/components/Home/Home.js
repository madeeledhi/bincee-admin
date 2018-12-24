// libs
import React from 'react'

//src
import styles from './styles.less'
import Profie from '../Profile'

class Home extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <div>
          <img
            className={styles.image}
            height="320"
            width="500"
            src="/images/portal_home_image.png"
          />
          <div className={styles.text}>Welcome to Bincee Portal</div>
          <div className={styles.smallText}>
            this is a long paragraph this is a long paragraph this is a long
            paragraph this is a long paragraph this is a long paragraph
          </div>
        </div>
      </div>
    )
  }
}

export default Home
