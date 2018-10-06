import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../middleware/api'
import rootReducer from '../reducers'
import { middleware as routerMiddleware } from '../utils/configureRouter'
import { isServer } from '../utils'

export default function configureStore(preloadedState) {
  const composeEnhancers = (!isServer() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(
      thunk,
      api,
      createLogger({
        collapsed: true,
      }),
      routerMiddleware,
    )),
  )

  /*
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  */

  return store
}
