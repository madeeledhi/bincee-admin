// src
import { CALL_API } from '../middleware/api'

export const CREATE_GRADE = 'CREATE_GRADE'
export const CREATE_GRADE_SUCCESS = 'CREATE_GRADE_SUCCESS'
export const CREATE_GRADE_FAILURE = 'CREATE_GRADE_FAILURE'
export const EDIT_GRADE = 'EDIT_GRADE'
export const EDIT_GRADE_SUCCESS = 'EDIT_GRADE_SUCCESS'
export const EDIT_GRADE_FAILURE = 'EDIT_GRADE_FAILURE'
export const DELETE_GRADE = 'DELETE_GRADE'
export const DELETE_GRADE_SUCCESS = 'DELETE_GRADE_SUCCESS'
export const DELETE_GRADE_FAILURE = 'DELETE_GRADE_FAILURE'
export const LOAD_GRADES = 'LOAD_GRADES'
export const LOAD_GRADES_SUCCESS = 'LOAD_GRADES_SUCCESS'
export const LOAD_GRADES_FAILURE = 'LOAD_GRADES_FAILURE'
export const LOAD_SINGLE_GRADE = 'LOAD_SINGLE_GRADE'
export const LOAD_SINGLE_GRADE_SUCCESS = 'LOAD_SINGLE_GRADE_SUCCESS'
export const LOAD_SINGLE_GRADE_FAILURE = 'LOAD_SINGLE_GRADE_FAILURE'

export const createGrade = ({ grade_name, section, grade_section, token }) => ({
  [CALL_API]: {
    types: [CREATE_GRADE, CREATE_GRADE_SUCCESS, CREATE_GRADE_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/school/grade/create',
    method: 'POST',
  },
  payload: { grade_name, section, grade_section, token },
})

export const editGrade = ({
  id,
  grade_name,
  section,
  grade_section,
  token,
}) => ({
  [CALL_API]: {
    types: [EDIT_GRADE, EDIT_GRADE_SUCCESS, EDIT_GRADE_FAILURE],
    endpoint: `https://bincee-server.herokuapp.com/api/school/grade/${id}`,
    method: 'POST',
  },
  payload: { grade_name, section, grade_section, token },
})

export const loadSingleGrade = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_SINGLE_GRADE,
      LOAD_SINGLE_GRADE_SUCCESS,
      LOAD_SINGLE_GRADE_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/school/grade/${id}`,
    method: 'GET',
  },
  payload: { token },
})

export const deleteGrade = ({ id, token }) => ({
  [CALL_API]: {
    types: [DELETE_GRADE, DELETE_GRADE_SUCCESS, DELETE_GRADE_FAILURE],
    endpoint: `https://bincee-server.herokuapp.com/api/school/grade/${id}`,
    method: 'DELETE',
  },
  payload: { token },
})

export const loadGrades = ({ token }) => ({
  [CALL_API]: {
    types: [LOAD_GRADES, LOAD_GRADES_SUCCESS, LOAD_GRADES_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/school/grade/list',
    method: 'GET',
  },
  payload: { token },
})
