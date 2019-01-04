// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const CREATE_BUS = 'CREATE_BUS'
export const CREATE_BUS_SUCCESS = 'CREATE_BUS_SUCCESS'
export const CREATE_BUS_FAILURE = 'CREATE_BUS_FAILURE'
export const EDIT_BUS = 'EDIT_BUS'
export const EDIT_BUS_SUCCESS = 'EDIT_BUS_SUCCESS'
export const EDIT_BUS_FAILURE = 'EDIT_BUS_FAILURE'
export const DELETE_BUS = 'DELETE_BUS'
export const DELETE_BUS_SUCCESS = 'DELETE_BUS_SUCCESS'
export const DELETE_BUS_FAILURE = 'DELETE_BUS_FAILURE'
export const LOAD_BUS = 'LOAD_BUS'
export const LOAD_BUS_SUCCESS = 'LOAD_BUS_SUCCESS'
export const LOAD_BUS_FAILURE = 'LOAD_BUS_FAILURE'
export const LOAD_SINGLE_BUS = 'LOAD_SINGLE_BUS'
export const LOAD_SINGLE_BUS_SUCCESS = 'LOAD_SINGLE_BUS_SUCCESS'
export const LOAD_SINGLE_BUS_FAILURE = 'LOAD_SINGLE_BUS_FAILURE'
export const LOAD_DRIVER_BUS = 'LOAD_DRIVER_BUS'
export const LOAD_DRIVER_BUS_SUCCESS = 'LOAD_DRIVER_BUS_SUCCESS'
export const LOAD_DRIVER_BUS_FAILURE = 'LOAD_DRIVER_BUS_FAILURE'

const baseUrl = getBaseUrl()
export const createBus = ({
  registration_no,
  description,
  driver_id,
  token,
}) => ({
  [CALL_API]: {
    types: [CREATE_BUS, CREATE_BUS_SUCCESS, CREATE_BUS_FAILURE],
    endpoint: `${baseUrl}/school/bus/create`,
    method: 'POST',
    token,
  },
  payload: { registration_no, description, driver_id },
})

export const editBus = ({
  id,
  registration_no,
  description,
  driver_id,
  token,
}) => ({
  [CALL_API]: {
    types: [EDIT_BUS, EDIT_BUS_SUCCESS, EDIT_BUS_FAILURE],
    endpoint: `${baseUrl}/school/bus/${id}`,
    method: 'POST',
    token,
  },
  payload: { registration_no, description, driver_id },
})

export const loadSingleBus = ({ id, token }) => ({
  [CALL_API]: {
    types: [LOAD_SINGLE_BUS, LOAD_SINGLE_BUS_SUCCESS, LOAD_SINGLE_BUS_FAILURE],
    endpoint: `${baseUrl}/school/bus/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})

export const deleteBus = ({ id, token }) => ({
  [CALL_API]: {
    types: [DELETE_BUS, DELETE_BUS_SUCCESS, DELETE_BUS_FAILURE],
    endpoint: `${baseUrl}/school/bus/${id}`,
    method: 'DELETE',
    token,
  },
  payload: {},
})

export const loadAllBus = ({ token }) => ({
  [CALL_API]: {
    types: [LOAD_BUS, LOAD_BUS_SUCCESS, LOAD_BUS_FAILURE],
    endpoint: `${baseUrl}/school/bus/list`,
    method: 'GET',
    token,
  },
  payload: {},
})

export const loadAllDriverBus = ({ id, token }) => ({
  [CALL_API]: {
    types: [LOAD_DRIVER_BUS, LOAD_DRIVER_BUS_SUCCESS, LOAD_BUS_FAILURE],
    endpoint: `${baseUrl}/school/driver/bus/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})
