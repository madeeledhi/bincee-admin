// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const LOAD_SINGLE_USER = 'LOAD_SINGLE_USER'
export const LOAD_SINGLE_USER_SUCCESS = 'LOAD_SINGLE_USER_SUCCESS'
export const LOAD_SINGLE_USER_FAILURE = 'LOAD_SINGLE_USER_FAILURE'

const baseUrl = getBaseUrl()

export const loadSingleUser = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_SINGLE_USER,
      LOAD_SINGLE_USER_SUCCESS,
      LOAD_SINGLE_USER_FAILURE,
    ],
    endpoint: `${baseUrl}/users/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})
