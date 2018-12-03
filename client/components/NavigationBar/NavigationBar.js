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
  const { onRouteChange, selectedIndex } = props

  return (
    <div>
      <List>
        <ListItem
          className={styles.navItem}
          button
          selected={selectedIndex === 0}
          onClick={() => onRouteChange('/dashboard', 0)}
        >
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={selectedIndex === 1}
          onClick={() => onRouteChange('/dashboard/grades&sections', 1)}
        >
          <ListItemText primary={'Grades and Sections'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={selectedIndex === 2}
          onClick={() => onRouteChange('/dashboard', 2)}
        >
          <ListItemText primary={'Shift and Timings'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={selectedIndex === 3}
          onClick={() => onRouteChange('/dashboard/student', 3)}
        >
          <ListItemText primary={'Student Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={selectedIndex === 4}
          onClick={() => onRouteChange('/dashboard/student', 4)}
        >
          <ListItemText primary={'Driver Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={selectedIndex === 5}
          onClick={() => onRouteChange('/dashboard/student', 5)}
        >
          <ListItemText primary={'Bus Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          selected={selectedIndex === 6}
          onClick={() => onRouteChange('/dashboard/student', 6)}
        >
          <ListItemText primary={'School Announcements'} />
        </ListItem>
      </List>
    </div>
  )
}
export default NavigationBar
