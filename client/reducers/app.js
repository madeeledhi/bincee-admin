import { LOCATION_CHANGE } from 'react-router-redux'
// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.INIT_APP: {
      return { ...state, ...payload, init: true }
    }
    case LOCATION_CHANGE: {
      return state
    }
    default: {
      return state
    }
  }
}
