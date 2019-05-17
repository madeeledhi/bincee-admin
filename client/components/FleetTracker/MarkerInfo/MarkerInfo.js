import React, { PureComponent } from 'react'

export default class CityInfo extends PureComponent {
  render() {
    const { info } = this.props

    return (
      <div>
        <div>{`Driver Name:${info.driverName} `} </div>
        <div>{`Bus No:${info.busNo} `} </div>
      </div>
    )
  }
}
