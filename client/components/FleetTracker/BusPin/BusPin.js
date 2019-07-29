import React, { PureComponent } from 'react'

const pinStyle = angle => ({
  cursor: 'pointer',
  fill: '#06b9ed',
  stroke: '#000',
  transform: `rotate(${-1 * (angle + 180)}deg)`,
})

export default class BusPin extends PureComponent {
  render() {
    const { size = 50, onClick, bus } = this.props
    const { direction } = bus

    return (
      <svg
        height={size}
        viewBox="0 0 76.5 144"
        style={pinStyle(direction)}
        onClick={onClick}
      >
        <path
          fill="#FAB91D"
          d="M52,126.9H30.2c-6.6,0-12-5.4-12-12V33.4c0-6.6,5.4-12,12-12H52c6.6,0,12,5.4,12,12v81.5  C64,121.5,58.6,126.9,52,126.9z"
        />
        <path
          fill="#A67500"
          d="M48.9,115.7H33.3c-6.6,0-12-5.4-12-12V36.2c0-6.6,5.4-12,12-12h15.6c6.6,0,12,5.4,12,12v67.4  C60.9,110.3,55.5,115.7,48.9,115.7z"
        />
        <path
          fill="#FAB91D"
          d="M46.5,105.9H35.7c-6.6,0-12-5.4-12-12V38.7c0-6.6,5.4-12,12-12h10.8c6.6,0,12,5.4,12,12v55.2  C58.5,100.5,53.1,105.9,46.5,105.9z"
        />
      </svg>
    )
  }
}
