// src
import { CALL_API } from '../middleware/api'

export * from './app'
export * from './user'
export * from './userDetails'
export * from './grades'
export * from './drivers'
export * from './parents'
export * from './bus'
export * from './students'
export * from './shifts'
export * from './leaves'
export * from './photo'
export * from './announcements'

export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const CLEAR_ERROR_MESSAGES = 'CLEAR_ERROR_MESSAGES'

export const showErrorMessage = (errorMessage, type) => ({
  type: SHOW_ERROR_MESSAGE,
  error: true,
  payload: {
    message: errorMessage || 'Something bad happened.',
    type,
  },
})

export const clearErrorMessages = () => ({
  [CALL_API]: { type: CLEAR_ERROR_MESSAGES },
})
