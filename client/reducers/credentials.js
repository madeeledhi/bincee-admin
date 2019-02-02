// src
import * as ActionTypes from '../actions'

const initialState = {}
export default (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case ActionTypes.SEND_CREDENTIALS: {
      return { ...state, sending: true }
    }
    case ActionTypes.SEND_CREDENTIALS_SUCCESS: {
      return { ...state, sending: false }
    }
    case ActionTypes.SEND_CREDENTIALS_FAILURE: {
      return { ...state, sending: false }
    }
    default: {
      return state
    }
  }
}
