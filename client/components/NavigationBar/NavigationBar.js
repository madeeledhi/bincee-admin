// lib
import React from 'react'
import List from '@material-ui/core/List'
import Listitem from '@material-ui/core/Listitem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

// src

const NavigationBar = props => {
  const { onRouteChange } = props

  return (
    <div>
      <List>
        <Listitem button onClick={() => onRouteChange('/dashboard')}>
          <ListItemText primary={'Home'} />
        </Listitem>
        <Listitem button onClick={() => onRouteChange('/dashboard/student')}>
          <ListItemText primary={'Student'} />
        </Listitem>
        <Listitem button onClick={() => onRouteChange('/dashboard')}>
          <ListItemText primary={'Home'} />
        </Listitem>
        <Listitem button onClick={() => onRouteChange('/dashboard/student')}>
          <ListItemText primary={'Student'} />
        </Listitem>
      </List>
    </div>
  )
}
export default NavigationBar
