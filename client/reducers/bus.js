// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_BUS_SUCCESS: {
      return { ...state, message: 'Bus created Successfully' }
    }
    case ActionTypes.CREATE_BUS_FAILURE: {
      return { ...state, message: 'Bus Creation Failed' }
    }
    case ActionTypes.EDIT_BUS_SUCCESS: {
      return { ...state, message: 'Bus Update Successfully' }
    }
    case ActionTypes.EDIT_BUS_FAILURE: {
      return { ...state, message: 'Bus Update Failed' }
    }
    case ActionTypes.DELETE_BUS_SUCCESS: {
      return { ...state, message: 'Bus Deleted Successfully' }
    }
    case ActionTypes.DELETE_BUS_FAILURE: {
      return { ...state, message: 'Bus Deletion Failed' }
    }
    case ActionTypes.LOAD_BUS_SUCCESS: {
      const { data } = payload
      return { ...state, bus: data, message: '' }
    }
    case ActionTypes.LOAD_BUS_FAILURE: {
      return { ...state, message: 'Cannot find Bus' }
    }
    case ActionTypes.LOAD_SINGLE_BUS_SUCCESS: {
      const { data } = payload
      const { id } = data
      return { ...state, [id]: data, message: '' }
    }
    case ActionTypes.LOAD_SINGLE_BUS_FAILURE: {
      return { ...state, message: 'Cannot find Bus' }
    }
    case ActionTypes.LOAD_DRIVER_BUS_SUCCESS: {
      const { data } = payload
      return { ...state, bus: data, message: '' }
    }
    case ActionTypes.LOAD_DRIVER_BUS_FAILURE: {
      return { ...state, message: 'Cannot find Bus of this Driver' }
    }
    default: {
      return state
    }
  }
}
