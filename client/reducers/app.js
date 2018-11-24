// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.INIT_APP: {
      return { ...state, ...payload, init: true }
    }
    default: {
      return state
    }
  }
}
