// libs
import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// src
import app from './app'
import user from './user'
import userDetails from './userDetails'
import grades from './grades'
import drivers from './drivers'
import parents from './parents'
import bus from './bus'
import students from './students'
import shifts from './shifts'

const rootReducer = combineReducers({
  app,
  routing,
  user,
  userDetails,
  grades,
  drivers,
  parents,
  bus,
  students,
  shifts,
  form: formReducer,
})

export default rootReducer
