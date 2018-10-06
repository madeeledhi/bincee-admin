import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'
import { middleware as routerMiddleware } from '../utils/configureRouter'

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, api, routerMiddleware))
}
