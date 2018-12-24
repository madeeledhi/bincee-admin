// src
import { CALL_API } from '../middleware/api'

export const LOAD_SINGLE_USER = 'LOAD_SINGLE_USER'
export const LOAD_SINGLE_USER_SUCCESS = 'LOAD_SINGLE_USER_SUCCESS'
export const LOAD_SINGLE_USER_FAILURE = 'LOAD_SINGLE_USER_FAILURE'

export const loadSingleUser = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_SINGLE_USER,
      LOAD_SINGLE_USER_SUCCESS,
      LOAD_SINGLE_USER_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/users/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})
