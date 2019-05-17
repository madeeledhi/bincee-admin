// src
import * as ActionTypes from '../actions'

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
    case ActionTypes.GET_PASSWORD_SUCCESS: {
      const { data } = payload
      const { password } = data || {}
      return { ...state, password }
    }
    case ActionTypes.GET_PASSWORD_FAILURE: {
      return { ...state, password: '' }
    }
    case ActionTypes.EDIT_PASSWORD_SUCCESS: {
      return { ...state, message: 'Password Updated Successfully' }
    }
    case ActionTypes.EDIT_PASSWORD_FAILURE: {
      return { ...state, message: 'Password Updated UnSuccessfull' }
    }
    case ActionTypes.USER_LOGOUT: {
      ActionTypes.clearDetailsState()
      ActionTypes.clearState()
      return initialState
    }
    case ActionTypes.LOAD_USER: {
      return ActionTypes.loadState()
    }
    default: {
      return state
    }
  }
}
