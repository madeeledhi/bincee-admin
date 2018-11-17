// src
import * as ActionTypes from '../actions'

const initialState = { username: '', type: '' }

export default (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.USER_LOGIN_SUCCESS: {
      const { data } = payload
      return { ...data }
    }
    case ActionTypes.USER_LOGIN_FAILURE: {
      return { ...initialState }
    }
    case ActionTypes.USER_LOGOUT_SUCCESS: {
      return initialState
    }
    case ActionTypes.LOAD_USER: {
      return { ...payload }
    }
    default: {
      return { ...initialState }
    }
  }
}
