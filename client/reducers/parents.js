// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_PARENT_SUCCESS: {
      return { ...state, message: 'Parent created Successfully' }
    }
    case ActionTypes.CREATE_PARENT_FAILURE: {
      return { ...state, message: 'Parent Creation Failed' }
    }
    case ActionTypes.EDIT_PARENT_SUCCESS: {
      return { ...state, message: 'Parent Update Successfully' }
    }
    case ActionTypes.EDIT_PARENT_FAILURE: {
      return { ...state, message: 'Parent Update Failed' }
    }
    case ActionTypes.EDIT_PARENT_CREDENTIALS_SUCCESS: {
      return { ...state, message: 'Parent Credentials Update Successfully' }
    }
    case ActionTypes.EDIT_PARENT_CREDENTIALS_FAILURE: {
      return { ...state, message: 'Parent Credentials Update Failed' }
    }
    case ActionTypes.DELETE_PARENT_SUCCESS: {
      return { ...state, message: 'Parent Deleted Successfully' }
    }
    case ActionTypes.DELETE_PARENT_FAILURE: {
      return { ...state, message: 'Parent Deletion Failed' }
    }
    case ActionTypes.LOAD_PARENTS_SUCCESS: {
      const { data } = payload
      return { ...state, parents: data, message: '' }
    }
    case ActionTypes.LOAD_PARENTS_FAILURE: {
      return { ...state, message: 'Cannot find Parent' }
    }
    case ActionTypes.LOAD_SINGLE_PARENT_SUCCESS: {
      const { data } = payload
      const { id } = data
      return { ...state, [id]: data, message: '' }
    }
    case ActionTypes.LOAD_SINGLE_PARENT_FAILURE: {
      return { ...state, message: 'Cannot find Parent' }
    }
    default: {
      return state
    }
  }
}
