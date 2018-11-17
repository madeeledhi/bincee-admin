// libs
import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// src
import app from './app'
import user from './user'

const rootReducer = combineReducers({
  app,
  routing,
  user,
  form: formReducer,
})

export default rootReducer
