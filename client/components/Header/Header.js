// lib
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// src

const Header = props => {
  const { user, authenticated, onClickSignout, onRouteChange } = props
  const { photo, name } = user

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div>
            <Typography variant="title" color="inherit">
              Bincee
            </Typography>
            <Button
              onClick={() => {
                onRouteChange('/dashboard')
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                onRouteChange('/dashboard/student')
              }}
            >
              Student
            </Button>
          </div>
          <Avatar alt="Remy Sharp" src={photo} />
          <p>{name}</p>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={onClickSignout}
            >
              SignOut
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Header
