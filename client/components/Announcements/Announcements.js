// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'

// src
import { hasPropChanged } from '../../utils'
import { loadStudents, createAnnouncement } from '../../actions'
import AnnouncementsInner from './AnnouncementsInner'

class Announcements extends React.Component {
  state = {
    error: '',
    isLoading: true,
    sendTo: 'all',
    selectedStudents: [],
    subject: '',
    message: '',
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
  handleChange = name => event => {
    const val = event.target.value
    this.setState(() => ({
      [name]: val,
    }))
  }
  sendNotification = () => {}

  render() {
    const {
      error,
      isLoading,
      sendTo,
      selectedStudents,
      subject,
      message,
    } = this.state
    const { studentsList } = this.props

    return (
      <AnnouncementsInner
        error={error}
        handleChange={this.handleChange}
        isLoading={isLoading}
        students={studentsList}
        sendTo={sendTo}
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
