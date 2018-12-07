// src
import { CALL_API } from '../middleware/api'

export const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS'
export const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE'

export const uploadImage = ({ id, user, image, token }) => ({
  [CALL_API]: {
    types: [UPLOAD_PHOTO, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/avatar/upload',
    method: 'POST',
    token,
    content: 'image',
  },
  payload: image,
  meta: { id, user },
})
