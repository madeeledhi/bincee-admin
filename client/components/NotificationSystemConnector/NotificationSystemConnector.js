// libs
import React from 'react'
import { connect } from 'react-redux'
import NotificationSystem from 'react-notification-system'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

// src
import { RESET_ERROR_MESSAGE } from '../../actions'
import { hasPropChanged } from '../../utils'
import styles from './NotificationSystemConnector.less'

const mapStateToProps = state => {
  const errorMessage = getOr('', 'errorMessage.message')(state)
  const type = getOr('error', 'errorMessage.type')(state)
  const clearAll = getOr(false, 'errorMessage.clearAll')(state)

  return { errorMessage, type, clearAll }
}

@connect(mapStateToProps)
export default class NotificationSystemConnector extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { errorMessage, type, clearAll } = nextProps
    if (hasPropChanged('errorMessage', this.props, nextProps) && errorMessage) {
      this.errorDidAppear(errorMessage, type)
    } else if (hasPropChanged('clearAll', this.props, nextProps) && clearAll) {
      this.notificationSystem.clearNotifications()
    }
  }

  componentDidMount() {
    const { errorMessage, type, clearAll } = this.props
    if (size(errorMessage) > 0 && size(type) > 0) {
      this.errorDidAppear(errorMessage, type)
    }
    if (clearAll) {
      this.notificationSystem.clearNotifications()
    }
  }

  onRemoveNotification = () => {
    const { dispatch } = this.props
    dispatch({
      type: RESET_ERROR_MESSAGE,
    })
  }

  errorDidAppear(message, type) {
    this.notificationSystem.addNotification({
      message,
      level: type,
      position: 'br',
      autoDismiss: 5,
      onRemove: this.onRemoveNotification,
    })
  }

  notificationSystem = null

  render() {
    return (
      <div className={styles.root}>
        <NotificationSystem
          ref={ref => {
            this.notificationSystem = ref
          }}
        />
      </div>
    )
  }
}
