// lib
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// src
import styles from './NavigationBar.less'

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
            activePath === 'parents' ? styles.active : ''
          }`}
          button
          selected={activePath === 'parents'}
          onClick={() => onRouteChange('/dashboard/parents')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Parent Profiles'}
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
            activePath === 'busses' ? styles.active : ''
          }`}
          button
          selected={activePath === 'busses'}
          onClick={() => onRouteChange('/dashboard/busses')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Bus Profiles'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'leaves' ? styles.active : ''
          }`}
          button
          selected={activePath === 'leaves'}
          onClick={() => onRouteChange('/dashboard/leaves')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Leaves'}
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
        {/* <ListItem
          className={`${styles.navItem} ${
            activePath === 'fleetTracking' ? styles.active : ''
          }`}
          button
          selected={activePath === 'fleetTracking'}
          onClick={() => onRouteChange('/dashboard/fleetTracking')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Fleet Tracker'}
          />
        </ListItem> */}
      </List>
    </div>
  )
}
export default NavigationBar
