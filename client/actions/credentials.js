// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const SEND_CREDENTIALS = 'SEND_CREDENTIALS'
export const SEND_CREDENTIALS_SUCCESS = 'SEND_CREDENTIALS_SUCCESS'
export const SEND_CREDENTIALS_FAILURE = 'SEND_CREDENTIALS_FAILURE'

const baseUrl = getBaseUrl()

export const sendCredentials = ({
  username,
  password,
  type,
  email,
  phone_no,
  token,
}) => ({
  [CALL_API]: {
    types: [
      SEND_CREDENTIALS,
      SEND_CREDENTIALS_SUCCESS,
      SEND_CREDENTIALS_FAILURE,
    ],
    endpoint: `${baseUrl}/users/credentials`,
    method: 'POST',
    token,
  },
  payload: { username, password, type, email, phone_no },
})
