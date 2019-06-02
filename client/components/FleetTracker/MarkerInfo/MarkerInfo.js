import React, { PureComponent } from 'react'

export default class CityInfo extends PureComponent {
  render() {
    const { info } = this.props
    return (
      <div>
        <div>{`Driver Name:${info.fullname} `} </div>
        <div>{`Shift:${info.shift} `} </div>
      </div>
    )
  }
}
