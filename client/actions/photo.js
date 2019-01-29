// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS'
export const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE'
const baseUrl = getBaseUrl()

export const uploadImage = ({ id, user, image, token }) => ({
  [CALL_API]: {
    types: [UPLOAD_PHOTO, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_FAILURE],
    endpoint: `${baseUrl}/avatar/upload`,
    method: 'POST',
    token,
    content: 'image',
  },
  payload: image,
  meta: { id, user },
})
