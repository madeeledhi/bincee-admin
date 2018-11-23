import { LOCATION_CHANGE } from 'react-router-redux'
// src
import * as ActionTypes from '../actions'
import {} from '../actions'

const initialState = { username: '', type: '' }

export default (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.USER_LOGIN_SUCCESS: {
      const { data } = payload
      ActionTypes.saveState(data)
      return { ...data }
    }
    case ActionTypes.USER_LOGIN_FAILURE: {
      return { ...initialState }
    }
    case ActionTypes.USER_LOGOUT: {
      ActionTypes.clearState()
      return initialState
    }
    case ActionTypes.LOAD_USER: {
      return ActionTypes.loadState()
    }
    case LOCATION_CHANGE: {
      return state
    }
    default: {
      return { ...initialState }
    }
  }
}
