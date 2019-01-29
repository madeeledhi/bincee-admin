// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const LOAD_LEAVES = 'LOAD_LEAVES'
export const LOAD_LEAVES_SUCCESS = 'LOAD_LEAVES_SUCCESS'
export const LOAD_LEAVES_FAILURE = 'LOAD_LEAVES_FAILURE'
const baseUrl = getBaseUrl()

export const loadLeaves = ({ token }) => ({
  [CALL_API]: {
    types: [LOAD_LEAVES, LOAD_LEAVES_SUCCESS, LOAD_LEAVES_FAILURE],
    endpoint: `${baseUrl}/school/leaves/list`,
    method: 'GET',
    token,
  },
  payload: {},
})
