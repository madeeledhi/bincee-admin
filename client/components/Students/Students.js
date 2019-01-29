// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import transformData, {
  transformDrawerData,
} from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import {
  loadStudents,
  deleteStudent,
  loadSingleDriver,
  loadSingleParent,
  loadSingleGrade,
  loadSingleShift,
} from '../../actions'
import StudentsInner from './StudentsInner'
import InfoDrawer from '../InfoDrawer'
import Drawer from '../Drawer'

class Students extends React.Component {
  state = {
    error: '',
    isLoading: true,
    createDialog: false,
    editDialog: false,
    editId: '',
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadStudents({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'students'], this.props, nextProps)) {
      const { dispatch, user, students, error } = nextProps
      const { token } = user
      if (size(students) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadStudents({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  handleDeleteStudent = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    this.setState(() => ({ isLoading: true }))
    dispatch(deleteStudent({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      dispatch(loadStudents({ token }))
    })
  }

  handleCreateStudent = () => {
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateStudent = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadStudents({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  handleRowClick = data => {
    const { triggerDrawer, dispatch, user, onDrawerClose } = this.props
    const {
      driver_id,
      parent_id,
      grade,
      shift_morning,
      shift_evening,
      id,
      fullname,
      photo,
      status,
    } = data
    const { token } = user
    onDrawerClose()

    this.setState(() => ({ isLoading: true }))
    dispatch(
      loadSingleDriver({
        id: driver_id,
        token,
      }),
    ).then(({ payload: driverPayload }) => {
      const { data: driverData } = driverPayload
      if (driverPayload.status === 200) {
        dispatch(
          loadSingleParent({
            id: parent_id,
            token,
          }),
        ).then(({ payload: parentPayload }) => {
          const { data: parentData } = parentPayload

          if (parentPayload.status === 200) {
            dispatch(loadSingleGrade({ id: grade, token })).then(
              ({ payload: gradePayload }) => {
                const { data: gradeData } = gradePayload
                if (gradePayload.status === 200) {
                  dispatch(
                    loadSingleShift({
                      id: shift_morning,
                      token,
                    }),
                  ).then(({ payload: morningShiftPayload }) => {
                    const { data: morningShiftData } = morningShiftPayload
                    if (morningShiftPayload.status === 200) {
                      dispatch(
                        loadSingleShift({
                          id: shift_evening,
                          token,
                        }),
                      ).then(({ payload: eveningShiftPayload }) => {
                        const { data: eveningShiftData } = eveningShiftPayload
                        if (eveningShiftPayload.status === 200) {
                          const dataToShow = transformDrawerData({
                            student: {
                              id,
                              fullname,
                              status,
                              photo,
                            },
                            driver: driverData,
                            parent: parentData,
                            grade: gradeData,
                            shiftMorning: morningShiftData,
                            shiftEvening: eveningShiftData,
                          })

                          this.setState(() => ({
                            isLoading: false,
                          }))
                          triggerDrawer({
                            title: 'Student Content',
                            content: <Drawer data={dataToShow} />,
                          })
                        }
                      })
                    }
                  })
                }
              },
            )
          }
        })
      }
    })
  }

  render() {
    const { error, isLoading, createDialog, editDialog, editId } = this.state
    const { students } = this.props
    const { columns: rows, rows: data } = students

    return (
      <StudentsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onDeleteStudent={this.handleDeleteStudent}
        onCreateStudent={this.handleCreateStudent}
        onUpdateStudent={this.handleUpdateStudent}
        onRowClick={this.handleRowClick}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = state => {
  const students = getOr({}, 'students')(state)
  const user = getOr({}, 'user')(state)
  const studentsList = getOr([], 'students')(students)
  const error = getOr('', 'message')(students)
  const transformedStudents = transformData(studentsList)
  return { students: transformedStudents, user, error }
}

const drawerSettings = { style: {} }
export default InfoDrawer(drawerSettings)(connect(mapStateToProps)(Students))
