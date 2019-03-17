// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import XLSX from 'xlsx'

// src
import transformData, {
  transformDrawerData,
} from './transformers/transformData'
import { hasPropChanged, exportData } from '../../utils'
import { verify, filterSheet } from './utils'
import {
  createStudent,
  showErrorMessage,
  loadStudents,
  deleteStudent,
  loadSingleDriver,
  loadSingleParent,
  loadSingleGrade,
  loadSingleShift,
} from '../../actions'
import StudentsInner from './StudentsInner'

class Students extends React.Component {
  state = {
    error: '',
    isLoading: true,
    createDialog: false,
    editDialog: false,
    editId: '',
    drawerData: {},
    dataIsAvailable: false,
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
    const { dispatch, user } = this.props
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

    this.setState(() => ({ dataIsAvailable: false }))
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
                            drawerData: dataToShow,
                            dataIsAvailable: true,
                          }))
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

  exportData = () => {
    const { rawStudents } = this.props
    const { students } = rawStudents
    if (size(students) > 0) {
      exportData(students, 'Students')
    } else {
      exportData(
        [
          {
            fullname: '',
            grade: '',
            shift_morning: '',
            shift_evening: '',
            parent_id: '',
            driver_id: '',
            status: '',
          },
        ],
        'Students',
      )
    }
  }

  importData = event => {
    const { dispatch, user } = this.props
    const { token } = user
    const [selectedFile] = event.target.files
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = e => {
        const xlsrow = e.target.result
        const workbook = XLSX.read(xlsrow, { type: 'buffer' })
        const jsonResult = XLSX.utils.sheet_to_json(workbook.Sheets['Students'])
        if (size(jsonResult) < 1) {
          dispatch(showErrorMessage('No Data Found in Sheet', 'error'))
        } else {
          if (verify(jsonResult)) {
            const filteredSheet = filterSheet(jsonResult)
            this.setState(() => ({ isLoading: true }))
            const createdPromise = map(row => {
              const {
                fullname,
                status,
                photo,
                grade,
                shift_morning = null,
                shift_evening = null,
                parent_id,
                driver_id,
              } = row
              return dispatch(
                createStudent({
                  fullname,
                  status,
                  photo,
                  grade,
                  shift_morning,
                  shift_evening,
                  parent_id,
                  driver_id,
                  token,
                }),
              )
                .then(({ payload }) => {
                  const { status } = payload
                  return status === 200
                })
                .catch(err => false)
            })(filteredSheet)
            Promise.all(createdPromise).then(response => {
              const createdStudents = filter(item => item === true)(response)
              const total = size(jsonResult)
              const created = size(createdStudents)
              if (created > 0) {
                dispatch(
                  showErrorMessage(`${created} Records Created`, 'success'),
                )
              }
              if (total - created > 0) {
                dispatch(
                  showErrorMessage(
                    `${total - created} Records Rejected`,
                    'error',
                  ),
                )
              }
              this.setState(() => ({ isLoading: false }))
              dispatch(loadStudents({ token }))
            })
          } else {
            dispatch(showErrorMessage('Invalid Data in Sheet', 'error'))
          }
        }
      }
      reader.readAsArrayBuffer(selectedFile)
    }
  }

  render() {
    const {
      error,
      isLoading,
      createDialog,
      editDialog,
      editId,
      drawerData,
      dataIsAvailable,
    } = this.state
    const { students } = this.props
    const { columns: rows, rows: data } = students

    return (
      <StudentsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        importData={this.importData}
        onDataExport={this.exportData}
        onDeleteStudent={this.handleDeleteStudent}
        onCreateStudent={this.handleCreateStudent}
        onUpdateStudent={this.handleUpdateStudent}
        onRowClick={this.handleRowClick}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
        sendCredentials={this.handleSendCredentials}
        drawerData={drawerData}
        dataIsAvailable={dataIsAvailable}
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
  return { students: transformedStudents, user, rawStudents: students, error }
}

export default connect(mapStateToProps)(Students)
