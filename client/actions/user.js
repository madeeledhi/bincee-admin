// src
import { CALL_API } from '../middleware/api'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'
export const USER_LOGIN_LOGOUT = 'USER_LOGIN_LOGOUT'
export const LOAD_USER = 'LOAD_USER'

export const login = ({ username, password }) => ({
  [CALL_API]: {
    types: [USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/auth/login',
    method: 'POST',
  },
  payload: { username, password },
})
