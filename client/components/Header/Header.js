// lib
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import getOr from 'lodash/fp/getOr'
// src
import { content } from './constants'
import styles from './Header.less'
import { syncFireStore } from '../../utils'

const ActionItem = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})(IconButton)

class Header extends React.Component {
  state = {
    anchorEl: null,
    checked: false,
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleMouseEnter() {
    this.setState(() => ({ checked: true }))
  }

  handleMouseExit() {
    this.setState(() => ({ checked: false }))
  }

  render() {
    const { onClickSignout, onRouteChange, activePath } = this.props
    const currentContent = getOr('', activePath)(content)
    const { anchorEl, checked } = this.state
    const open = Boolean(anchorEl)
    return (
      <div className={styles.root}>
        <div className={styles.navLogo}>
          <img className={styles.img} alt="logo" src="/images/whiteLogo.png" />
        </div>
        <div className={styles.actionItems}>
          {currentContent && (
            <div className={styles.helpSection}>
              <Grow in={checked}>
                <div className={styles.helpContent}>
                  <div className={styles.helpText}>{currentContent}</div>
                </div>
              </Grow>
              <div className={styles.helpIcon}>
                <div
                  id="help"
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseExit()}
                />
              </div>
            </div>
          )}
          <ActionItem
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
            className={styles.profile}
            disableTouchRipple
          >
            <Avatar
              alt="Remy Sharp"
              src="/images/man.png"
              style={{
                width: 45,
                height: 45,
              }}
            />
          </ActionItem>
          <Popover
            id="menu-appbar"
            anchorEl={anchorEl}
            classes={{ root: styles.showOff }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 30, horizontal: 'right' }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem
              onClick={() => {
                onRouteChange('/dashboard/profile')
                this.handleClose()
              }}
            >
              <Icon className={styles.iconColor} fontSize={'small'}>
                {'account_circle'}
              </Icon>
              {'Profile'}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onRouteChange('/dashboard/security')
                this.handleClose()
              }}
            >
              <Icon className={styles.iconColor} fontSize={'small'}>
                {'security'}
              </Icon>
              {'Security'}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onRouteChange('/dashboard/licences')
                this.handleClose()
              }}
            >
              <Icon className={styles.iconColor} fontSize={'small'}>
                {'description'}
              </Icon>
              {'Licences'}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onClickSignout()
                this.handleClose()
              }}
            >
              <Icon className={styles.iconColor} fontSize={'small'}>
                {'power_settings_new'}
              </Icon>
              {'Logout'}
            </MenuItem>
          </Popover>
        </div>
      </div>
    )
  }
}
export default syncFireStore()(Header)
