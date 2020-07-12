// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import reduce from 'lodash/fp/reduce'
import isEqual from 'lodash/fp/isEqual'
import find from 'lodash/fp/find'
import toInteger from 'lodash/fp/toInteger'
import firebase from 'firebase'

// src

import { loadDrivers, syncRides, syncDrivers } from '../actions'
import { hasPropChanged } from './index'

const config = {
  apiKey: 'AIzaSyCGTdN0NQbA-p3P7bUDD-BJr8PFqk-oMD8',
  authDomain: 'bincee-67ec6.firebaseapp.com',
  databaseURL: 'https://bincee-67ec6.firebaseio.com',
  projectId: 'bincee-67ec6',
}

export default () => (WrappedComponent) => {
  const mapStateToProps = (state) => {
    const drivers = flow(
      getOr([], 'drivers.drivers'),
      filter(({ enableFleet }) => enableFleet)
    )(state)

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
      this.driverStream = this.driverStream.bind(this)
      this.rideStream = this.rideStream.bind(this)
    }

    componentDidMount() {
      if (this.store.collection) {
        this.store.collection('ride').onSnapshot(this.rideStream)
        this.store.collection('real_time').onSnapshot(this.driverStream)
      }

      const { drivers, token, dispatch } = this.props
      if (size(drivers) < 1) {
        dispatch(loadDrivers({ token }))
      }
    }

    componentWillReceiveProps(nextProps) {
      if (hasPropChanged(['drivers'], this.props, nextProps)) {
        this.store.collection('ride').onSnapshot(this.rideStream)
        this.store.collection('real_time').onSnapshot(this.driverStream)

        const { drivers, token, dispatch } = this.props
        if (size(drivers) < 1) {
          dispatch(loadDrivers({ token }))
        } else {
          const { remoteDrivers, remoteRides } = this.state

          dispatch(syncRides(remoteRides))
          dispatch(syncDrivers(remoteDrivers))
        }
      }
    }

    driverStream(querySnapshot) {
      let drivers = []
      querySnapshot.forEach((doc) => {
        drivers = [...drivers, { driver_id: toInteger(doc.id), ...doc.data() }]
      })
      const { remoteDrivers } = this.state
      const { dispatch, drivers: propDrivers } = this.props

      const filteredDrivers = reduce((final, driver) => {
        const {
          driver_id,
          latLng = {},
          rideId,
          shift,
          driverDirection,
        } = driver
        const { _lat: latitude, _long: longitude } = latLng
        const driverDetails = find(
          ({ driver_id: driverID }) => driverID === driver_id
        )(propDrivers)
        if (driverDetails) {
          return [
            ...final,
            {
              driver_id,
              rideId,
              shift,
              driverDirection,
              latitude,
              longitude,
              ...driverDetails,
            },
          ]
        }
        return final
      }, [])(drivers)
      if (!isEqual(remoteDrivers)(filteredDrivers)) {
        this.setState(() => ({ remoteDrivers: filteredDrivers }))
        dispatch(syncDrivers(filteredDrivers))
      }
    }

    rideStream(querySnapshot) {
      let rides = []
      querySnapshot.forEach((doc) => {
        rides = [...rides, { ride_id: doc.id, ...doc.data() }]
      })
      const { remoteRides } = this.state
      const { dispatch } = this.props
      if (!isEqual(remoteRides)(rides)) {
        this.setState(() => ({ remoteRides: rides }))
        dispatch(syncRides(rides))
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return connect(mapStateToProps)(syncFireStore)
}
