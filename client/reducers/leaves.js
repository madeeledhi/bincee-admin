// src
import * as ActionTypes from '../actions'
const initialState = {}
export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.LOAD_LEAVES_SUCCESS: {
      const { data } = payload
      return { ...state, leaves: data }
    }
    case ActionTypes.LOAD_LEAVES_FAILURE: {
      return { ...state, message: 'Cannot find leaves' }
    }
    default: {
      return state
    }
  }
}
