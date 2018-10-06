import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

// src
import {isServer} from './'

export const history = isServer() ? null : createHistory()

export const middleware = isServer() ? store => next => action => next(action) : routerMiddleware(history)
