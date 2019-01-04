// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT'
export const CREATE_ANNOUNCEMENT_SUCCESS = 'CREATE_ANNOUNCEMENT_SUCCESS'
export const CREATE_ANNOUNCEMENT_FAILURE = 'CREATE_ANNOUNCEMENT_FAILURE'
export const LOAD_ANNOUNCEMENTS = 'LOAD_ANNOUNCEMENTS'
export const LOAD_ANNOUNCEMENTS_SUCCESS = 'LOAD_ANNOUNCEMENTS_SUCCESS'
export const LOAD_ANNOUNCEMENTS_FAILURE = 'LOAD_ANNOUNCEMENTS_FAILURE'
const baseUrl = getBaseUrl()
export const createAnnouncement = ({
  last_updated,
  title,
  description,
  type,
  studentArray = [],
  token,
}) => ({
  [CALL_API]: {
    types: [
      CREATE_ANNOUNCEMENT,
      CREATE_ANNOUNCEMENT_SUCCESS,
      CREATE_ANNOUNCEMENT_FAILURE,
    ],
    endpoint: `${baseUrl}/school/notification/create`,
    method: 'POST',
    token,
  },
  payload: { title, last_updated, description, type, studentArray },
})

export const loadAnnouncements = ({ token }) => ({
  [CALL_API]: {
    types: [
      LOAD_ANNOUNCEMENTS,
      LOAD_ANNOUNCEMENTS_SUCCESS,
      LOAD_ANNOUNCEMENTS_FAILURE,
    ],
    endpoint: `${baseUrl}/school/notification/list`,
    method: 'GET',
    token,
  },
  payload: {},
})
