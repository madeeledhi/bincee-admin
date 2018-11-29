// lib
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

// src
import styles from './NavigationBar.less'

const NavigationBar = props => {
  const { onRouteChange } = props

  return (
    <div>
      <div className={styles.navLogo}>
        <img className={styles.img} src={`/images/whiteLogo.png`} />
      </div>
      <List>
        <ListItem
          className={styles.navItem}
          button
          onClick={() => onRouteChange('/dashboard')}
        >
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          onClick={() => onRouteChange('/dashboard/student')}
        >
          <ListItemText primary={'Grades and Sections'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          onClick={() => onRouteChange('/dashboard')}
        >
          <ListItemText primary={'Shift and Timings'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          onClick={() => onRouteChange('/dashboard/student')}
        >
          <ListItemText primary={'Student Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          onClick={() => onRouteChange('/dashboard/student')}
        >
          <ListItemText primary={'Driver Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          onClick={() => onRouteChange('/dashboard/student')}
        >
          <ListItemText primary={'Bus Profiles'} />
        </ListItem>
        <ListItem
          className={styles.navItem}
          button
          onClick={() => onRouteChange('/dashboard/student')}
        >
          <ListItemText primary={'School Announcements'} />
        </ListItem>
      </List>
    </div>
  )
}
export default NavigationBar
