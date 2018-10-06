// libs
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import { Server as httpServer } from 'http'
import { renderFile } from 'ejs'
import xFrameOptions from 'x-frame-options'

// src
import devUtils from './utils/devUtils'
import logUtils from './utils/logUtils'
import {
  build404ErrorHandler,
  build500ErrorHandler,
  getPort,
  isProduction,
} from './utils'
import routes from './routes'
require('dotenv').config();

const port = getPort()
const app = express()
const server = httpServer(app)
// gzip filter
app.use(compression())
app.disable('etag')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))
app.set('json spaces', 2)
app.set('json replacer', '')

app.engine('ejs', renderFile)
app.set('view engine', 'ejs')
app.set('views', path.resolve('./server/templates/web'))
app.use(express.static(path.resolve('./client/dist')))
app.use(express.static(path.resolve('./server/public')))

// app.use('/images', express.static(__dirname + "/images"));
// If you declare your session and passport configs above static directory configs then all requests
// for static content will also get a session, which is not good.
app.use(cookieParser())

app.use(xFrameOptions('ALLOWALL'))

if (isProduction()) {
  // handle logging
  // logUtils.setupWinstonProductionLogs()
  app.use(logUtils.setupUrlLogs)
} else {
  devUtils.setupWebpack(app)
}

// Defining routes
app.use(routes)

app.use(build404ErrorHandler())
app.use(build500ErrorHandler())

server.listen(port, err => {
  if (err) {
    console.error('Server startup failed: ', err)
  }

  console.info(
    '==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.',
    port,
    port
  )
})
