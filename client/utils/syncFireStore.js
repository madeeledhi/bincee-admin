// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import firebase from 'firebase'

// src

import { loadDrivers } from '../actions'

const config = {
  apiKey: process.env.API_KEY,
  authDomain: 'bincee-67ec6.firebaseapp.com',
  databaseURL: 'https://bincee-67ec6.firebaseio.com',
  projectId: process.env.PROJECT_ID,
}

export default () => WrappedComponent => {
  const mapStateToProps = state => {
    console.log('State: ', state)
    const drivers = getOr([], 'drivers')(state)
    const token = getOr([], 'user.token')(state)
    return { drivers, token }
  }

  class syncFireStore extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        remoteDrivers: [],
        remoteRides: [],
      }
      const { apps } = firebase
      this.store = {}
      if (!apps.length) {
        const fireBaseAdmin = firebase.initializeApp(config)
        this.store = fireBaseAdmin.firestore()
      }
    }

    componentDidMount() {
      this.store.collection('ride').onSnapshot(this.rideStream)
      this.store.collection('drivers').onSnapshot(this.driverStream)

      const { drivers, token, dispatch } = this.props
      if (size(drivers) < 1) {
        dispatch(loadDrivers({ token }))
      }
    }

    driverStream(querySnapshot) {
      querySnapshot.forEach(doc => {
        console.log('Drivers: ', doc.data())
      })
    }

    rideStream(querySnapshot) {
      querySnapshot.forEach(doc => {
        console.log('rides: ', doc.data())
      })
    }

    render() {
      const { drivers, token } = this.props
      console.log('Drivers: ', drivers, token)
      return <WrappedComponent />
    }
  }

  return connect(mapStateToProps)(syncFireStore)
}
