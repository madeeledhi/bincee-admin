// lib
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// src

import Header from '../Header'
import Home from '../Home'
import Student from '../Student'

const DashboardInner = ({ onClickSignout, user, authenticated, path }) => (
  <div>
    <Header
      onClickSignout={onClickSignout}
      user={user}
      authenticated={authenticated}
    />
    <Switch>
      <Route path={path} exact component={Home} />
      <Route path={`${path}/student`} exact component={Student} />
      <Redirect to="/dashboard" />
    </Switch>
  </div>
)

export default DashboardInner
