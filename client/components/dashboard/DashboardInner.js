// lib
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// src

import Header from '../Header'
import Home from '../Home'
import Student from '../Student'
import GradesSections from '../GradesSections'
import NavigationBar from '../NavigationBar'
import LoadingView from '../LoadingView'
import styles from './Dashboard.less'
// TODO: create components for other routes
/*
 * Remaining routes
 * parents
 * students
 * shifts
 * drivers
 * profile
 * fleet tracking
 * Bus
 * School announcements
 */
const DashboardInner = ({
  onClickSignout,
  user,
  userDetails,
  error,
  authenticated,
  path,
  onRouteChange,
  isLoading,
  selectedIndex,
}) => (
  <div className={styles.root}>
    <Choose>
      <When condition={authenticated && !isLoading}>
        <Header
          onClickSignout={onClickSignout}
          user={user}
          userDetails={userDetails}
          authenticated={authenticated}
          onRouteChange={onRouteChange}
        />

        <div className={styles.container}>
          <div className={styles.navigation}>
            <NavigationBar
              onRouteChange={onRouteChange}
              selectedIndex={selectedIndex}
            />
          </div>
          <div className={styles.content}>
            <Switch>
              <Route path={`${path}`} exact component={Home} />
              <Route
                path={`${path}/student`}
                exact
                component={Student}
                user={user}
              />
              {
                //TODO: dont use capitalized routes and special characters, use only grades with this route
                //TODO: Add edit and create subroute with grade route
              }
              <Route
                path={`${path}/Grades&Sections`}
                exact
                component={GradesSections}
                user={user}
              />

              <Redirect to="/dashboard" />
            </Switch>
          </div>
        </div>
      </When>
      <When condition={error}>
        <div>{error}</div>
      </When>
      <Otherwise>
        <LoadingView message={'Loading User Details'} />
      </Otherwise>
    </Choose>
  </div>
)

export default DashboardInner
