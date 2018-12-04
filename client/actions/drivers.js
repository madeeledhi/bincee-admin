// src
import { CALL_API } from '../middleware/api'

export const CREATE_DRIVER = 'CREATE_DRIVER'
export const CREATE_DRIVER_SUCCESS = 'CREATE_DRIVER_SUCCESS'
export const CREATE_DRIVER_FAILURE = 'CREATE_DRIVER_FAILURE'
export const EDIT_DRIVER = 'EDIT_DRIVER'
export const EDIT_DRIVER_SUCCESS = 'EDIT_DRIVER_SUCCESS'
export const EDIT_DRIVER_FAILURE = 'EDIT_DRIVER_FAILURE'
export const EDIT_DRIVER_CREDENTIALS = 'EDIT_DRIVER_CREDENTIALS'
export const EDIT_DRIVER_CREDENTIALS_SUCCESS = 'EDIT_DRIVER_CREDENTIALS_SUCCESS'
export const EDIT_DRIVER_CREDENTIALS_FAILURE = 'EDIT_DRIVER_CREDENTIALS_FAILURE'
export const DELETE_DRIVER = 'DELETE_DRIVER'
export const DELETE_DRIVER_SUCCESS = 'DELETE_DRIVER_SUCCESS'
export const DELETE_DRIVER_FAILURE = 'DELETE_DRIVER_FAILURE'
export const LOAD_DRIVERS = 'LOAD_DRIVERS'
export const LOAD_DRIVERS_SUCCESS = 'LOAD_DRIVERS_SUCCESS'
export const LOAD_DRIVERS_FAILURE = 'LOAD_DRIVERS_FAILURE'
export const LOAD_SINGLE_DRIVER = 'LOAD_SINGLE_DRIVER'
export const LOAD_SINGLE_DRIVER_SUCCESS = 'LOAD_SINGLE_DRIVER_SUCCESS'
export const LOAD_SINGLE_DRIVER_FAILURE = 'LOAD_SINGLE_DRIVER_FAILURE'

export const createDriver = ({
  username,
  password,
  fullname,
  phone_no,
  status,
  photo,
  token,
}) => ({
  [CALL_API]: {
    types: [CREATE_DRIVER, CREATE_DRIVER_SUCCESS, CREATE_DRIVER_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/school/driver/create',
    method: 'POST',
    token,
  },
  payload: { username, password, fullname, phone_no, status, photo },
})

export const updateDriver = ({
  id,
  fullname,
  phone_no,
  status,
  photo,
  token,
}) => ({
  [CALL_API]: {
    types: [EDIT_DRIVER, EDIT_DRIVER_SUCCESS, EDIT_DRIVER_FAILURE],
    endpoint: `https://bincee-server.herokuapp.com/api/school/driver/${id}`,
    method: 'POST',
    token,
  },
  payload: { fullname, phone_no, status, photo },
})

export const updateDriverCredentials = ({ id, username, password, token }) => ({
  [CALL_API]: {
    types: [
      EDIT_DRIVER_CREDENTIALS,
      EDIT_DRIVER_CREDENTIALS_SUCCESS,
      EDIT_DRIVER_CREDENTIALS_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/users/${id}`,
    method: 'POST',
    token,
  },
  payload: { username, password },
})

export const loadSingleDriver = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_SINGLE_DRIVER,
      LOAD_SINGLE_DRIVER_SUCCESS,
      LOAD_SINGLE_DRIVER_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/school/driver/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})

export const deleteDriver = ({ id, token }) => ({
  [CALL_API]: {
    types: [DELETE_DRIVER, DELETE_DRIVER_SUCCESS, DELETE_DRIVER_FAILURE],
    endpoint: `https://bincee-server.herokuapp.com/api/school/driver/${id}`,
    method: 'DELETE',
    token,
  },
  payload: {},
})

export const loadDrivers = ({ token }) => ({
  [CALL_API]: {
    types: [LOAD_DRIVERS, LOAD_DRIVERS_SUCCESS, LOAD_DRIVERS_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/school/driver/list',
    method: 'GET',
    token,
  },
  payload: {},
})
