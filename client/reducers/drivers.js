// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_DRIVER_SUCCESS: {
      return { ...state, message: 'Driver created Successfully' }
    }
    case ActionTypes.CREATE_DRIVER_FAILURE: {
      return { ...state, message: 'Driver Creation Failed' }
    }
    case ActionTypes.EDIT_DRIVER_SUCCESS: {
      return { ...state, message: 'Driver Update Successfully' }
    }
    case ActionTypes.EDIT_DRIVER_FAILURE: {
      return { ...state, message: 'Driver Update Failed' }
    }
    case ActionTypes.EDIT_DRIVER_CREDENTIALS_SUCCESS: {
      return { ...state, message: 'Driver Credentials Update Successfully' }
    }
    case ActionTypes.EDIT_DRIVER_CREDENTIALS_FAILURE: {
      return { ...state, message: 'Driver Credentials Update Failed' }
    }
    case ActionTypes.DELETE_DRIVER_SUCCESS: {
      return { ...state, message: 'Driver Deleted Successfully' }
    }
    case ActionTypes.DELETE_DRIVER_FAILURE: {
      return { ...state, message: 'Driver Deletion Failed' }
    }
    case ActionTypes.LOAD_DRIVERS_SUCCESS: {
      const { data } = payload
      return { ...state, drivers: data, message: '' }
    }
    case ActionTypes.LOAD_DRIVERS_FAILURE: {
      return { ...state, message: 'Cannot find Driver' }
    }
    case ActionTypes.LOAD_SINGLE_DRIVER_SUCCESS: {
      const { data } = payload
      const { id } = data
      return { ...state, [id]: data, message: '' }
    }
    case ActionTypes.LOAD_SINGLE_DRIVER_FAILURE: {
      return { ...state, message: 'Cannot find Driver' }
    }
    default: {
      return state
    }
  }
}
