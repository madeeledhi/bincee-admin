// src
import * as ActionTypes from '../actions'

export default (state = {}, action) => {
  const { type, payload, meta } = action
  switch (type) {
    case ActionTypes.UPLOAD_PHOTO_SUCCESS: {
      const { data } = payload
      return { ...state, [meta.user]: { [meta.id]: data } }
    }
    case ActionTypes.UPLOAD_PHOTO_FAILURE: {
      const { data } = payload
      return { ...state, [meta.user]: { [meta.id]: data } }
    }
    default: {
      return state
    }
  }
}
