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
import CreateGrades from '../CreateGrades'
import EditGrades from '../EditGrades'
import CreateDriver from '../CreateDriver'
import EditDriver from '../EditDriver/EditDriver'
import Announcements from '../Announcements'
import ShiftsAndTimings from '../ShiftsAndTimings'
import Busses from '../Busses'
import Drivers from '../Drivers'
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
  activePath,
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
              activePath={activePath}
            />
          </div>
          <div className={styles.content}>
            <Switch>
              <Route path={`${path}`} exact component={Home} />
              <Route
                path={`${path}/students`}
                exact
                component={Student}
                user={user}
              />
              {
                //TODO: dont use capitalized routes and special characters, use only grades with this route
                //TODO: Add edit and create subroute with grade route
              }
              <Route
                path={`${path}/grades`}
                exact
                component={GradesSections}
                user={user}
              />
              <Route
                path={`${path}/grades/create`}
                exact
                component={CreateGrades}
                user={user}
              />
              <Route
                path={`${path}/drivers`}
                exact
                component={Drivers}
                user={user}
              />
              <Route
                path={`${path}/driver/create`}
                exact
                component={CreateDriver}
                user={user}
              />
              <Route
                path={`${path}/grades/edit/:id`}
                exact
                component={EditGrades}
                user={user}
              />
              <Route
                path={`${path}/driver/edit/:id`}
                exact
                component={EditDriver}
                user={user}
              />
              <Route
                path={`${path}/bus`}
                exact
                component={Busses}
                user={user}
              />
              <Route
                path={`${path}/shifts`}
                exact
                component={ShiftsAndTimings}
                user={user}
              />
              <Route
                path={`${path}/announcements`}
                exact
                component={Announcements}
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
