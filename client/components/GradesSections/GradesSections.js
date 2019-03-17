// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import XLSX from 'xlsx'

// src
import transformData from './transformers/transformData'
import { hasPropChanged, exportData } from '../../utils'
import { verify, filterSheet } from './utils'

import {
  createGrade,
  loadGrades,
  deleteGrade,
  showErrorMessage,
} from '../../actions'
import GradesSectionsInner from './GradesSectionsInner'

class GradesSections extends React.Component {
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
      dispatch(loadGrades({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      hasPropChanged(['user', 'grades', 'gradesList'], this.props, nextProps)
    ) {
      const { dispatch, user, grades, error } = nextProps
      const { token } = user
      if (size(grades) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadGrades({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  handleDeleteGrade = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    this.setState(() => ({ isLoading: true }))
    dispatch(deleteGrade({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      dispatch(loadGrades({ token }))
    })
  }

  handleCreateGrade = () => {
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateGrade = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadGrades({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  exportData = () => {
    const { rawGrades } = this.props
    const { grades } = rawGrades
    if (size(grades) > 0) {
      exportData(grades, 'Grades')
    } else {
      exportData([{ grade_name: '', section: '', grade_section: '' }], 'Grades')
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
        const jsonResult = XLSX.utils.sheet_to_json(workbook.Sheets['Grades'])
        if (size(jsonResult) < 1) {
          dispatch(showErrorMessage('No Data Found in Sheet', 'error'))
        } else {
          if (verify(jsonResult)) {
            const filteredSheet = filterSheet(jsonResult)
            this.setState(() => ({ isLoading: true }))
            const createdPromise = map(row => {
              const { grade_name, section } = row
              const grade_section = `${grade_name} ${section}`
              return dispatch(
                createGrade({
                  grade_name,
                  section,
                  grade_section,
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
              const createdGrades = filter(item => item === true)(response)
              const total = size(jsonResult)
              const created = size(createdGrades)
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
              dispatch(loadGrades({ token }))
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
    const { error, isLoading, createDialog, editDialog, editId } = this.state
    const { grades } = this.props
    const { columns: rows, rows: data } = grades

    return (
      <GradesSectionsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        importData={this.importData}
        onDataExport={this.exportData}
        onDeleteGrade={this.handleDeleteGrade}
        onCreateGrade={this.handleCreateGrade}
        onUpdateGrade={this.handleUpdateGrade}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = state => {
  const grades = getOr({}, 'grades')(state)
  const user = getOr({}, 'user')(state)
  const gradesList = getOr([], 'grades')(grades)
  const error = getOr('', 'message')(grades)
  const transformedGrades = transformData(gradesList)
  return { grades: transformedGrades, user, rawGrades: grades, error }
}

export default connect(mapStateToProps)(GradesSections)
