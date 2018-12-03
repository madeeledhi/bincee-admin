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
