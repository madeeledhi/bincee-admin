// lib
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'
// src
import styles from './Header.less'

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
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { user, onClickSignout, onRouteChange, userDetails } = this.props
    const { username } = user
    const { name } = userDetails
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={styles.root}>
        <div className={styles.navLogo}>
          <img className={styles.img} alt="logo" src="/images/whiteLogo.png" />
        </div>
        <div className={styles.actionItems}>
          <ActionItem
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
            className={styles.profile}
            disableTouchRipple
          >
            {name}
            <Avatar alt="Remy Sharp" src="/images/profile.png" />
          </ActionItem>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            classes={{ root: styles.showOff }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                account_circle
              </Icon>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                onRouteChange('/dashboard/security')
                this.handleClose()
              }}
            >
              <Icon className={styles.iconColor} fontSize={'small'}>
                security
              </Icon>
              Security
            </MenuItem>
            <MenuItem
              onClick={() => {
                onClickSignout()
                this.handleClose()
              }}
            >
              <Icon className={styles.iconColor} fontSize={'small'}>
                credit_card
              </Icon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    )
  }
}
export default Header
