// src
import { CALL_API } from '../middleware/api'

export const LOAD_USER_DETAILS = 'LOAD_USER_DETAILS'
export const LOAD_USER_DETAILS_SUCCESS = 'LOAD_USER_DETAILS_SUCCESS'
export const LOAD_USER_DETAILS_FAILURE = 'LOAD_USER_DETAILS_FAILURE'

export const loadUserDetails = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_USER_DETAILS,
      LOAD_USER_DETAILS_SUCCESS,
      LOAD_USER_DETAILS_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/admin/school/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})
