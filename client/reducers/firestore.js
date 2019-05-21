// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.SYNC_DRIVERS: {
      return { ...state, drivers: payload }
    }
    case ActionTypes.SYNC_RIDES: {
      return { ...state, rides: payload }
    }
    default: {
      return state
    }
  }
}
