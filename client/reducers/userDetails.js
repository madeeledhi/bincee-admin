// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.LOAD_USER_DETAILS_SUCCESS: {
      const { data } = payload
      return { ...data }
    }
    case ActionTypes.LOAD_USER_DETAILS_FAILURE: {
      return initialState
    }
    case ActionTypes.USER_LOGOUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}
