// lib
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// src

import Header from '../Header'
import Home from '../Home'
import Students from '../Students'
import GradesSections from '../GradesSections'
import NavigationBar from '../NavigationBar'
import LoadingView from '../LoadingView'
import styles from './MainDashboard.less'
import CreateGrades from '../CreateGrades'
import EditGrades from '../EditGrades'
import CreateDriver from '../CreateDriver'
import EditDriver from '../EditDriver/EditDriver'
import Announcements from '../Announcements'
import Busses from '../Busses'
import Drivers from '../Drivers'
import CreateBus from '../CreateBus'
import EditBus from '../EditBus'
import Parents from '../Parents'
import CreateStudent from '../CreateStudent'
import EditStudent from '../EditStudent'
import CreateParent from '../CreateParent'
import EditParent from '../EditParent'
import ShiftsAndTimings from '../ShiftsAndTimings'
import CreateShifts from '../CreateShifts'
import EditShift from '../EditShift'
import Profile from '../Profile'
import Security from '../Security'
import Leaves from '../Leaves'
import FleetTracker from '../FleetTracker'
import TrialReminder from '../TrialReminder'
import BlankSlate from '../BlankSlate'
import Licences from '../Licences'

const MainDashboardInner = ({
  onClickSignout,
  user,
  userDetails,
  error,
  authenticated,
  path,
  onRouteChange,
  isLoading,
  activePath,
  trial,
}) => {
  const { isTrialUser, isTrialExpired = false } = trial

  return (
    <div className={styles.root}>
      <Choose>
        <When condition={authenticated && !isLoading}>
          <If condition={isTrialUser}>
            <TrialReminder
              trialDetails={trial}
              onClickSignout={onClickSignout}
            />
          </If>
          <Choose>
            <When condition={!isTrialExpired}>
              <Header
                onClickSignout={onClickSignout}
                activePath={activePath}
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
                <div
                  className={styles.content}
                  style={{ boxShadow: activePath === 'home' ? 'none' : '' }}
                >
                  <Switch>
                    <Route path={`${path}`} exact component={Home} />
                    <Route
                      path={`${path}/students`}
                      exact
                      component={Students}
                      user={user}
                    />
                    <Route
                      path={`${path}/students/create`}
                      exact
                      component={CreateStudent}
                      user={user}
                    />
                    <Route
                      path={`${path}/licences`}
                      exact
                      component={Licences}
                      user={user}
                    />
                    <Route
                      path={`${path}/students/edit/:id`}
                      exact
                      component={EditStudent}
                      user={user}
                    />

                    <Route
                      path={`${path}/parents`}
                      exact
                      component={Parents}
                      user={user}
                    />
                    {/* <Route
                  path={`${path}/fleetTracking`}
                  exact
                  component={FleetTracker}
                  user={user}
                /> */}
                    <Route
                      path={`${path}/parents/create`}
                      exact
                      component={CreateParent}
                      user={user}
                    />
                    <Route
                      path={`${path}/parents/edit/:id`}
                      exact
                      component={EditParent}
                      user={user}
                    />
                    <Route
                      path={`${path}/grades`}
                      exact
                      component={GradesSections}
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
                      path={`${path}/busses/create`}
                      exact
                      component={CreateBus}
                      user={user}
                    />

                    <Route
                      path={`${path}/drivers/edit/:id`}
                      exact
                      component={EditDriver}
                      user={user}
                    />
                    <Route
                      path={`${path}/busses/edit/:id`}
                      exact
                      component={EditBus}
                      user={user}
                    />
                    <Route
                      path={`${path}/busses`}
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
                      path={`${path}/shifts/create`}
                      exact
                      component={CreateShifts}
                      user={user}
                    />
                    <Route
                      path={`${path}/shifts/edit/:id`}
                      exact
                      component={EditShift}
                      user={user}
                    />
                    <Route
                      path={`${path}/announcements`}
                      exact
                      component={Announcements}
                      user={user}
                    />
                    <Route
                      path={`${path}/leaves`}
                      exact
                      component={Leaves}
                      user={user}
                    />
                    <Route
                      path={`${path}/profile`}
                      exact
                      component={Profile}
                      user={user}
                    />
                    <Route
                      path={`${path}/security`}
                      exact
                      component={Security}
                      user={user}
                    />
                    <Redirect to="/dashboard" />
                  </Switch>
                </div>
              </div>
            </When>
            <Otherwise>
              <BlankSlate message="Your Trial Period is Expired,Please Renew it!." />
            </Otherwise>
          </Choose>
        </When>
        <When condition={error}>
          <div>{error}</div>
        </When>
        <Otherwise>
          <LoadingView />
        </Otherwise>
      </Choose>
    </div>
  )
}

export default MainDashboardInner
