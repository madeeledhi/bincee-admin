// libs
import React from 'react'

// src
export default class HomePage extends React.Component {
  render() {
    const { user } = this.props
    console.log('user: ', user)
    return (
      <div>
        <h1> Home Page</h1>
      </div>
    )
  }
}
