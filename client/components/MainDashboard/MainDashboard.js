//  libs
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import moment from 'moment'

//  src
import MainDashboardInner from './MainDashboardInner'
import Button from '../Button'
import { hasPropChanged, parseLocation } from '../../utils'
import { loadUser, logOut, loadUserDetails } from '../../actions'
import styles from './MainDashboard.less'

const possibleFormat = ['DD-MMM-YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY']
const requiredFormat = 'DD-MMM-YYYY'

function getTrialCheck(date, limit = 0, isTrialUser = false) {
  const expireDate = moment(date, possibleFormat).add(limit, 'days')
  const CurrentDate = moment(new Date(), possibleFormat)
  const RemainingDays = expireDate.diff(CurrentDate, 'days')
  const isTrialExpired = RemainingDays < 0 && limit > 0
  return {
    expirationDate: expireDate.format(requiredFormat),
    RemainingDays,
    isTrialExpired,
    isTrialUser,
  }
}

class MainDashboard extends Component {
  constructor(props) {
    super(props)
    const { user = {}, userDetails = {}, location = {} } = props
    const { pathname = '' } = location
    this.state = {
      disabled: false,
      isLoading: true,
      user,
      userDetails,
      activePath: parseLocation(pathname),
    }
  }

  componentDidMount() {
    const { dispatch, user, authenticated } = this.props
    if (!authenticated) {
      try {
        const serializedUser = localStorage.getItem('user')
        if (serializedUser === null) {
          dispatch(push('/'))
        }
      } catch (err) {
        dispatch(push('/'))
      }
    }
    if (!user.username) {
      dispatch(loadUser())
    } else {
      const { id, token } = user
      dispatch(loadUserDetails({ id, token }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      hasPropChanged(
        ['userDetails', 'user', 'authenticated'],
        this.props,
        nextProps,
      )
    ) {
      const { user, authenticated, dispatch, userDetails } = nextProps
      this.setState(() => ({ user }))
      if (!authenticated) {
        dispatch(push('/'))
      }
      if (size(userDetails) < 1 && authenticated) {
        const { id, token } = user
        this.setState(() => ({ user, isLoading: true }))
        dispatch(loadUserDetails({ id, token }))
      } else {
        this.setState(() => ({ userDetails, isLoading: false }))
      }
    }
    if (hasPropChanged('location', this.props, nextProps)) {
      const { location } = nextProps
      const { pathname } = location
      const activePath = parseLocation(pathname)
      this.setState(() => ({ activePath }))
    }

    const { location, userDetails } = nextProps
    const { pathname } = location
    const { lat, lng } = userDetails || {}

    if (size(userDetails) > 1) {
      this.setState(() => ({ isLoading: false }))
    }

    if ((!lat || !lng) && pathname !== '/dashboard/profile') {
      this.setState(() => ({ disabled: true }))
    } else {
      this.setState(() => ({ disabled: false }))
    }
  }

  handleSignOut = () => {
    const { dispatch } = this.props
    dispatch(logOut())
  }

  handleRouteChange = route => {
    const { dispatch } = this.props
    dispatch(push(route))
  }

  render() {
    const { match, authenticated, error } = this.props
    const { isLoading, user, userDetails, activePath, disabled } = this.state
    const path = getOr('/dashboard', 'path')(match)
    const { trial = false, trialDays, trialDate } = userDetails
    console.log(
      'dashboard: {authenticated} {isLoading}, {path} ',
      authenticated,
      isLoading,
      activePath,
    )
    const trialDetails = getTrialCheck(trialDate, trialDays, trial)

    return (
      <div>
        <MainDashboardInner
          path={path}
          onClickSignout={this.handleSignOut}
          user={user}
          userDetails={userDetails}
          error={error}
          isLoading={isLoading}
          authenticated={authenticated}
          onRouteChange={this.handleRouteChange}
          activePath={activePath}
          trial={trialDetails}
        />
        {disabled && size(userDetails) > 0 && (
          <Dialog open disableBackdropClick disableEscapeKeyDown>
            <DialogTitle id="simple-dialog-title">
              {'Set Default Location'}
            </DialogTitle>
            <DialogContent>
              <div className={styles.main}>
                <div className={styles.wrap}>
                  <div className={styles.text}>
                    <img src={'/images/blank.png'} />
                    <div className={styles.texter}>
                      {'Set Default Location of School To Get Started'}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => this.handleRouteChange('/dashboard/profile')}
                label="Edit Profile"
                style={{
                  backgroundColor: '#0adfbd',
                  borderColor: '#0adfbd',
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const user = getOr(null, 'user')(state)
  const userDetails = getOr({}, 'userDetails')(state)
  const error = getOr('', 'message')(userDetails)
  const authenticated = size(user.username) > 0
  return {
    error,
    user,
    userDetails,
    authenticated,
  }
}

export default connect(mapStateToProps)(MainDashboard)
