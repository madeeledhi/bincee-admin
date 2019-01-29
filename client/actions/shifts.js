// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const CREATE_SHIFT = 'CREATE_SHIFT'
export const CREATE_SHIFT_SUCCESS = 'CREATE_SHIFT_SUCCESS'
export const CREATE_SHIFT_FAILURE = 'CREATE_SHIFT_FAILURE'
export const EDIT_SHIFT = 'EDIT_SHIFT'
export const EDIT_SHIFT_SUCCESS = 'EDIT_SHIFT_SUCCESS'
export const EDIT_SHIFT_FAILURE = 'EDIT_SHIFT_FAILURE'
export const DELETE_SHIFT = 'DELETE_SHIFT'
export const DELETE_SHIFT_SUCCESS = 'DELETE_SHIFT_SUCCESS'
export const DELETE_SHIFT_FAILURE = 'DELETE_SHIFT_FAILURE'
export const LOAD_SHIFTS = 'LOAD_SHIFTS'
export const LOAD_SHIFTS_SUCCESS = 'LOAD_SHIFTS_SUCCESS'
export const LOAD_SHIFTS_FAILURE = 'LOAD_SHIFTS_FAILURE'
export const LOAD_SINGLE_SHIFT = 'LOAD_SINGLE_SHIFT'
export const LOAD_SINGLE_SHIFT_SUCCESS = 'LOAD_SINGLE_SHIFT_SUCCESS'
export const LOAD_SINGLE_SHIFT_FAILURE = 'LOAD_SINGLE_SHIFT_FAILURE'
const baseUrl = getBaseUrl()

export const createShift = ({
  shift_name,
  start_time,
  end_time,
  type,
  token,
}) => ({
  [CALL_API]: {
    types: [CREATE_SHIFT, CREATE_SHIFT_SUCCESS, CREATE_SHIFT_FAILURE],
    endpoint: `${baseUrl}/school/shift/create`,
    method: 'POST',
    token,
  },
  payload: { shift_name, start_time, end_time, type },
})

export const editShift = ({
  id,
  shift_name,
  start_time,
  end_time,
  type,
  token,
}) => ({
  [CALL_API]: {
    types: [EDIT_SHIFT, EDIT_SHIFT_SUCCESS, EDIT_SHIFT_FAILURE],
    endpoint: `${baseUrl}/school/shift/${id}`,
    method: 'POST',
    token,
  },
  payload: { shift_name, start_time, end_time, type },
})

export const loadSingleShift = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_SINGLE_SHIFT,
      LOAD_SINGLE_SHIFT_SUCCESS,
      LOAD_SINGLE_SHIFT_FAILURE,
    ],
    endpoint: `${baseUrl}/school/shift/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})

export const deleteShift = ({ id, token }) => ({
  [CALL_API]: {
    types: [DELETE_SHIFT, DELETE_SHIFT_SUCCESS, DELETE_SHIFT_FAILURE],
    endpoint: `${baseUrl}/school/shift/${id}`,
    method: 'DELETE',
    token,
  },
  payload: {},
})

export const loadShifts = ({ token }) => ({
  [CALL_API]: {
    types: [LOAD_SHIFTS, LOAD_SHIFTS_SUCCESS, LOAD_SHIFTS_FAILURE],
    endpoint: `${baseUrl}/school/shift/list`,
    method: 'GET',
    token,
  },
  payload: {},
})
