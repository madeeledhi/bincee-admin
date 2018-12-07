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

const DashboardInner = ({
  onClickSignout,
  user,
  userDetails,
  error,
  authenticated,
  path,
  onRouteChange,
  isLoading,
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
                path={`${path}/drivers/create`}
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
                path={`${path}/drivers/edit/:id`}
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
              <Route
                path={`${path}/profile`}
                exact
                component={() => <div>I am Profile</div>}
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
