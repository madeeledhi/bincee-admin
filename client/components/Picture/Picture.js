// lib
import React from 'react'

// src
import styles from './styles.less'

class Picture extends React.Component {
  componentDidMount() {
    this.fileSelector = this.buildFileSelector()
  }

  componentWillUnmount() {
    this.fileSelector.removeEventListener('change', this.handleChange)
  }

  buildFileSelector = () => {
    const { onChange } = this.props
    const fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')
    fileSelector.addEventListener('change', onChange)
    return fileSelector
  }

  handleEditClick = e => {
    e.preventDefault()
    this.fileSelector.click()
  }

  render() {
    const { source } = this.props
    const image = source || '/images/profile.png'
    return (
      <div className={styles.main}>
        <img
          className={styles.image}
          alt="pic"
          src={image}
          height="100"
          width="100"
        />
        <div className={styles.edit} onClick={this.handleEditClick}>
          {'Edit'}
        </div>
      </div>
    )
  }
}

export default Picture
