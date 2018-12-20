// src
import * as ActionTypes from '../actions'

const initialState = {}
export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.LOAD_SINGLE_USER_SUCCESS: {
      const { data } = payload
      return { ...state, loadedUser: data }
    }
    case ActionTypes.LOAD_SINGLE_USER_FAILURE: {
      return { ...state, message: 'Cannot find User' }
    }
    default: {
      return state
    }
  }
}
