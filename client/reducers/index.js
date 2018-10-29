// libs
import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import {routerReducer as routing} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// src
import * as ActionTypes from '../actions'
import app from './app'

const rootReducer = combineReducers({
  app,
  routing,
  form: formReducer,
})

export default rootReducer
