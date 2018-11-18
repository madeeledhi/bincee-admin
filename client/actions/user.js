// src
import { CALL_API } from '../middleware/api'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'
export const USER_LOGOUT = 'USER_LOGOUT'
export const LOAD_USER = 'LOAD_USER'

export const login = ({ username, password }) => ({
  [CALL_API]: {
    types: [USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/auth/login',
    method: 'POST',
  },
  payload: { username, password },
})

export const loadUser = () => {
  return {
    type: LOAD_USER,
  }
}

export const logOut = () => {
  return { type: USER_LOGOUT }
}

export const loadState = () => {
  try {
    const serializedUser = localStorage.getItem('user')
    if (serializedUser === null) {
      return {}
    }
    return JSON.parse(serializedUser)
  } catch (err) {
    return {}
  }
}

export const saveState = user => {
  try {
    const serializedUser = JSON.stringify(user)
    localStorage.setItem('user', serializedUser)
  } catch (err) {
    //write error
  }
}

export const clearState = () => {
  try {
    localStorage.removeItem('user')
    return {}
  } catch (err) {
    //write error
    return {}
  }
}
