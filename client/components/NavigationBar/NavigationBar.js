// lib
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

// src
import styles from './NavigationBar.less'
//TODO: Apply color to the navbar
const NavigationBar = props => {
  const { onRouteChange, activePath } = props

  return (
    <div>
      <List>
        <ListItem
          className={styles.navItem}
          button
          selected={activePath === 'home'}
          onClick={() => onRouteChange('/dashboard')}
        >
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={activePath === 'grades'}
          onClick={() => onRouteChange('/dashboard/grades')}
        >
          <ListItemText primary={'Grades and Sections'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={activePath === 'shifts'}
          onClick={() => onRouteChange('/dashboard/shifts')}
        >
          <ListItemText primary={'Shift and Timings'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={activePath === 'students'}
          onClick={() => onRouteChange('/dashboard/students')}
        >
          <ListItemText primary={'Student Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={activePath === 'drivers'}
          onClick={() => onRouteChange('/dashboard/drivers')}
        >
          <ListItemText primary={'Driver Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={activePath === 'bus'}
          onClick={() => onRouteChange('/dashboard/bus')}
        >
          <ListItemText primary={'Bus Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={activePath === 'announcements'}
          onClick={() => onRouteChange('/dashboard/announcements')}
        >
          <ListItemText primary={'School Announcements'} />
        </ListItem>
      </List>
    </div>
  )
}
export default NavigationBar
