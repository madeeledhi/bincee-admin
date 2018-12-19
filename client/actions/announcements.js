// src
import { CALL_API } from '../middleware/api'

export const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT'
export const CREATE_ANNOUNCEMENT_SUCCESS = 'CREATE_ANNOUNCEMENT_SUCCESS'
export const CREATE_ANNOUNCEMENT_FAILURE = 'CREATE_ANNOUNCEMENT_FAILURE'
export const LOAD_ANNOUNCEMENTS = 'LOAD_ANNOUNCEMENTS'
export const LOAD_ANNOUNCEMENTS_SUCCESS = 'LOAD_ANNOUNCEMENTS_SUCCESS'
export const LOAD_ANNOUNCEMENTS_FAILURE = 'LOAD_ANNOUNCEMENTS_FAILURE'

export const createAnnouncement = ({
  last_updated,
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
    endpoint:
      'https://bincee-server.herokuapp.com/api/school/notification/create',
    method: 'POST',
    token,
  },
  payload: { last_updated, description, type, studentArray },
})

export const loadAnnouncements = ({ token }) => ({
  [CALL_API]: {
    types: [
      LOAD_ANNOUNCEMENTS,
      LOAD_ANNOUNCEMENTS_SUCCESS,
      LOAD_ANNOUNCEMENTS_FAILURE,
    ],
    endpoint:
      'https://bincee-server.herokuapp.com/api/school/notification/list',
    method: 'GET',
    token,
  },
  payload: {},
})
