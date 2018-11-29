// lib
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// src

import Header from '../Header'
import Home from '../Home'
import Student from '../Student'
import NavigationBar from '../NavigationBar'
import styles from './Dashboard.less'

const DashboardInner = ({
  onClickSignout,
  user,
  authenticated,
  path,
  onRouteChange,
}) => (
  <div className={styles.root}>
    <Header
      onClickSignout={onClickSignout}
      user={user}
      authenticated={authenticated}
      onRouteChange={onRouteChange}
    />

    <div className={styles.container}>
      <div className={styles.navigation}>
        <NavigationBar onRouteChange={onRouteChange} />
      </div>
      <div className={styles.content}>
        <Switch>
          <Route path={`${path}`} exact component={Home} />
          <Route path={`${path}/student`} exact component={Student} />

          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </div>
  </div>
)

export default DashboardInner
