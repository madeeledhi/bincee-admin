// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import { hasPropChanged } from '../../utils'
import {
  loadStudents,
  createAnnouncement,
  showErrorMessage,
} from '../../actions'
import AnnouncementsInner from './AnnouncementsInner'

class Announcements extends React.Component {
  state = {
    errors: {
      subject: 'Required',
      message: 'Required',
    },
    studentError: '',
    isLoading: true,
    type: 'school',
    selectedStudents: [],
    subject: '',
    message: '',
    hasAll: false,
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

  handleChangeAll = event => {
    const { studentsList } = this.props
    const val = event.target.checked ? studentsList : []
    const hasAll = event.target.checked
    this.setState(() => ({
      selectedStudents: val,
      hasAll,
    }))
  }

  handleChange = name => event => {
    const val = event.target.value
    const { studentsList } = this.props
    const { errors, type, selectedStudents } = this.state
    const hasAll =
      size(val) === size(studentsList) && name === 'selectedStudents'
    const newErrors =
      name === 'selectedStudents' || name === 'type'
        ? errors
        : {
            ...errors,
            [name]: size(val) > 0 ? undefined : 'Required',
          }

    const studentError =
      type === 'student' || val === 'student'
        ? (name === 'selectedStudents' && size(val) < 1) ||
          (name === 'type' && val === 'student' && size(selectedStudents) < 1)
          ? 'Required'
          : undefined
        : undefined

    if (val[size(val) - 1] !== 'all') {
      this.setState(() => ({
        [name]: val,
        hasAll,
        errors: newErrors,
        studentError,
      }))
    }
  }

  sendNotification = () => {
    const { dispatch, user } = this.props
    const { token } = user
    const { type, selectedStudents, subject, message } = this.state
    const last_updated = new Date()
    createAnnouncement({})
    dispatch(
      createAnnouncement({
        title: subject,
        last_updated,
        description: message,
        type,
        studentArray: selectedStudents,
        token,
      }),
    ).then(({ payload }) => {
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        dispatch(showErrorMessage('Created successfully', 'success'))
      }
    })
  }

  render() {
    const {
      errors,
      isLoading,
      type,
      selectedStudents,
      subject,
      message,
      hasAll,
      studentError,
    } = this.state
    const { studentsList } = this.props
    const disabled = studentError || errors.message || errors.subject
    return (
      <AnnouncementsInner
        errors={errors}
        disabled={disabled}
        studentError={studentError}
        hasAll={hasAll}
        handleChange={this.handleChange}
        handleChangeAll={this.handleChangeAll}
        isLoading={isLoading}
        students={studentsList}
        type={type}
        selectedStudents={selectedStudents}
        subject={subject}
        message={message}
        sendNotification={this.sendNotification}
      />
    )
  }
}

const mapStateToProps = state => {
  const students = getOr({}, 'students')(state)
  const user = getOr({}, 'user')(state)
  const studentsList = getOr([], 'students')(students)
  const error = getOr('', 'message')(students)
  return { studentsList, user, error }
}
export default connect(mapStateToProps)(Announcements)
