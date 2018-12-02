// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_GRADE_SUCCESS: {
      return { ...state, message: 'Grade created Successfully' }
    }
    case ActionTypes.CREATE_GRADE_FAILURE: {
      return { ...state, message: 'Grade Creation Failed' }
    }
    case ActionTypes.EDIT_GRADE_SUCCESS: {
      return { ...state, message: 'Grade Update Successfully' }
    }
    case ActionTypes.EDIT_GRADE_FAILURE: {
      return { ...state, message: 'Grade Update Failed' }
    }
    case ActionTypes.DELETE_GRADE_SUCCESS: {
      return { ...state, message: 'Grade Deleted Successfully' }
    }
    case ActionTypes.DELETE_GRADE_FAILURE: {
      return { ...state, message: 'Grade Deletion Failed' }
    }
    case ActionTypes.LOAD_GRADES_SUCCESS: {
      const { data } = payload
      return { ...state, grades: data, message: '' }
    }
    case ActionTypes.LOAD_GRADES_FAILURE: {
      return { ...state, message: 'Cannot find grades' }
    }
    case ActionTypes.LOAD_SINGLE_GRADE_SUCCESS: {
      const { data } = payload
      const { id } = data
      return { ...state, [id]: data, message: '' }
    }
    case ActionTypes.LOAD_SINGLE_GRADE_FAILURE: {
      return { ...state, message: 'Cannot find grade' }
    }
    default: {
      return state
    }
  }
}
