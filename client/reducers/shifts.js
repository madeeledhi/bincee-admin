// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_SHIFT_SUCCESS: {
      return { ...state, message: 'Shift created Successfully' }
    }
    case ActionTypes.CREATE_SHIFT_FAILURE: {
      return { ...state, message: 'Shift Creation Failed' }
    }
    case ActionTypes.EDIT_SHIFT_SUCCESS: {
      return { ...state, message: 'Shift Update Successfully' }
    }
    case ActionTypes.EDIT_SHIFT_FAILURE: {
      return { ...state, message: 'Shift Update Failed' }
    }
    case ActionTypes.DELETE_SHIFT_SUCCESS: {
      return { ...state, message: 'Shift Deleted Successfully' }
    }
    case ActionTypes.DELETE_SHIFT_FAILURE: {
      return { ...state, message: 'Shift Deletion Failed' }
    }
    case ActionTypes.LOAD_SHIFTS_SUCCESS: {
      const { data } = payload
      return { ...state, shifts: data, message: '' }
    }
    case ActionTypes.LOAD_SHIFTS_FAILURE: {
      return { ...state, message: 'Cannot find Shifts' }
    }
    case ActionTypes.LOAD_SINGLE_SHIFT_SUCCESS: {
      const { data } = payload
      const { shift_id } = data
      return { ...state, [shift_id]: data, message: '' }
    }
    case ActionTypes.LOAD_SINGLE_SHIFT_FAILURE: {
      return { ...state, message: 'Cannot find Shift' }
    }
    default: {
      return state
    }
  }
}
