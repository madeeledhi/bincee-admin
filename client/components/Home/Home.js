// libs
import React from 'react'

//src
import styles from './styles.less'
import Profie from '../Profile'

class Home extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        {/* testing map picker here */}

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
