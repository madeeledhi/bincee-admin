// src
import * as ActionTypes from '../actions'

const initialState = {}
const defaultFilters = {
  config: {},
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_ANNOUNCEMENT_SUCCESS: {
      return { ...state, message: 'Announcement created Successfully' }
    }
    case ActionTypes.CREATE_ANNOUNCEMENT_FAILURE: {
      return { ...state, message: 'Announcement Creation Failed' }
    }
    case ActionTypes.LOAD_ANNOUNCEMENTS_SUCCESS: {
      const { data } = payload
      return { ...state, announcements: data, message: '' }
    }
    case ActionTypes.LOAD_ANNOUNCEMENTS_FAILURE: {
      return { ...state, message: 'Cannot find Announcements' }
    }
    case ActionTypes.UPDATE_ANNOUNCEMENTS_FILTERS: {
      const { filters } = payload || {}
      const filtersPayload = { ...defaultFilters, ...filters }
      return {
        ...state,
        filters: filtersPayload,
      }
    }
    default: {
      return state
    }
  }
}
