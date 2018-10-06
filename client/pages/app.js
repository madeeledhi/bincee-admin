// libs
import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import 'babel-polyfill'
import 'url-search-params-polyfill'
import 'element-closest'

// src
import configureStore from '../store/configureStore'
import { history } from '../utils/configureRouter'
import App from '../App'

const store = configureStore(window.GAW.preloadedState)

ReactDOM.render(
  <App store={store} Router={Router} routerProps={{ history }} />,
  document.getElementById('root')
)
