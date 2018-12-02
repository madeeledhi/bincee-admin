// src
import { CALL_API } from '../middleware/api'

export const CREATE_STUDENT = 'CREATE_STUDENT'
export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS'
export const CREATE_STUDENT_FAILURE = 'CREATE_STUDENT_FAILURE'
export const EDIT_STUDENT = 'EDIT_STUDENT'
export const EDIT_STUDENT_SUCCESS = 'EDIT_STUDENT_SUCCESS'
export const EDIT_STUDENT_FAILURE = 'EDIT_STUDENT_FAILURE'
export const DELETE_STUDENT = 'DELETE_STUDENT'
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS'
export const DELETE_STUDENT_FAILURE = 'DELETE_STUDENT_FAILURE'
export const LOAD_STUDENTS = 'LOAD_STUDENTS'
export const LOAD_STUDENTS_SUCCESS = 'LOAD_STUDENTS_SUCCESS'
export const LOAD_STUDENTS_FAILURE = 'LOAD_STUDENTS_FAILURE'
export const LOAD_SINGLE_STUDENT = 'LOAD_SINGLE_STUDENT'
export const LOAD_SINGLE_STUDENT_SUCCESS = 'LOAD_SINGLE_STUDENT_SUCCESS'
export const LOAD_SINGLE_STUDENT_FAILURE = 'LOAD_SINGLE_STUDENT_FAILURE'
export const LOAD_PARENT_STUDENTS = 'LOAD_PARENT_STUDENTS'
export const LOAD_PARENT_STUDENTS_SUCCESS = 'LOAD_PARENT_STUDENTS_SUCCESS'
export const LOAD_PARENT_STUDENTS_FAILURE = 'LOAD_PARENT_STUDENTS_FAILURE'

export const createStudent = ({
  fullname,
  status,
  photo,
  grade,
  shift,
  parent_id,
  driver_id,
  token,
}) => ({
  [CALL_API]: {
    types: [CREATE_STUDENT, CREATE_STUDENT_FAILURE, CREATE_STUDENT_SUCCESS],
    endpoint: 'https://bincee-server.herokuapp.com/api/school/student/create',
    method: 'POST',
    token,
  },
  payload: { fullname, status, photo, grade, shift, parent_id, driver_id },
})

export const updateSTUDENT = ({
  id,
  fullname,
  status,
  photo,
  grade,
  shift,
  parent_id,
  driver_id,
  token,
}) => ({
  [CALL_API]: {
    types: [EDIT_STUDENT, EDIT_STUDENT_SUCCESS, EDIT_STUDENT_FAILURE],
    endpoint: `https://bincee-server.herokuapp.com/api/school/student/${id}`,
    method: 'POST',
    token,
  },
  payload: { fullname, status, photo, grade, shift, parent_id, driver_id },
})

export const loadSingleStudent = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_SINGLE_STUDENT,
      LOAD_SINGLE_STUDENT_SUCCESS,
      LOAD_SINGLE_STUDENT_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/school/student/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})

export const deleteStudent = ({ id, token }) => ({
  [CALL_API]: {
    types: [DELETE_STUDENT, DELETE_STUDENT_SUCCESS, DELETE_STUDENT_FAILURE],
    endpoint: `https://bincee-server.herokuapp.com/api/school/student/${id}`,
    method: 'DELETE',
    token,
  },
  payload: {},
})

export const loadStudents = ({ token }) => ({
  [CALL_API]: {
    types: [LOAD_STUDENTS, LOAD_STUDENTS_SUCCESS, LOAD_STUDENTS_FAILURE],
    endpoint: 'https://bincee-server.herokuapp.com/api/school/student/list',
    method: 'GET',
    token,
  },
  payload: {},
})

export const loadParentStudents = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_PARENT_STUDENTS,
      LOAD_PARENT_STUDENTS_SUCCESS,
      LOAD_PARENT_STUDENTS_FAILURE,
    ],
    endpoint: `https://bincee-server.herokuapp.com/api/school/parent/student/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})
