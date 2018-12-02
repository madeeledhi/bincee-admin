// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_STUDENT_SUCCESS: {
      return { ...state, message: 'Student created Successfully' }
    }
    case ActionTypes.CREATE_STUDENT_FAILURE: {
      return { ...state, message: 'Student Creation Failed' }
    }
    case ActionTypes.EDIT_STUDENT_SUCCESS: {
      return { ...state, message: 'Student Update Successfully' }
    }
    case ActionTypes.EDIT_STUDENT_FAILURE: {
      return { ...state, message: 'Student Update Failed' }
    }
    case ActionTypes.DELETE_STUDENT_SUCCESS: {
      return { ...state, message: 'Student Deleted Successfully' }
    }
    case ActionTypes.DELETE_STUDENT_FAILURE: {
      return { ...state, message: 'Student Deletion Failed' }
    }
    case ActionTypes.LOAD_STUDENTS_SUCCESS: {
      const { data } = payload
      return { ...state, students: data, message: '' }
    }
    case ActionTypes.LOAD_STUDENTS_FAILURE: {
      return { ...state, message: 'Cannot find Student' }
    }
    case ActionTypes.LOAD_PARENT_STUDENTS_SUCCESS: {
      const { data } = payload
      return { ...state, students: data, message: '' }
    }
    case ActionTypes.LOAD_PARENT_STUDENTS_FAILURE: {
      return { ...state, message: 'Cannot find Student for this Parent' }
    }
    case ActionTypes.LOAD_SINGLE_STUDENT_SUCCESS: {
      const { data } = payload
      const { id } = data
      return { ...state, [id]: data, message: '' }
    }
    case ActionTypes.LOAD_SINGLE_STUDENT_FAILURE: {
      return { ...state, message: 'Cannot find Student' }
    }
    default: {
      return state
    }
  }
}
