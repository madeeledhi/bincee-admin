import React from 'react'
import {keys, view, forEach, lensProp} from 'ramda'
import DrawerInner from './DrawerInner'
class Drawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  handleData = (data) => {
    const dataKeys = keys(data)
    const keyValues = forEach( 
      currentKey => (view(lensProp(currentKey), dataKeys)), data)
    console.log(keyValues)
  }
  render() {
    const {data}= this.props
    return(
      <DrawerInner
        data={data}
        handleData={this.handleData}
      />
    )
  }
} export default Drawer