// lib
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
// src
import styles from './Header.less'

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
  handleSignOut = () => {
    this.setState({ anchorEl: null })
  }
  render() {
    const { user, authenticated, onClickSignout, onRouteChange } = this.props
    const { photo, name } = user
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={styles.root}>
        <div className={styles.button}>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <Icon>notifications</Icon>
            </Badge>
          </IconButton>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <Avatar
                alt="Remy Sharp"
                src={photo ? photo : '/images/profile.png'}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    )
  }
}
export default Header
