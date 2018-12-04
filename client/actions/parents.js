// src
import { CALL_API } from '../middleware/api'

export const CREATE_PARENT = 'CREATE_PARENT'
export const CREATE_PARENT_SUCCESS = 'CREATE_PARENT_SUCCESS'
export const CREATE_PARENT_FAILURE = 'CREATE_PARENT_FAILURE'
export const EDIT_PARENT = 'EDIT_PARENT'
export const EDIT_PARENT_SUCCESS = 'EDIT_PARENT_SUCCESS'
export const EDIT_PARENT_FAILURE = 'EDIT_PARENT_FAILURE'
export const EDIT_PARENT_CREDENTIALS = 'EDIT_PARENT_CREDENTIALS'
export const EDIT_PARENT_CREDENTIALS_SUCCESS = 'EDIT_PARENT_CREDENTIALS_SUCCESS'
export const EDIT_PARENT_CREDENTIALS_FAILURE = 'EDIT_PARENT_CREDENTIALS_FAILURE'
export const DELETE_PARENT = 'DELETE_PARENT'
export const DELETE_PARENT_SUCCESS = 'DELETE_PARENT_SUCCESS'
export const DELETE_PARENT_FAILURE = 'DELETE_PARENT_FAILURE'
export const LOAD_PARENTS = 'LOAD_PARENTS'
export const LOAD_PARENTS_SUCCESS = 'LOAD_PARENTS_SUCCESS'
export const LOAD_PARENTS_FAILURE = 'LOAD_PARENTS_FAILURE'
export const LOAD_SINGLE_PARENT = 'LOAD_SINGLE_PARENT'
export const LOAD_SINGLE_PARENT_SUCCESS = 'LOAD_SINGLE_PARENT_SUCCESS'
export const LOAD_SINGLE_PARENT_FAILURE = 'LOAD_SINGLE_PARENT_FAILURE'

export const createParent = ({
  username,
  password,
  fullname,
  address,
  phone_no,
  email,
  status,
  photo,
  lat,
  lng,
  token,
}) => ({
  [CALL_API]: {
    types: [CREATE_PARENT, CREATE_PARENT_SUCCESS, CREATE_PARENT_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/school/parent/create',
    method: 'POST',
    token,
  },
  payload: {
    username,
    password,
    fullname,
    address,
    phone_no,
    email,
    status,
    photo,
    lat,
    lng,
  },
})

export const updateParent = ({
  id,
  fullname,
  address,
  phone_no,
  email,
  status,
  photo,
  lat,
  lng,
  token,
}) => ({
  [CALL_API]: {
    types: [EDIT_PARENT, EDIT_PARENT_SUCCESS, EDIT_PARENT_FAILURE],
    endpoint: `https://bincee-server.herokuapp.com/api/school/parent/${id}`,
    method: 'POST',
    token,
  },
  payload: { fullname, address, phone_no, email, status, photo, lat, lng },
})

export const updateParentCredentials = ({ id, username, password, token }) => ({
  [CALL_API]: {
    types: [
      EDIT_PARENT_CREDENTIALS,
      EDIT_PARENT_CREDENTIALS_SUCCESS,
      EDIT_PARENT_CREDENTIALS_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/users/${id}`,
    method: 'POST',
    token,
  },
  payload: { username, password },
})

export const loadSingleParent = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_SINGLE_PARENT,
      LOAD_SINGLE_PARENT_SUCCESS,
      LOAD_SINGLE_PARENT_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/school/parent/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})

export const deleteParent = ({ id, token }) => ({
  [CALL_API]: {
    types: [DELETE_PARENT, DELETE_PARENT_SUCCESS, DELETE_PARENT_FAILURE],
    endpoint: `https://bincee-server.herokuapp.com/api/school/parent/${id}`,
    method: 'DELETE',
    token,
  },
  payload: {},
})

export const loadParents = ({ token }) => ({
  [CALL_API]: {
    types: [LOAD_PARENTS, LOAD_PARENTS_SUCCESS, LOAD_PARENTS_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/school/parent/list',
    method: 'GET',
    token,
  },
  payload: {},
})
