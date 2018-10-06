// libs
import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

// src
import * as ActionTypes from '../actions'
import app from './app'

const rootReducer = combineReducers({
  app,
  routing,
})

export default rootReducer
