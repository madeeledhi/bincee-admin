import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { connect } from 'react-redux'
import map from 'lodash/fp/map'
import keys from 'lodash/fp/keys'
import has from 'lodash/fp/has'
import getOr from 'lodash/fp/getOr'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import startCase from 'lodash/fp/startCase'
import CircularProgress from '@material-ui/core/CircularProgress'

// src
import Button from '../../Button'
import { hasPropChanged } from '../../../utils'
import styles from './DrawerContent.less'

class DrawerContent extends React.Component {
  state = {
    isSending: false,
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged('sending', this.props, nextProps)) {
      const { sending } = nextProps
      this.setState(() => ({ isSending: sending }))
    }
  }

  render() {
    const { data, sendCredentials = () => true } = this.props
    const { isSending } = this.state
    const headings = keys(data)
    return (
      <div className={styles.main}>
        {map(heading => {
          const current = data[heading]
          const hasPhoto = has('photo')(current)
          const { isParent, isDriver, hasCredentials } = current
          const currentKeys = flow(
            keys,
            filter(
              key =>
                key !== 'photo' &&
                key !== 'isDriver' &&
                key !== 'isParent' &&
                key !== 'isStudent' &&
                key !== 'hasCredentials',
            ),
          )(current)
          return (
            <div className={styles.divider}>
              <h4 className={styles.heading}>{startCase(heading)}</h4>
              {hasPhoto && (
                <Avatar
                  alt="Remy Sharp"
                  src={
                    current.photo ||
                    `/images/profile${
                      isDriver ? 'Driver' : isParent ? 'Parent' : 'Student'
                    }.png`
                  }
                  className={styles.avatar}
                />
              )}
              {map(key => {
                const currentValue = current[key]
                return (
                  <div className={styles.keyConainer}>
                    <label className={styles.label}>{startCase(key)} :</label>
                    <span className={styles.keyValue}>{currentValue}</span>
                  </div>
                )
              })(currentKeys)}
              {hasCredentials && !isSending && (
                <div className={styles.actionItem}>
                  <Button
                    onClick={e => sendCredentials()}
                    label="Send Credentials"
                    style={{}}
                  />
                </div>
              )}
              {hasCredentials && isSending && (
                <div className={styles.center}>
                  <CircularProgress
                    classes={{ root: styles.circularLogin }}
                    size={20}
                  />
                  <h4 className={styles.loadingText}>
                    {'Sending Credentials'}
                  </h4>
                </div>
              )}
            </div>
          )
        })(headings)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const sending = getOr({}, 'credentials.sending')(state)
  return { sending }
}

export default connect(mapStateToProps)(DrawerContent)
