// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'

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
    error: '',
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
      hasAll: hasAll,
    }))
  }
  handleChange = name => event => {
    const val = event.target.value
    const { studentsList } = this.props
    const hasAll =
      size(val) === size(studentsList) && name === 'selectedStudents'
        ? true
        : false

    if (val[size(val) - 1] !== 'all') {
      this.setState(() => ({
        [name]: val,
        hasAll: hasAll,
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
      error,
      isLoading,
      type,
      selectedStudents,
      subject,
      message,
      hasAll,
    } = this.state
    const { studentsList } = this.props

    return (
      <AnnouncementsInner
        error={error}
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
