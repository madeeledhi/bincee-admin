// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'
export const GET_PASSWORD = 'GET_PASSWORD'
export const GET_PASSWORD_SUCCESS = 'GET_PASSWORD_SUCCESS'
export const GET_PASSWORD_FAILURE = 'GET_PASSWORD_FAILURE'
export const EDIT_PASSWORD = 'EDIT_PASSWORD'
export const EDIT_PASSWORD_SUCCESS = 'EDIT_PASSWORD_SUCCESS'
export const EDIT_PASSWORD_FAILURE = 'EDIT_PASSWORD_FAILURE'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'
export const USER_LOGOUT = 'USER_LOGOUT'
export const LOAD_USER = 'LOAD_USER'
const baseUrl = getBaseUrl()

export const login = ({ username, password }) => ({
  [CALL_API]: {
    types: [USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
    endpoint: `${baseUrl}/auth/login`,
    method: 'POST',
  },
  payload: { username, password },
})

export const resetPassword = ({
  username,
  selected_option,
  email,
  phone_no,
  type,
}) => ({
  [CALL_API]: {
    types: [RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
    endpoint: `${baseUrl}/users/passwordreset`,
    method: 'POST',
  },
  payload: { username, selected_option, email, phone_no, type },
})

export const editPassword = ({
  id,
  username,
  password,
  new_password,
  token,
}) => ({
  [CALL_API]: {
    types: [EDIT_PASSWORD, EDIT_PASSWORD_SUCCESS, EDIT_PASSWORD_FAILURE],
    endpoint: `${baseUrl}/users/${id}`,
    method: 'POST',
    token,
  },
  payload: { username, password, new_password },
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

export const clearDetailsState = () => {
  try {
    localStorage.removeItem('userDetails')
    return {}
  } catch (err) {
    //write error
    return {}
  }
}
