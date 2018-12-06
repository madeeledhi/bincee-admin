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
          className={`${styles.navItem} ${
            activePath === 'home' ? styles.active : ''
          }`}
          button
          selected={activePath === 'home'}
          onClick={() => onRouteChange('/dashboard')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Home'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'grades' ? styles.active : ''
          }`}
          button
          selected={activePath === 'grades'}
          onClick={() => onRouteChange('/dashboard/grades')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Grades and Sections'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'shifts' ? styles.active : ''
          }`}
          button
          selected={activePath === 'shifts'}
          onClick={() => onRouteChange('/dashboard/shifts')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Shift and Timings'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'students' ? styles.active : ''
          }`}
          button
          selected={activePath === 'students'}
          onClick={() => onRouteChange('/dashboard/students')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Student Profiles'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'drivers' ? styles.active : ''
          }`}
          button
          selected={activePath === 'drivers'}
          onClick={() => onRouteChange('/dashboard/drivers')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Driver Profiles'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'bus' ? styles.active : ''
          }`}
          button
          selected={activePath === 'bus'}
          onClick={() => onRouteChange('/dashboard/bus')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Bus Profiles'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'announcements' ? styles.active : ''
          }`}
          button
          selected={activePath === 'announcements'}
          onClick={() => onRouteChange('/dashboard/announcements')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'School Announcements'}
          />
        </ListItem>
      </List>
    </div>
  )
}
export default NavigationBar
