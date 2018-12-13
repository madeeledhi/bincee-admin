import size from 'lodash/fp/size'
// src
import { CALL_API } from '../middleware/api'
import { clearDetailsState } from './user'

export const LOAD_USER_DETAILS = 'LOAD_USER_DETAILS'
export const LOAD_USER_DETAILS_SUCCESS = 'LOAD_USER_DETAILS_SUCCESS'
export const LOAD_USER_DETAILS_FAILURE = 'LOAD_USER_DETAILS_FAILURE'
export const EDIT_USER_DETAILS = 'EDIT_USER_DETAILS'
export const EDIT_USER_DETAILS_SUCCESS = 'EDIT_USER_DETAILS_SUCCESS'
export const EDIT_USER_DETAILS_FAILURE = 'EDIT_USER_DETAILS_FAILURE'
export const LOAD_SAVED_DETAILS = 'LOAD_SAVED_DETAILS'

export const loadDetailsState = () => {
  try {
    const serializedUser = localStorage.getItem('userDetails')
    if (serializedUser === null) {
      return {}
    }
    return JSON.parse(serializedUser)
  } catch (err) {
    return {}
  }
}

export const saveDetailstate = user => {
  try {
    const serializedUser = JSON.stringify(user)
    localStorage.setItem('userDetails', serializedUser)
  } catch (err) {
    //write error
  }
}

export const loadUserDetails = ({ id, token }) => {
  const details = loadDetailsState()
  if (size(details) > 0) {
    return {
      type: LOAD_SAVED_DETAILS,
      payload: { data: details },
    }
  }
  return {
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
  }
}

export const editUserDetails = ({ id, name, phone_no, address, token }) => {
  return {
    [CALL_API]: {
      types: [
        EDIT_USER_DETAILS,
        EDIT_USER_DETAILS_SUCCESS,
        EDIT_USER_DETAILS_FAILURE,
      ],
      endpoint: `https://bincee-server.herokuapp.com/api/admin/school/${id}`,
      method: 'POST',
      token,
    },
    payload: { name, phone_no, address },
  }
}
