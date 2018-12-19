// lib
import React from 'react'

// src
import styles from './styles.less'

class Picture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: '/images/profile.png'
    }
  }

  componentDidMount(){
    this.fileSelector = this.buildFileSelector();
  }
  buildFileSelector=()=> {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
  }
  handleEditClick =(e)=>{
    e.preventDefault();
    const selectedImage = this.fileSelector.click();
    console.log('selectedImage',selectedImage)
  }

  render() {
    const {source}= this.props
    const image = source ? source : '/images/profile.png'
    return (
       <div className={styles.main}>
         <img className={styles.image} alt="pic" src={image} height="100" width="100" />
         <div className={styles.edit} onClick={this.handleEditClick}>Edit</div>
       </div>
    )
  }
}

export default Picture
